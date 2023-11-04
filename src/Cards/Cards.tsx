import { MantineProvider } from "@mantine/core";
import { CardMovie } from "../Components/Card/CardMovie";
import { useState, useEffect, useCallback } from "react";
import { getDataMovies } from "../config/api";

const Cards = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  let scrollTimeout;

  const fetchNextMovies = useCallback(async () => {
    if (loading) {
      console.log("entrei aqui");
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

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
        fetchNextMovies();
      }
    }, 300);
  };

  useEffect(() => {
    if (page > 1) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page]);

  useEffect(() => {
    fetchNextMovies();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5 mt-4">
        <MantineProvider>
          {movies &&
            movies.map((item, index) => (
              <CardMovie
                key={index}
                image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                title={item.title}
                description={item.overview}
              />
            ))}
        </MantineProvider>
      </div>
      {loading && (
        <span
          style={{
            fontSize: "2rem",
            color: "white",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          Carregando...
        </span>
      )}
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Cards;
