import RenderCards from "../Components/RenderCards/RenderCards";
import { useCallback, useEffect, useState } from "react";
import { getDataMovies } from "../config/api";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noMorePages, setNoMorePages] = useState(false);

  const fetchNextMovies = useCallback(async () => {
    if (loading || noMorePages) {
      return;
    }
    setLoading(true);

    try {
      const data = await getDataMovies(page);
      if (data.results.length === 0) {
        setNoMorePages(true);
      } else {
        if (page === 1) {
          setMovies(data.results);
          setPage((prevPage) => prevPage + 1);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      console.error("Erro ao obter dados dos filmes:", error);
    }
    setLoading(false);
  }, [loading, page, noMorePages]);

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
      noMorePages={noMorePages}
    />
  );
};

export default Home;
