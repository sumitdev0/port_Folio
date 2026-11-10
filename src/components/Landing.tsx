import { useState, useEffect } from "react";
import { useHeroReady } from "../context/LoadingProvider";
import "../styles/Landing.css";

const roles = ["Developer", "Engineer", "AI Builder", "Problem Solver"];

const Landing = ({ animated, characterReady }: { animated: boolean; characterReady: boolean }) => {
  const markHeroReady = useHeroReady();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [animated]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SUMIT
              <br />
              <span>BAL</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3 className="landing-creative-neon">A Creative </h3>
            <h2 className="landing-info-h2">
              <span className="role-roller" key={roleIndex}>
                {animated ? roles[roleIndex] : roles[0]}
              </span>
            </h2>
          </div>
        </div>
        {!characterReady && (
          <img className="hero-poster" src="/images/hero-character.webp"
            width="407" height="520" alt="" fetchPriority="high"
            onLoad={markHeroReady} onError={markHeroReady} />
        )}
      </div>
    </>
  );
};

export default Landing;
