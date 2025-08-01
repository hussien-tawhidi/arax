import UpdateProduct from "@/components/admin/products/Update";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function page({ params }: any) {
  const param = await params.updateId;
  console.log("🚀 ~ page ~ param:", param);
  return <UpdateProduct id={param} />;
}
