import useAuth from "@/hooks/useAuth"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai"
import MenuMobile from "./MenuMobile"

function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const { logout } = useAuth()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header className={`${isScrolled && "bg-[#141414] "}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522790/Netflix/Netflix_2015_logo_regcgg.svg"
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer object-cover "
        />

        <MenuMobile />

        <ul className="hidden space-x-4 md:flex items-center">
          <li className="headerLink">Home</li>
          <li className="headerLink">Tv Show</li>
          <li className="headerLink">Movie</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My list</li>
        </ul>
      </div>

      <div className="flex items-center gap-4 text-sm font-light">
        <AiOutlineSearch className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <AiOutlineBell className="w-6 h-6 " />

        <Link href="/account">
          <Image
            src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522841/Netflix/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo_nym0xh.png"
            alt="account"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
