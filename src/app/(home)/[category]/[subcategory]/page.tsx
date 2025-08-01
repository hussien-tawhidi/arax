
import SubCategoryData from "@/components/category/subcategory/SubCategoryData";
import { menu } from "@/components/header/data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function subcategoryPage({ params }: any) {
  const param = await params;
  const category = param.category;

  const pageCategory = menu.find((item) => item.category === category);
  const productCate = pageCategory?.submenus.find(
    (item) => item.subcategory === param.subcategory
  );
  return (
    <div className='pb-10'>
      <div className='lg:w-[80%] w-[95%] mx-auto'>
        <SubCategoryData subcategory={productCate?.title} subcategoryMenu />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateMetadata = async ({ params }: any) => {
  const param = await params;
  const category = param.category;
  const title = menu.find((item) => item.category === category);
  const subTitle = title?.submenus.find(
    (item) => item.subcategory === param.subcategory
  );
  return {
    title: `${subTitle?.title} - فروشکاه اینترنتی آراکس`,
    description: "some des",
  };
};
