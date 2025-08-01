import ProductDetail from "@/components/products/ProductDetail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function productDetails({ params }: any) {
  const param = await params;
  return (
    <div>
      <ProductDetail productCode={param.productCode} />
    </div>
  );
}
