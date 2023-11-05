import RenderCards from "../Components/RenderCards/RenderCards";
import { useCallback, useEffect, useState } from "react";
import { getSearchMovies } from "../config/api";
import { useLocation } from "react-router-dom";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
}

const Search = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const fetchNextMovies = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const data = await getSearchMovies(searchQuery, page);
      console.log(data);
      if (page === 1) {
        setMovies(data.results);
        setPage((prevPage) => prevPage + 1);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Erro ao obter dados dos filmes:", error);
    }
    setLoading(false);
  }, [loading, page, searchQuery]);

  useEffect(() => {
    fetchNextMovies();
  }, [fetchNextMovies]);

  return (
    <RenderCards
      movies={movies}
      loading={loading}
      fetchApi={fetchNextMovies}
      page={page}
    />
  );
};

export default Search;
