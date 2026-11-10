import "./App.css";
import MainContainer from "./components/MainContainer";
import { LoadingProvider } from "./context/LoadingProvider";
import "./styles/StaticLayout.css";

const App = () => {
  return (
    <LoadingProvider>
      <MainContainer />
    </LoadingProvider>
  );
};

export default App;
