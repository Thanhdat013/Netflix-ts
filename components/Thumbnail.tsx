import { baseUrl } from "@/constants/movie"
import { Movie } from "@/models"
import Image from "next/image"

interface Props {
  movie: Movie
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px]   md:hover:scale-105">
      <Image
        alt="thumbnail"
        src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        fill
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  )
}

export default Thumbnail
