import { modalState, movieState } from "@/atoms/modalAtom"
import { Genre, Movie, Element } from "@/models"
import { Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import ReactPlayer from "react-player"
import { useRecoilState } from "recoil"
import { FaCheck, FaPlay, FaPlus } from "react-icons/fa"
import { AiOutlineLike } from "react-icons/ai"
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs"
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore"
import useAuth from "@/hooks/useAuth"
import { db } from "@/firebase"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/router"

const ModalPreview = ({ handelDetail }: any) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState<string>("")
  const [movieId, setMovieId] = useState<string>("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState<boolean>(true)
  const { user } = useAuth()
  const [moviesList, setMoviesList] = useState<DocumentData[] | Movie[]>([])
  const router = useRouter()
  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  }

  useEffect(() => {
    if (!movie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json())

      if (data && data?.videos) {
        setMovieId(data.id)
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        )

        if (index > -1) setTrailer(data.videos.results[index]?.key)
      }
      if (data?.genres) setGenres(data.genres)
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  // set my list
  const [addedToList, setAddedToList] = useState<boolean>(false)
  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
      )

      toast(
        `${
          movie?.title || movie?.original_title
        } has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
        { ...movie }
      )

      toast(
        `${movie?.title || movie?.original_title} has been added to My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    }
  }

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMoviesList(snapshot.docs)
      )
    }
  }, [db, movie?.id])
  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        moviesList.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [moviesList]
  )
  const handlePlayMovie = () => {
    setMovieId(movie?.id)
    console.log(movie?.id)
    router.push({
      pathname: "/detail-movie/[id]",
      query: {
        id: movieId,
      },
    })
  }

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll  rounded-md scrollbar-hide  "
    >
      <>
        <Toaster position="bottom-center" reverseOrder={false} />
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#151515]"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />

          <div className="absolute bottom-8 flex w-full items-center justify-between px-10 ">
            <div className="flex space-x-2">
              <button
                onClick={handlePlayMovie}
                className="flex items-center gap-x-2 bg-white text-black rounded px-8 text-xl font-bold transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
              </button>

              <button
                className="modalButton hover:opacity-90"
                onClick={handleList}
              >
                {addedToList ? (
                  <FaCheck className="h-4 w-4 text-white md:h-7 md:w-7" />
                ) : (
                  <FaPlus className="h-4 w-4 text-white md:h-7 md:w-7" />
                )}
              </button>

              <button className="modalButton hover:opacity-90">
                <AiOutlineLike className="h-4 w-4 text-white md:h-7 md:w-7" />
              </button>
            </div>
            <button
              className="modalButton  hover:opacity-90"
              onClick={() => setMuted(!muted)}
            >
              {" "}
              {muted ? (
                <BsVolumeMute className="h-4 w-4 text-white md:h-6 md:w-6" />
              ) : (
                <BsVolumeUp className="h-4 w-4 text-white md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  )
}

export default ModalPreview
