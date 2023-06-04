import { modalState, movieState } from "@/atoms/modalAtom"
import { baseUrl } from "@/constants/movie"
import { Movie } from "@/models"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa"
import { IoInformationCircle } from "react-icons/io5"
import { useRecoilState } from "recoil"
interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie] = useRecoilState(movieState)
  const [movieBanner, setMovieBanner] = useState<Movie | null>(null)
  const [movieId, setMovieId] = useState<number | null>()
  const router = useRouter()
  useEffect(() => {
    // random 1 phần tử của mảng theo index
    setMovieBanner(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  const [showModal, setShowModal] = useRecoilState(modalState)
  const [showCurrentMovie, setShowCurrentMovie] = useRecoilState(movieState)
  const handlePlayMovie = () => {
    setMovieId(movieBanner?.id)
    console.log(movieBanner?.id)
    router.push({
      pathname: "/detail-movie/[id]",
      query: {
        id: movieId,
      },
    })
  }
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute -z-10 top-0 left-0 h-[95vh] w-full">
        <Image
          src={`${baseUrl}${
            movieBanner?.backdrop_path || movieBanner?.poster_path
          }`}
          alt="banner"
          style={{ objectFit: "cover" }}
          fill
          priority
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movieBanner?.title || movieBanner?.name || movieBanner?.original_title}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl drop-shadow-md">
        {movieBanner?.overview}
      </p>

      <div className="flex gap-3">
        <button
          onClick={handlePlayMovie}
          className="bannerButton bg-white text-black"
        >
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setShowModal(true)
            setShowCurrentMovie(movieBanner)
          }}
        >
          Move Info
          <IoInformationCircle className="h-5 w-5 text-white md:h-7 md:w-7" />
        </button>

        <div></div>
      </div>
    </div>
  )
}

export default Banner
