import { movieState } from "@/atoms/modalAtom"
import { Header } from "@/components/commons/header"
import { MainLayout } from "@/components/layout"
import { Row } from "@/components/slide"
import { Genre, Movie, ProductCompany } from "@/models"
import requests from "@/utils/requests"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

type Props = {
  trendingNow: Movie[]
}

function DetailMoviePath({ trendingNow }: Props) {
  const [vote, setVote] = useState<number>(0)
  const [genres, setGenres] = useState<Genre[]>([])
  const [productCompany, setProductCompany] = useState<ProductCompany[]>([])
  const [movieTile, setMovieTitle] = useState<string>("")
  const [descMovie, setDescMovie] = useState<string>("")

  const router = useRouter()
  const [currentMovieId, setCurrentMovieId] = useState<number | null>(null)
  useEffect(() => {
    if (router.query) setCurrentMovieId(Number(router.query.id))
    console.log(`https://www.2embed.cc/embed/${currentMovieId}`)
  }, [router.query])

  useEffect(() => {
    if (!currentMovieId) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${currentMovieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      ).then((res) => res.json())
      console.log(data)
      if (data) {
        setVote(data.vote_average)
        setMovieTitle(data.original_title)
        setDescMovie(data.overview)
      }
      if (data?.genres) setGenres(data.genres)
      if (data?.genres) setProductCompany(data.production_companies)
    }

    fetchMovie()
  }, [currentMovieId])

  return (
    <div
      className={`h-full relative bg-gradient-to-b from-gray-900/10 to-[#010511] 
       
      }`}
    >
      <Header />
      <div className="absolute top-20 left-0 right-0">
        <iframe
          width="100%"
          height="600"
          src={`https://www.2embed.cc/embed/${currentMovieId}`}
          title="Youtube Player"
          allowFullScreen
        />
      </div>
      <section className="pt-[700px] relative px-10 pb-12 lg:pb-6">
        <p className="py-1">
          {" "}
          <span className="text-[gray]">Movie: </span>
          {movieTile}
        </p>
        <p className="py-1">
          {" "}
          <span className="text-[gray]">Description: </span>
          {descMovie}
        </p>
        <p className="py-1">
          <span className="text-[gray]">Genres: </span>
          {genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="py-1">
          <span className="text-[gray]">Product: </span>
          {productCompany.map((product) => product.name).join(", ")}
        </p>
        <p className="py-1">
          {" "}
          <span className="text-[gray]">Vote average: </span>
          {vote}
        </p>
        <div className="pt-2 pb-10">
          <Row title="Propose" movies={trendingNow} />
        </div>
      </section>
    </div>
  )
}

export default DetailMoviePath

// DetailMoviePath.Layout = MainLayout
export const getServerSideProps = async () => {
  const trendingNow = await fetch(requests.fetchTrending).then((res) =>
    res.json()
  )

  return {
    props: { trendingNow: trendingNow.results },
  }
}
