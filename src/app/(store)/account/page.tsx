import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/profile-form";
import { getProfileForUser, listAddressesForUser } from "@/lib/services/profile";
import { getSessionUser } from "@/lib/supabase/session";

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account");
  const [profile, addresses] = await Promise.all([
    getProfileForUser(user.id, user.email ?? null),
    listAddressesForUser(user.id),
  ]);
  return <ProfileForm profile={profile} addresses={addresses} />;
}
