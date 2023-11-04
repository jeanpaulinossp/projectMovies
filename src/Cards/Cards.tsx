import { MantineProvider } from "@mantine/core";
import { CardMovie } from "../Components/Card/CardMovie";

const Cards = () => {
  return (
    <>
      <MantineProvider>
        <CardMovie />
      </MantineProvider>
    </>
  );
};

export default Cards;
