import { Button, useMantineColorScheme } from "@mantine/core";

export default function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Button size="xs" onClick={() => toggleColorScheme()}>
      Modo {dark ? "Claro" : "Oscuro"}
    </Button>
  );
}
