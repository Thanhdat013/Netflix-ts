import { movieState } from "@/atoms/modalAtom"
import { useRouter } from "next/router"
import React from "react"
import { useRecoilState } from "recoil"

type Props = {}

function DetailMovie({}: Props) {
  const router = useRouter()
  const [movie, setMovie] = useRecoilState(movieState)

  let params = new URLSearchParams(location.search)
  const id = params?.get("id")
  return (
    <div>
      {" "}
      <iframe
        width="560"
        height="315"
        src={`https://www.2embed.cc/embed/${movie?.id}`}
        title="Youtube Player"
        allowFullScreen
      />
    </div>
  )
}

export default DetailMovie
