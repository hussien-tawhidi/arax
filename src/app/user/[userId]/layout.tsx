import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import UserAside from "@/components/auth/UserAside";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return redirect(`/user/login`);
  }
  return (
    <div className='flex md:flex-row flex-col'>
      <UserAside />

      <div className='w-full'>{children}</div>
    </div>
  );
}
