import "@/styles/globals.css";
import { AuthContextProvider } from "@/utils/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
