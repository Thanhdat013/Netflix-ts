import { modalState } from "@/atoms/modalAtom"
import { Banner, Row } from "@/components/slide"
import { MainLayout } from "@/components/layout"
import { ModalPreview } from "@/components/preview"
import { Movie } from "@/models"
import requests from "@/utils/requests"
import Head from "next/head"
import { useRecoilValue } from "recoil"

interface Props {
  crimeShow: Movie[]
  fantasyShow: Movie[]
  dramaShow: Movie[]
  news: Movie[]
  popularNetflix: Movie[]
}

function Show({
  crimeShow,
  fantasyShow,
  dramaShow,
  news,
  popularNetflix,
}: Props) {
  const showModal = useRecoilValue(modalState)

  return (
    <div
      className={`h-full relative bg-gradient-to-b from-gray-900/10 to-[#010511] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Genre-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative px-10 pb-12 lg:space-y-24 lg:pb-6">
        <Banner netflixOriginals={popularNetflix} />
        <section className="md:space-y-24">
          <Row title="Tv&show Popular on Netflix" movies={popularNetflix} />
          <Row title="Drama" movies={dramaShow} />
          <Row title="News" movies={news} />
          <Row title="Fantasy" movies={fantasyShow} />
          <Row title="Crime" movies={crimeShow} />
        </section>
      </main>
      {showModal && <ModalPreview />}
    </div>
  )
}

export default Show

export const getServerSideProps = async () => {
  const [crimeShow, fantasyShow, dramaShow, news, popularNetflix] =
    await Promise.all([
      fetch(requests.fetchCrime).then((res) => res.json()),
      fetch(requests.fetchFantasy).then((res) => res.json()),
      fetch(requests.fetchDrama).then((res) => res.json()),
      fetch(requests.fetchNews).then((res) => res.json()),
      fetch(requests.fetchShowPopular).then((res) => res.json()),
    ])

  return {
    props: {
      crimeShow: crimeShow.results,
      fantasyShow: fantasyShow.results,
      dramaShow: dramaShow.results,
      news: news.results,
      popularNetflix: popularNetflix.results,
    },
  }
}

Show.Layout = MainLayout
