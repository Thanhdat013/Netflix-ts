import useAuth from "@/hooks/useAuth"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai"

import { ROUTE_LIST } from "./routes"
import { useRouter } from "next/router"
import MenuMobile from "./MenuMobile"
import HeaderMenu from "./HeaderMenu"

function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const router = useRouter()
  const { user } = useAuth()
  console.log(user)
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
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522790/Netflix/Netflix_2015_logo_regcgg.svg"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer object-cover "
          />
        </Link>

        <MenuMobile />

        <ul className="hidden space-x-4 md:flex items-center">
          {ROUTE_LIST.map((route) => (
            <Link href={route.path} key={route.path}>
              <li
                className={`headerLink ${
                  router.pathname === route.path && "text-[#e50914]"
                }`}
              >
                {route.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex">
        <div className="flex items-center gap-4 text-sm font-light">
          <AiOutlineSearch className="hidden sm:inline h-8 w-8" />

          <AiOutlineBell className="w-8 h-8 " />

          <div className="relative group cursor-pointer after:absolute after:content-[''] after:bg-transparent after:-bottom-[50%] after:h-4 after:w-full after:block">
            <Image
              src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522841/Netflix/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo_nym0xh.png"
              alt="account"
              width={32}
              height={32}
            />
            <div className="absolute w-48 h-auto top-[120%] right-0 bg-black/80 hidden group-hover:block ">
              <HeaderMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
