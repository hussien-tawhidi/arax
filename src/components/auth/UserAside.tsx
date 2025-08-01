"use client";
import { userMenuItems } from "./data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";

export default function UserAside() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const userId = session?.user?.id;
  return (
    <aside className='w-full md:w-72 rounded border-l h-full border-darker-black/50 p-4'>
      <div className='text-center border-b pb-4 mb-4 flex items-center relative'>
        <button
          onClick={() => router.push(`/user/${userId}/profile`)}
          className='absolute top-0 left-0 text-xl text-darker-black/80 hover:text-darker-black cursor-pointer'>
          <CiEdit />
        </button>
        <Image
          src={session?.user?.image || "/avatar.png"}
          alt={`image of ${session?.user?.name}`}
          width={100}
          height={100}
          className='object-cover'
        />
        <div className='text-right'>
          <p className='text-lg font-bold text-darker-black/80'>
            {session?.user?.name}
          </p>
          <p className='text-darker-black/50 text-sm'>{session?.user?.phone}</p>
          <p className='text-[12px] text-darker-black/50'>
            {session?.user?.email && session?.user?.email?.length > 15 ? (
              <span>...{session?.user?.email?.slice(0, 15)}</span>
            ) : (
              session?.user?.email
            )}
          </p>
        </div>
      </div>
      <ul className='space-y-4 text-right text-sm font-medium text-gray-700'>
        {userMenuItems.map((item) => {
          const fullHref = `/user/${userId}${item.href}`;
          const isActive =
            pathname === fullHref ||
            (item.href === "" && pathname === `/user/${userId}`);

          return (
            <li key={item.href}>
              <Link
                href={`/user/${userId}/${item.href}`}
                className={`flex items-center gap-2 p-2 rounded transition-colors ${
                  isActive
                    ? "text-red bg-red/5"
                    : "hover:bg-gray-100 text-gray-700"
                }`}>
                {item.icon && <item.icon className='text-red' />}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
