import { baseUrl } from "@/constants/movie"
import { Movie } from "@/models"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa"
import { IoInformationCircle } from "react-icons/io5"

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    // random 1 phần tử của mảng theo index
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute -z-10 top-0 left-0 h-[95vh] w-full">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="banner"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_title}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl drop-shadow-md">
        {movie?.overview}
      </p>

      <div className="flex gap-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          Move Info
          <IoInformationCircle className="h-5 w-5 text-white md:h-7 md:w-7" />
        </button>
      </div>
    </div>
  )
}

export default Banner
