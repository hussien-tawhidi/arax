import Checkout from "@/components/checkout/Checkout";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) return redirect("/user/login");
  return <Checkout />;
}
