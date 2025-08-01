import ProductTypeComp from "@/components/category/subcategory/product-type/ProductTypeData";
import { menu } from "@/components/header/data";

// Page component
export default async function ProductTypePage({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const { category, subcategory, productType } = await params;

  // Find category
  const categoryData = menu.find((item) => item.category === category);
  if (!categoryData) return <div>دسته‌بندی پیدا نشد</div>;

  // Find subcategory
  const subcategoryData = categoryData.submenus.find(
    (item) => item.subcategory === subcategory
  );
  if (!subcategoryData) return <div>زیر‌دسته‌بندی پیدا نشد</div>;

  // Find product type
  const productTypeData = subcategoryData.items.find(
    (item) => item.productType === productType
  );
  if (!productTypeData) return <div>نوع محصول پیدا نشد</div>;

  return (
    <div className='pb-10'>
      <div className='lg:w-[80%] w-[95%] mx-auto'>
        <ProductTypeComp productType={productTypeData.title} />
      </div>
    </div>
  );
}

// Metadata
export const generateMetadata = async ({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const { category, subcategory, productType } = await params;

  const categoryData = menu.find((item) => item.category === category);
  const subcategoryData = categoryData?.submenus.find(
    (item) => item.subcategory === subcategory
  );
  const productTypeData = subcategoryData?.items.find(
    (item) => item.productType === productType
  );

  return {
    title: productTypeData
      ? `${productTypeData.title} - دسته‌بندی ${subcategoryData?.title} در فروشگاه اینترنتی آراکس`
      : "محصول نامشخص",
    description: "some des",
  };
};
