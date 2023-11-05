import RenderCards from "../Components/RenderCards/RenderCards";
import { useCallback, useEffect, useState } from "react";
import { getDataMovies } from "../config/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
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
