import { MantineProvider } from "@mantine/core";
import { CardMovie } from "../Card/CardMovie";
import { useEffect } from "react";

interface RenderCardsProps {
  movies: Array<{ poster_path: string; title: string; overview: string }>; // Adicione as propriedades reais do filme aqui
  loading: boolean;
  fetchApi: () => void;
  page: number;
}

const RenderCards: React.FC<RenderCardsProps> = ({
  movies,
  loading,
  fetchApi,
  page,
}) => {
  let scrollTimeout: NodeJS.Timeout | number | undefined;

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
        fetchApi();
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

export default RenderCards;
