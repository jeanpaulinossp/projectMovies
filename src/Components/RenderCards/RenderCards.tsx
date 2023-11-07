import { MantineProvider } from "@mantine/core";
import { CardMovie } from "../Card/CardMovie";
import { useCallback, useEffect, useRef } from "react";
import noImage from "../../assets/noimagem.png";
import InfiniteScroll from "react-infinite-scroll-component";

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
  noMorePages: boolean;
}

const RenderCards: React.FC<RenderCardsProps> = ({
  movies,
  loading,
  fetchApi,
  page,
  noMorePages,
}) => {
  const scrollTimeout = useRef<NodeJS.Timeout | number | undefined>();

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current as NodeJS.Timeout);
    }
    scrollTimeout.current = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
        fetchApi();
      }
    }, 300);
  }, [scrollTimeout, fetchApi]);

  useEffect(() => {
    if (page > 1 && !noMorePages) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page, handleScroll, noMorePages]);

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchApi}
        hasMore={!noMorePages}
        loader={null}
      >
        <div className="flex flex-wrap justify-center gap-5 mt-20 px-0 mx-auto">
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
      </InfiniteScroll>

      {noMorePages ? (
        <span
          style={{
            fontSize: "1.5rem",
            color: "white",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          Não há mais páginas para carregar.
        </span>
      ) : loading ? (
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
      ) : null}
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default RenderCards;

// import { useCallback, useEffect, useRef } from "react";
// import noImage from "../../assets/noimagem.png";
// import { VariableSizeGrid as Grid } from "react-window";
// import { CardMovie } from "../Card/CardMovie";
// import InfiniteScroll from "react-infinite-scroll-component";
// import style from "./style.module.css";

// interface RenderCardsProps {
//   movies: Array<{
//     poster_path: string;
//     title: string;
//     overview: string;
//     id: number;
//   }>;
//   loading: boolean;
//   fetchApi: () => void;
//   page: number;
//   noMorePages: boolean;
// }

// interface ItemRendererParams {
//   columnIndex: number;
//   rowIndex: number;
// }

// const RenderCards: React.FC<RenderCardsProps> = ({
//   movies,
//   loading,
//   fetchApi,
//   page,
//   noMorePages,
// }) => {
//   const itemCount = movies.length;
//   const itemsPerRow = 4;

//   const itemRenderer = ({ columnIndex, rowIndex }: ItemRendererParams) => {
//     const index = rowIndex * itemsPerRow + columnIndex;

//     if (index >= itemCount) {
//       return null;
//     }

//     const item = movies[index];

//     return (
//       <div className={style.paiMovieCard}>
//         <div className={style.movieCard}>
//           <CardMovie
//             key={index}
//             image={
//               item.poster_path === null || item.poster_path === undefined
//                 ? noImage
//                 : `https://image.tmdb.org/t/p/w500/${item.poster_path}`
//             }
//             title={item.title}
//             description={item.overview}
//             id={item.id}
//           />
//         </div>
//       </div>
//     );
//   };

//   const itemsPerColumn = Math.ceil(itemCount / itemsPerRow);
//   const larguraDaGrade = window.innerWidth * 0.9;
//   const alturaDaGrade = itemsPerColumn * 400;

//   const scrollTimeout = useRef<NodeJS.Timeout | number | undefined>();

//   const handleScroll = useCallback(() => {
//     if (scrollTimeout.current) {
//       clearTimeout(scrollTimeout.current as NodeJS.Timeout);
//     }
//     scrollTimeout.current = setTimeout(() => {
//       const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//       if (scrollHeight - scrollTop <= clientHeight + 200) {
//         fetchApi();
//       }
//     }, 50);
//   }, [scrollTimeout, fetchApi]);

//   useEffect(() => {
//     if (page > 1 && !noMorePages) {
//       window.addEventListener("scroll", handleScroll);
//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }
//   }, [page, handleScroll, noMorePages]);

//   return (
//     <>
//       <div className="flex flex-wrap flex-col w-full justify-center mt-20">
//         <InfiniteScroll
//           dataLength={movies.length}
//           next={fetchApi}
//           hasMore={!noMorePages}
//           loader={null}
//         >
//           <Grid
//             height={alturaDaGrade}
//             width={larguraDaGrade}
//             rowCount={Math.ceil(itemCount / 4)}
//             columnCount={4}
//             columnWidth={() => larguraDaGrade / 4}
//             rowHeight={() => 520}
//             style={{ overflow: "hidden" }}
//             className="mx-auto relative"
//           >
//             {itemRenderer}
//           </Grid>
//         </InfiniteScroll>
//         {noMorePages ? (
//           <span
//             style={{
//               fontSize: "1.5rem",
//               color: "white",
//               textAlign: "center",
//               marginTop: "1rem",
//             }}
//           >
//             Não há mais páginas para carregar.
//           </span>
//         ) : loading ? (
//           <span
//             style={{
//               fontSize: "2rem",
//               color: "white",
//               textAlign: "center",
//               marginTop: "1rem",
//             }}
//           >
//             Carregando...
//           </span>
//         ) : null}
//       </div>
//       <div style={{ height: "100px" }}></div>
//     </>
//   );
// };

// export default RenderCards;
