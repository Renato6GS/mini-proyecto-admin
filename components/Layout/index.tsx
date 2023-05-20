import { LINKS } from "@/constants/LINKS";
import { AppShell, Burger, Header, MediaQuery, Navbar, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <ul>
              {LINKS.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href}>{name}</Link>{" "}
                </li>
              ))}
            </ul>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" mr="xl" />
            </MediaQuery>
            {/* <ThemeButton /> */}
            <h1 style={{ color: "#09f" }}>Sistema de citas</h1>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}>
      {children}
    </AppShell>
  );
}
