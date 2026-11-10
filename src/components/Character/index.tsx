import Scene from "./Scene";

const CharacterModel = ({ onReady }: { onReady: (ready: boolean) => void }) => {
  return (
    <div className="character-model" aria-hidden="true">
      <div className="character-rim"></div>
      <Scene onReady={onReady} />
    </div>
  );
};

export default CharacterModel;
