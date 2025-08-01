import { menu } from "@/components/header/data";
import MobileViewCategory from "@/components/header/mobile/MobileViewCategory";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function page({ params }: any) {
  const param = await params;
  const category = param.category;
  const menuItems = menu.find((item) => item.category === category);
  console.log("🚀 ~ page ~ menuItems:", menuItems);
  return (
    <div className='my-5 mx-auto'>
      <p className='font-semibold mr-5'>دسته بندی {menuItems?.title}</p>
      <div className='grid grid-cols-2 w-[95%] mx-auto gap-5'>
        {menuItems?.submenus.map((item, i) => (
          <MobileViewCategory
            key={i}
            image={item.image}
            title={item.title}
            category={menuItems.category}
            subcategory={item.subcategory}
          />
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateMetadata = async ({ params }: any) => {
  const param = await params;
  const category = param.category;
  const title = menu.find((item) => item.category === category);
  return {
    title: `${title?.title} - فروشکاه اینترنتی آراکس`,
    description: "some des",
  };
};
