import Category from "@/components/category/Category";
import { menu } from "@/components/header/data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function categoryPage({ params }: any) {
  const param = await params;
  const category = param.category;

  return (
    <div>
      <Category category={category} />
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
