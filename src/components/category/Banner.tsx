import Image from "next/image";

export default function Banner({
  imagelg,
  imageSm,
}: {
  imagelg: string;
  imageSm: string;
}) {
  return (
    <div className=''>
      <Image
        src={imagelg}
        alt='banner'
        width={800}
        height={300}
        className='object-cover w-full md:flex hidden rounded-xl'
      />
      <Image
        src={imageSm}
        alt='banner'
        width={800}
        height={300}
        className='object-cover md:hidden flex'
      />
    </div>
  );
}
