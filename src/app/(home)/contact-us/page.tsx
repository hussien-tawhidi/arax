import About from "@/components/about/About";
import ContactDetails from "@/components/about/ContactDetails";
import DiscountGuide from "@/components/about/DiscountGuid";

export default function contactUsPage() {
  return (
    <div className='md:w-[70%] w-[90%] mx-auto'>
      <ContactDetails />
      <DiscountGuide />
      <About />
    </div>
  );
}
