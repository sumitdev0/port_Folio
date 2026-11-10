import { lazy, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
const CharacterModel = lazy(() => import("./Character"));
const TechStack = lazy(() => import("./TechStack"));
const desktopEffects = "(min-width: 1025px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const MainContainer = () => {
  const [animated, setAnimated] = useState(() => window.matchMedia(desktopEffects).matches);
  const [characterReady, setCharacterReady] = useState(false);
  const [techNearby, setTechNearby] = useState(false);
  const techSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(desktopEffects);
    const update = () => {
      setAnimated(query.matches);
      if (!query.matches) setCharacterReady(false);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animated || techNearby || !techSection.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTechNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    observer.observe(techSection.current);
    return () => observer.disconnect();
  }, [animated, techNearby]);

  const techPlaceholder = <div className="techstack"><h2>My Techstack</h2></div>;

  return (
    <div className={animated ? "container-main animated-layout" : "container-main static-layout"}>
      {animated && <Cursor />}
      <Navbar animated={animated} />
      {animated && <SocialIcons />}
      {animated && (
        <Suspense fallback={null}>
          <CharacterModel onReady={setCharacterReady} />
        </Suspense>
      )}
      <Landing animated={animated} characterReady={characterReady} />
      <About />
      <WhatIDo animated={animated} />
      <Career animated={animated} />
      <Work animated={animated} />
      {animated && (
        <div ref={techSection}>
          <Suspense fallback={techPlaceholder}>
            {techNearby ? <TechStack /> : techPlaceholder}
          </Suspense>
        </div>
      )}
      <Contact />
    </div>
  );
};

export default MainContainer;
