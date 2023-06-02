import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import { AppProps } from 'next/app'
export interface Genre {
  id: number
  name: string
}

export interface Movie {
  backdrop_path: string
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  title: string
  media_type?: string
  first_air_date: string
  genre_ids: number[]
  name: string
  origin_country: string[]
  vote_average: number
  vote_count: number
}

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser"
}

export interface LayoutProps {
  children: ReactNode
}
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}