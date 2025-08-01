import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("🚀 ~ RootLayout ~ session:", session);
  if (session) {
    return redirect(`/user/${session.user?.id}`);
  }
  return <div>{children}</div>;
}
