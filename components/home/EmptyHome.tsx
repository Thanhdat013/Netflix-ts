import Image from "next/image"
import Link from "next/link"
import React from "react"

function EmptyHome() {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-transparent py-8 px-16">
      <Image
        src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522811/Netflix/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large_vsfgtw.jpg"
        alt="bgi"
        fill
        style={{ objectFit: "cover" }}
        className="-z-10  opacity-10 "
      />
      <div className="flex items-center justify-between space-x-2 md:space-x-10">
        <Image
          src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522790/Netflix/Netflix_2015_logo_regcgg.svg"
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer object-cover "
        />
        <Link href="/login">
          {" "}
          <button className="py-1.5 px-6 bg-[#e50914] rounded-md hover:bg-red-400">
            Sign in
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:gap-4 justify-center items-center transition translate-y-52 text-center gap-12">
        <p className="text-4xl font-semibold">
          Unlimited movies, TV shows, and more{" "}
        </p>
        <p> Watch anywhere.Cancel anytime.</p>
        <p className="text-lg">
          {" "}
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <Link href="/login">
          <button className=" flex items-center justify-center py-3 px-10  bg-[#e50914] rounded-md hover:bg-red-700">
            <span className="text-3xl font-medium">Get start </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default EmptyHome
