const config = {
  expo: {
    name: "Uvely Glow",
    slug: "uvely-glow",
    scheme: "uvelyglow",
    version: "1.0.0",
    orientation: "portrait",
    platforms: ["ios", "android"],
    extra: {
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://uvely-glow.example",
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
    },
  },
};

export default config;
