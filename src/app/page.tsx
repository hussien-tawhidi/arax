import { menu } from "@/components/header/data";
import AraxMagezine from "@/components/home/arax-magezine/AraxMagezine";
import BeautyAndHealthCare from "@/components/home/BeautyAndHealthCare";
import BestOffs from "@/components/home/BestOffs";
import ClothSet from "@/components/home/ClothSet";
import { homeOffsPoste } from "@/components/home/data";
import { heroSlides } from "@/components/home/hero/data";
import HeroSlider from "@/components/home/hero/HerosSlider";
import IntroText from "@/components/home/IntroText";
import Menu from "@/components/home/menu/Menu";
import OffsBanner from "@/components/home/OffsBanner";
import ShoesBanners from "@/components/home/ShoesBanners";
import SpecialOffer from "@/components/home/special-offer/SpecialOffer";
import TopSelectedProducts from "@/components/home/top-selected/TopSelectedProducts";

export default async function Home() {
  return (
    <main className=''>
      <HeroSlider data={heroSlides} />
      <div className='lg:w-[80%] mx-auto'>
        <Menu data={menu}/>
        <SpecialOffer />
        <BestOffs data={homeOffsPoste} />
        <OffsBanner />
        <ClothSet />
        <BeautyAndHealthCare />
        <ShoesBanners />
        <TopSelectedProducts />
        <AraxMagezine />
        <IntroText />
      </div>
    </main>
  );
}
