import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/profile-form";
import { getProfileForUser } from "@/lib/services/profile";
import { getSessionUser } from "@/lib/supabase/session";

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account");
  const profile = await getProfileForUser(user.id, user.email ?? null);
  return <ProfileForm profile={profile} />;
}
