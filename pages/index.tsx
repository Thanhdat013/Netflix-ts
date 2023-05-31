import Image from "next/image"
import { Inter } from "next/font/google"

import { Banner, Header } from "@/components"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className="flex h-screen w-screen relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Header />
      <main>
        <Banner />
      </main>
    </div>
  )
}
