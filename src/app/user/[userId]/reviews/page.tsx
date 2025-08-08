import UserReviews from "@/components/auth/UserReviews";
import { auth } from "../../../../../auth";

export default async function reviewsPage() {
  const session = await auth();
  return <UserReviews id={session?.user.id} />;
}
