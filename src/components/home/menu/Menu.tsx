import Image from "next/image";
import Link from "next/link";

interface menu {
  image?: string;
  title: string;
}

interface props {
  data: menu[];
}

export default function Menu({ data }: props) {
  return (
    <div className='flex items-center lg:pt-32 pt-16'>
      <ul className='hide-scrollbar w-full flex md:gap-16 gap-10 justify-center mx-auto overflow-x-auto whitespace-nowrap px-4'>
        {data.map((item,index) => (
          <li
            key={index}
            className='flex-shrink-0 flex- items-center flex flex-col  rounded-full text-center group'>
            <Link
              href={"/"}
              className='relative w-12 h-12 sm:h-22 sm:w-22 md:w-22  md:h-22 rounded-full shadow-xl'>
              <Image
                src={item.image||"/"}
                alt={item.title}
                fill
                className='object-cover z-20 rounded-full border-2 bg-light border-light overflow-hidden group-hover:shadow-xl transition-all duration-200'
              />
              <div className='absolute top-0 bottom-0 leading-0 -right-2 w-full h-full bg-red z-10 rounded-full group-hover:right-0 transition-all opacity-100 group-hover:opacity-0 duration-200' />
            </Link>
            <p className='mt-2 text-center w-full  sm:text-[14px] text-[8px] text-wrap font-medium text-dark/70'>
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
