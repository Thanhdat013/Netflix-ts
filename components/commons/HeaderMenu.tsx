import useAuth from "@/hooks/useAuth"
import { Divider } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai"
import { BiTransfer } from "react-icons/bi"

function HeaderMenu() {
  const { user, logout } = useAuth()
  return (
    <div className="flex flex-col  px-2">
      <div className="relative flex items-center gap-4 py-4 after:absolute after:w-[calc(100%+16px)] after:h-[1px] after:bottom-0 after:block after:content-[''] after:-right-2 after:-left-2  after:bg-gray-400 ">
        <Image
          src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522841/Netflix/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo_nym0xh.png"
          alt="account"
          width={26}
          height={26}
          style={{ borderRadius: "4px" }}
        />
        <p className="cursor-pointer hover:underline font-normal">
          {user?.email}
        </p>
      </div>
      <div className="relative flex flex-col gap-3 py-4  after:absolute after:w-[calc(100%+16px)] after:h-[1px] after:bottom-0 after:block after:content-[''] after:-right-2 after:-left-2  after:bg-gray-400">
        <Link
          href="/"
          className="flex items-center justify-start gap-4 font-normal"
        >
          <AiOutlineEdit className="text-[26px]" />
          <div className="hover:underline cursor-pointer">Manage Profiles</div>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-start gap-4 font-normal"
        >
          <BiTransfer className="text-[26px]" />
          <div className="hover:underline cursor-pointer">
            Transfer Profiles
          </div>
        </Link>
        <Link
          href="/account"
          className="flex items-center justify-start gap-4 font-normal"
        >
          <AiOutlineUser className="text-[26px]" />
          <div className="hover:underline cursor-pointer">Account</div>
        </Link>
      </div>

      <button
        onClick={logout}
        className="text-center cursor-pointer font-medium py-4 hover:underline"
      >
        Sign out of Netflix
      </button>
    </div>
  )
}

export default HeaderMenu
