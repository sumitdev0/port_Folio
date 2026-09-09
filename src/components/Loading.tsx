import { useEffect, useState, useRef } from "react";
import "../styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { initialFX } from "./utils/initialFX";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 700);
        return () => clearTimeout(t2);
      }, 400);
      return () => clearTimeout(t1);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      const t = setTimeout(() => {
        initialFX();
        setIsLoading(false);
      }, 850);
      return () => clearTimeout(t);
    }
  }, [isLoaded, setIsLoading]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapRef.current.style.setProperty("--mouse-x", `${x}px`);
    wrapRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleManualEnter = () => {
    if (loaded && !clicked) {
      setIsLoaded(true);
    }
  };

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title">
          SUMIT
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee">
          <div className="marquee-track">
            <span>Sumit Bal</span>
            <span>AI & Machine Learning</span>
            <span>Software Developer</span>
            <span>Computer Science & Engineering</span>
            <span>Sumit Bal</span>
            <span>AI & Machine Learning</span>
            <span>Software Developer</span>
            <span>Computer Science & Engineering</span>
          </div>
        </div>

        <div
          ref={wrapRef}
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
          onClick={handleManualEnter}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.min(percent, 100)}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;
  let isDone = false;

  // Gentle ambient progression while model downloads and initializes
  const interval = setInterval(() => {
    if (isDone) return;
    if (percent < 45) {
      percent += Math.floor(Math.random() * 6) + 3;
      if (percent > 45) percent = 45;
      setLoading(percent);
    } else if (percent < 75) {
      percent += Math.floor(Math.random() * 3) + 1;
      if (percent > 75) percent = 75;
      setLoading(percent);
    } else if (percent < 88) {
      percent += 1;
      setLoading(percent);
    }
  }, 100);

  // Real download progress tracking from GLTFLoader
  function onProgress(ratio: number) {
    if (isDone) return;
    const target = Math.min(Math.round(20 + ratio * 0.7), 90);
    if (target > percent) {
      percent = target;
      setLoading(percent);
    }
  }

  // Safety fallback: only if the network completely fails after 15 seconds
  const safetyTimeout = setTimeout(() => {
    if (!isDone) {
      console.warn("Loading safety timeout reached (15s). Proceeding.");
      loaded();
    }
  }, 15000);

  function loaded() {
    if (isDone) return Promise.resolve(100);
    isDone = true;
    clearInterval(interval);
    clearTimeout(safetyTimeout);
    return new Promise<number>((resolve) => {
      const fastInterval = setInterval(() => {
        if (percent < 100) {
          percent += 4;
          if (percent > 100) percent = 100;
          setLoading(percent);
        } else {
          clearInterval(fastInterval);
          resolve(100);
        }
      }, 16);
    });
  }

  function clear() {
    isDone = true;
    clearInterval(interval);
    clearTimeout(safetyTimeout);
    setLoading(100);
  }

  return { loaded, clear, onProgress };
};
