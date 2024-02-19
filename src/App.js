import { WineProvider } from "./context/WineContext";
import HomePage from "./pages/HomePage";

function MyApp({ children }) {
  return (
    <WineProvider>
      <HomePage />
    </WineProvider>
  );
}

export default MyApp;
