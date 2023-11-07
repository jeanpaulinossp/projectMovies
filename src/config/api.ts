import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_API_TOKEN;
const baseUrl = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

interface CrewMember {
  name: string;
  job: string;
}

interface MovieData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface ApiResponse {
  results: MovieData[];
}

interface CastMember {
  name: string;
  profile_path: string | null;
}
export interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  director: string;
  runtime: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export const getDataMovies = async (page: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(
      `/movie/popular?language=en-US&page=${page}`,
      {
        params: {
          language: "pt-BR",
          page: page,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erro ao obter dados dos filmes:", error);
    throw error;
  }
};

export const getSearchMovies = async (
  genreId: string,
  page: number
): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/search/movie`, {
      params: {
        query: genreId,
        include_adult: false,
        language: "pt-BR",
        sort_by: "release_date.asc",
        page: page,
      },
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error("Erro ao obter dados dos filmes:", err);
    throw err;
  }
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  try {
    const response = await api.get(`/movie/${movieId}?language=pt-BR`);
    const basicMovieData = response.data;

    const creditsResponse = await api.get(`/movie/${movieId}/credits`);
    const creditsData = creditsResponse.data;

    const director = creditsData.crew.find(
      (crewMember: CrewMember) => crewMember.job === "Director"
    );

    const cast = creditsData.cast;

    const movieDetails: MovieDetails = {
      title: basicMovieData.title,
      overview: basicMovieData.overview,
      poster_path: basicMovieData.poster_path,
      director: director ? director.name : "N/A",
      runtime: basicMovieData.runtime,
      cast: cast,
      crew: creditsData.crew,
    };

    console.log(movieDetails);

    return movieDetails;
  } catch (error) {
    console.error("Erro ao obter dados do filme:", error);
    throw error;
  }
};
