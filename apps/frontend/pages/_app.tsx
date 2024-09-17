import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "../components/layout";
import { queryClient } from "../lib/query-client";
import { useAuthUser } from "../hooks/queries/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(queryClient);

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;
