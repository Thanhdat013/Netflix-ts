import { modalState } from "@/atoms/modalAtom"
import { Banner, Row } from "@/components/slide"
import { MainLayout } from "@/components/layout"
import { ModalPreview } from "@/components/preview"
import { Movie } from "@/models"
import requests from "@/utils/requests"
import Head from "next/head"
import { useRecoilValue } from "recoil"

interface Props {
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  popularNetflix: Movie[]
  animeMovies: Movie[]
}

function Genre({
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  popularNetflix,
  animeMovies,
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
      <main className="relative pl-4 pb-12 lg:space-y-24 lg:pb-6">
        <Banner netflixOriginals={popularNetflix} />
        <section className="md:space-y-24">
          <Row title="Popular on Netflix" movies={popularNetflix} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Anime " movies={animeMovies} />
        </section>
      </main>
      {showModal && <ModalPreview />}
    </div>
  )
}

export default Genre

export const getServerSideProps = async () => {
  const [
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    popularNetflix,
    animeMovies,
  ] = await Promise.all([
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchPopular).then((res) => res.json()),
    fetch(requests.fetchAnimeMovies).then((res) => res.json()),
  ])

  return {
    props: {
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      popularNetflix: popularNetflix.results,
      animeMovies: animeMovies.results,
    },
  }
}

Genre.Layout = MainLayout
