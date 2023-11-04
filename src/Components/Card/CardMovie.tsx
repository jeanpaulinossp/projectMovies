import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";

const mockdata = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  title: "A Volta dos não Foram",
  description: "Esse filme é brabo demais! ",
  icons: [{ emoji: "☀️", label: "Comédia" }],
};

export function CardMovie() {
  const { image, title, description, icons } = mockdata;
  const iconsMovie = icons.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className="w-64 bg-blue-900 p-4 mt-2 ml-2 rounded-sm"
    >
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className="border-b border-gray-300 p-4">
        <Group justify="between">
          <Text className="text-lg font-semibold">{title}</Text>
        </Group>
        <Text className="text-sm mt-2">{description}</Text>
      </Card.Section>

      <Card.Section className="p-4">
        <Group className="gap-7 mt-5">{iconsMovie}</Group>
      </Card.Section>

      <Group className="mt-2">
        <Button
          radius="md"
          className="flex-1 p-2 bg-white rounded-sm mb-2 ml-2"
        >
          Mais informações
        </Button>
      </Group>
    </Card>
  );
}
