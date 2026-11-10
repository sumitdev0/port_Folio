import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import Loading from "../components/Loading";

const HeroReadyContext = createContext<(() => void) | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [showIntro, setShowIntro] = useState(() => !window.location.hash);
  const [heroReady, setHeroReady] = useState(false);
  const markHeroReady = useCallback(() => setHeroReady(true), []);
  const dismiss = useCallback(() => setShowIntro(false), []);

  return (
    <HeroReadyContext.Provider value={markHeroReady}>
      {showIntro && <Loading ready={heroReady} onDismiss={dismiss} />}
      <main
        className="main-body"
        ref={(element) => {
          if (element) element.inert = showIntro;
        }}
      >
        {children}
      </main>
    </HeroReadyContext.Provider>
  );
};

export const useHeroReady = () => useContext(HeroReadyContext) ?? undefined;
