import UpdateCategory from "@/components/admin/category/UpdateCategory";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function updatePage({ params }: any) {
  const id = await params.categoryId;
  return <UpdateCategory id={id} />;
}
