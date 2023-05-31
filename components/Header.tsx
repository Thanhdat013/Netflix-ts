import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai"

function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

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
        <img
          src="https://rb.gy/ulxxee"
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer object-cover"
        />

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
          <img
            src="https://rb.gy/g1pwyx"
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
