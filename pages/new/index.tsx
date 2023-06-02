import { modalState } from "@/atoms/modalAtom"
import { Banner, ModalPreview, Row } from "@/components/commons"
import { MainLayout } from "@/components/layout"
import { Movie } from "@/models"
import requests from "@/utils/requests"
import Head from "next/head"
import { useRecoilValue } from "recoil"

interface Props {
  historyMovie: Movie[]
  westernShow: Movie[]
  dramaShow: Movie[]
  news: Movie[]
  upComingMovies: Movie[]
}

function Show({
  historyMovie,
  westernShow,
  dramaShow,
  news,
  upComingMovies,
}: Props) {
  const showModal = useRecoilValue(modalState)

  return (
    <div
      className={`h-full relative bg-gradient-to-b from-gray-900/10 to-[#010511] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>New-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative pl-4 pb-12 lg:space-y-24 lg:pb-6">
        <Banner netflixOriginals={upComingMovies} />
        <section className="md:space-y-24">
          <Row title="Upcoming on Netflix" movies={upComingMovies} />
          <Row title="Drama" movies={dramaShow} />
          <Row title="News" movies={news} />
          <Row title="Western" movies={westernShow} />
          <Row title="History" movies={historyMovie} />
        </section>
      </main>
      {showModal && <ModalPreview />}
    </div>
  )
}

export default Show

export const getServerSideProps = async () => {
  const [historyMovie, westernShow, dramaShow, news, upComingMovies] =
    await Promise.all([
      fetch(requests.fetchHistoryMovies).then((res) => res.json()),
      fetch(requests.fetchWestern).then((res) => res.json()),
      fetch(requests.fetchDrama).then((res) => res.json()),
      fetch(requests.fetchNews).then((res) => res.json()),
      fetch(requests.fetchUpComing).then((res) => res.json()),
    ])

  return {
    props: {
      historyMovie: historyMovie.results,
      westernShow: westernShow.results,
      dramaShow: dramaShow.results,
      news: news.results,
      upComingMovies: upComingMovies.results,
    },
  }
}

Show.Layout = MainLayout
