type SupabaseKeyKind =
  | "missing"
  | "placeholder"
  | "publishable"
  | "legacy_anon_jwt"
  | "secret_key"
  | "service_role_jwt"
  | "jwt_unknown_role"
  | "unknown";

function decodeJwtPayload(value: string): Record<string, unknown> | null {
  const [, payload] = value.split(".");
  if (!payload) return null;
  try {
    const normalized = payload.replaceAll("-", "+").replaceAll("_", "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    return JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

export function getSupabaseKeyKind(key: string | undefined): SupabaseKeyKind {
  if (!key) return "missing";
  if (key === "your-anon-key" || key.includes("your-")) return "placeholder";
  if (key.startsWith("sb_publishable_")) return "publishable";
  if (key.startsWith("sb_secret_")) return "secret_key";
  if (key.startsWith("eyJ")) {
    const role = decodeJwtPayload(key)?.role;
    if (role === "anon") return "legacy_anon_jwt";
    if (role === "service_role") return "service_role_jwt";
    return "jwt_unknown_role";
  }
  return "unknown";
}

export function getSupabaseConfigDiagnostics() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const keyKind = getSupabaseKeyKind(key);
  const urlHost = (() => {
    if (!url) return "missing";
    try {
      return new URL(url).hostname;
    } catch {
      return "invalid-url";
    }
  })();

  return {
    hasUrl: Boolean(url),
    urlHost,
    hasKey: Boolean(key),
    keyKind,
    keyLength: key?.length ?? 0,
    keyPrefix: key ? key.slice(0, Math.min(14, key.length)) : "missing",
    isUsablePublicKey:
      keyKind === "publishable" || keyKind === "legacy_anon_jwt",
  };
}

export function logSupabaseConfigDiagnostics(context: string) {
  const diagnostics = getSupabaseConfigDiagnostics();
  console.error(`[supabase-config:${context}]`, diagnostics);
}
