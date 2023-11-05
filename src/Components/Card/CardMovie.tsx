import { Card, Image, Text, Button, Group } from "@mantine/core";
import { useState } from "react";
import MovieModal from "../Modal/MovieModal";
import iconClosed from "../../assets/icon-closed.svg";
import { MovieDetails, getMovieDetails } from "../../config/api";

interface CardMovieProps {
  image: string;
  title: string;
  description: string;
  id: number;
}

export function CardMovie({ image, title, description, id }: CardMovieProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderMovieDetails, setRenderMovieDetails] =
    useState<MovieDetails | null>(null);

  const words = description && description.split(" ");
  const limitedDescription =
    words && words.length > 10
      ? words.slice(0, 30).join(" ") + "..."
      : description;
  const imageStyle = {
    height: "225px",
    width: "100%",
  };

  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const details = await getMovieDetails(id);
      setRenderMovieDetails(details);
    } catch (err) {
      console.error("Erro ao buscar detalhes do filme:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className="grid w-64 bg-blue-900 p-4 mt-2 ml-2 rounded-sm"
    >
      <Card.Section>
        <Image src={image} alt={title} style={imageStyle} />
      </Card.Section>

      <Card.Section className=" p-4 grid h-52">
        <Text className="text-lg font-semibold text-white text-center ">
          {title}
        </Text>

        <Text className="text-sm mt-2 text-gray-400 self-center text-center">
          {limitedDescription}
        </Text>
      </Card.Section>

      <Group className="flex mt-3 border-t self-end justify-center items-center">
        <Button
          radius="md"
          className="p-2 bg-white rounded-sm mb-2 ml-2 mt-2 w-40"
          onClick={openModal}
        >
          Mais informações
        </Button>
      </Group>

      {isModalOpen && (
        <MovieModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <>
            <div className="bg-white rounded-lg p-4">
              <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {renderMovieDetails?.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <img src={iconClosed} alt="Fechar" />
                </button>
              </header>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${renderMovieDetails?.poster_path}`}
                    alt={renderMovieDetails?.title}
                    className="h-72 w-4/5 rounded-lg"
                  />
                </div>

                <div>
                  <div className="mb-4">
                    <span className="text-lg font-semibold">Diretor(a):</span>{" "}
                    {renderMovieDetails?.director}
                  </div>
                  <div className="mb-4">
                    <span className="text-lg font-semibold">Duração:</span>{" "}
                    {renderMovieDetails?.runtime} minutos
                  </div>
                  <div className="mb-4">
                    <span className="text-lg font-semibold">Sinopse:</span>{" "}
                    {renderMovieDetails?.overview}
                  </div>
                </div>
              </div>

              {renderMovieDetails?.cast && (
                <div className="mt-4">
                  <h3 className="text-2xl font-bold mb-4">Elenco:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {renderMovieDetails.cast.map((actor, index) => (
                      <div className="text-center" key={index}>
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                        />
                        <span className="text-lg font-semibold">
                          {actor.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        </MovieModal>
      )}
    </Card>
  );
}
