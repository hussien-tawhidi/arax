import Image from "next/image";
import DesktopHeader from "./desktop/DesktopHeader";
import MobileHeader from "./mobile/MobileHeader";
import TopHeader from "./top-header/TopHeader";

export default function Header() {
  
  return (
    <div className='relative'>
      <Image
        src={"/images/header-banner-ad.gif"}
        alt='header ads'
        width={2000}
        height={100}
        className='h-16 object-cover'
      />
      <TopHeader />
      <div className='md:block hidden'>
        <DesktopHeader />
      </div>
      <div className='md:hidden block'>
        <MobileHeader />
      </div>
    </div>
  );
}
