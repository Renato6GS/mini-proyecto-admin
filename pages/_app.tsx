import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useTheme } from "@/hooks/useTheme";

import "../styles/globals.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { theme, toggleColorTheme } = useTheme();

  return (
    <>
      <Head>
        <title>Citas</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={theme} toggleColorScheme={toggleColorTheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: theme,
          }}>
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
