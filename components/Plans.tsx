import useAuth from "@/hooks/useAuth"
import { Product } from "@stripe/firestore-stripe-payments"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { AiOutlineCheck } from "react-icons/ai"
import PriceOption from "./PriceOption"
import { useState } from "react"

import { loadCheckout } from "@/lib/stripe"
import Loader from "./Loader"
interface Props {
  products: Product[]
}
const Plans = ({ products }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
  const { logout, user } = useAuth()
  const [isBillingLoading, setBillingLoading] = useState(false)
  const subscribeToPlan = () => {
    if (!user) return

    loadCheckout(selectedPlan?.prices[0].id!)
    setBillingLoading(true)
  }

  return (
    <div>
      {/* SEO */}
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522790/Netflix/Netflix_2015_logo_regcgg.svg"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer object-cover "
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="text-3xl mb-3 font-medium">
          Choose the plan that`s right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-5 w-5 text-[#E50914]" /> Watch all you
            want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-5 w-5 text-[#E50914]" />{" "}
            Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-5 w-5 text-[#E50914]" /> Change or
            cancel your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4 ">
          <div className="flex w-full items-center justify-end self-end md:w-3/5 ">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => {
                  setSelectedPlan(product)
                }}
              >
                {product.name}
              </div>
            ))}
          </div>

          <PriceOption products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans
