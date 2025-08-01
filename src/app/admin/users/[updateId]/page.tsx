import UpdateUser from "@/components/admin/users/UpdateUser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function updateUserPage({ params }: any) {
  const param = await params;
  console.log("🚀 ~ updateUserPage ~ param:", param)
  return <UpdateUser id={param.updateId} />;
}
