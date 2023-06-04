const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchAnimeMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
  fetchHistoryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`,

  fetchPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,

  fetchUpComing: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,

  // TV and show
  fetchShowPopular: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648`,
  fetchCrime: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=80`,
  fetchDrama: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=18`,
  fetchNews: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10763`,
  fetchFantasy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10765`,
  fetchWestern: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=37`,
}

export default requests
