import { Card, Image, Text, Group, Button } from "@mantine/core";

export function CardMovie({ image, title, description }) {
  const words = description.split(" ");
  const limitedDescription =
    words.length > 10 ? words.slice(0, 30).join(" ") + "..." : description;
  const imageStyle = {
    height: "250px",
    width: "100%",
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
        <Group justify="between" className="self-start">
          <Text className="text-lg font-semibold text-white text-center ">
            {title}
          </Text>
        </Group>
        <Text className="text-sm mt-2 text-gray-400 self-center text-center">
          {limitedDescription}
        </Text>
      </Card.Section>

      <Group className="flex mt-3 border-t self-end justify-center items-center">
        <Button
          radius="md"
          className="p-2 bg-white rounded-sm mb-2 ml-2 mt-2 w-40"
        >
          Mais informações
        </Button>
      </Group>
    </Card>
  );
}
