import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import CharacterModel from "./components/Character";
import MainContainer from "./components/MainContainer";

const App = () => {
  return (
    <LoadingProvider>
      <MainContainer>
        <CharacterModel />
      </MainContainer>
    </LoadingProvider>
  );
};

export default App;
