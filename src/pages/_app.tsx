import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";

import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from "../contexts/AuthContext";

//if (process.env.NODE_ENV === "development") {
// myServer(); //inicia o servidor Mirage
//}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <>
          <AuthProvider>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </AuthProvider>
        </>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
