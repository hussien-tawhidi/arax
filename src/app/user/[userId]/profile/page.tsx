import Profile from "@/components/auth/profile/Profile";
import { auth } from "../../../../../auth";

export default async function profilePage() {
  const session = await auth();
  const id = session?.user?.id;
  return <Profile id={id} />;
}
