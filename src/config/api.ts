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

export const getDataMovies = async (page) => {
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

export const getSearchMovies = async (genreId, page) => {
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
