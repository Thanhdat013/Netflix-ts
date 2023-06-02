import { modalState, movieState } from "@/atoms/modalAtom"
import { ModalPreview, Row } from "@/components/commons"
import { MainLayout } from "@/components/layout"
import useAuth from "@/hooks/useAuth"
import useList from "@/hooks/useList"
import Head from "next/head"
import React from "react"
import { useRecoilValue } from "recoil"

type Props = {}

function MyList({}: Props) {
  const showModal = useRecoilValue(modalState)

  const { user } = useAuth()
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)
  return (
    <div
      className={`h-full relative bg-gradient-to-b from-gray-900/10 to-[#010511] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      {/* SEO */}
      <Head>
        <title>My list-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative px-10 pb-12 lg:space-y-24 lg:pb-6 translate-y-20">
        <section className="md:space-y-12">
          <p className="font-normal text-4xl ">My List</p>
          {/* My List Component */}
          {list.length > 0 && <Row movies={list} />}
        </section>
      </main>
      {showModal && <ModalPreview />}
    </div>
  )
}

export default MyList

MyList.Layout = MainLayout
