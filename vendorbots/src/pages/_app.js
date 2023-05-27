import "@/styles/globals.css";
import { AuthContextProvider } from "@/utils/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
