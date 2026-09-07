import { PropsWithChildren, useState, useEffect } from "react";
import "../styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Developer", "Engineer", "AI Builder", "Problem Solver"];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

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
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="role-roller" key={roleIndex}>
                {roles[roleIndex]}
              </div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
