import RenderCards from "../Components/RenderCards/RenderCards";
import { useCallback, useEffect, useState } from "react";
import { getDataMovies } from "../config/api";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchNextMovies = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const data = await getDataMovies(page);
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
  }, [loading, page]);

  useEffect(() => {
    fetchNextMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <RenderCards
      movies={movies}
      loading={loading}
      fetchApi={fetchNextMovies}
      page={page}
    />
  );
};

export default Home;
