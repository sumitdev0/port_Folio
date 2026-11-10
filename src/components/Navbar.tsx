import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "../styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ animated }: { animated: boolean }) => {
  useEffect(() => {
    if (!animated) return;
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [animated]);

  return (
    <>
      <nav className="header" aria-label="Main navigation">
        <a href="#landingDiv" className="navbar-title" data-cursor="disable">
          SUMIT
        </a>
        <a
          href="mailto:thisissumitbal2007@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          thisissumitbal2007@gmail.com
        </a>
        <ul>
          <li>
            <a href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </nav>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
