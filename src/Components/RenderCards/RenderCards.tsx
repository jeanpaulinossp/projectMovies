import { MantineProvider } from "@mantine/core";
import { CardMovie } from "../Card/CardMovie";
import { useCallback, useEffect, useRef } from "react";
import noImage from "../../assets/noimagem.png";

interface RenderCardsProps {
  movies: Array<{
    poster_path: string;
    title: string;
    overview: string;
    id: number;
  }>;
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
  const scrollTimeout = useRef<NodeJS.Timeout | number | undefined>();

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current as NodeJS.Timeout);
    }
    scrollTimeout.current = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
        fetchApi();
      }
    }, 300);
  }, [scrollTimeout, fetchApi]);

  useEffect(() => {
    if (page > 1) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page, handleScroll]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5 mt-4">
        <MantineProvider>
          {movies &&
            movies.map((item, index) => (
              <CardMovie
                key={index}
                image={
                  item.poster_path === null || item.poster_path === undefined
                    ? noImage
                    : `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                }
                title={item.title}
                description={item.overview}
                id={item.id}
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
