import { useEffect, useState } from "react";
import "../styles/Loading.css";

const MIN_INTRO_MS = 450;
const MAX_WAIT_MS = 1200;
const FADE_MS = 240;

const Loading = ({ ready, onDismiss }: { ready: boolean; onDismiss: () => void }) => {
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [deadlineReached, setDeadlineReached] = useState(false);
  const exiting = minimumElapsed && (ready || deadlineReached);

  useEffect(() => {
    const minimum = window.setTimeout(() => setMinimumElapsed(true), MIN_INTRO_MS);
    const deadline = window.setTimeout(() => setDeadlineReached(true), MAX_WAIT_MS);
    return () => {
      window.clearTimeout(minimum);
      window.clearTimeout(deadline);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(onDismiss, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [exiting, onDismiss]);

  return (
    <div className={exiting ? "loading-screen loading-screen-exiting" : "loading-screen"}>
      <div className="loading-header" aria-hidden="true">
        <span className="loader-title">SUMIT</span>
        <div className="loaderGame-container">
          <div className="loaderGame-in">
            {Array.from({ length: 27 }, (_, index) => (
              <div className="loaderGame-line" key={index} />
            ))}
          </div>
          <div className="loaderGame-ball" />
        </div>
      </div>

      <div className="loading-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Sumit Bal</span>
          <span>AI &amp; Machine Learning</span>
          <span>Software Developer</span>
          <span>Computer Science &amp; Engineering</span>
          <span>Sumit Bal</span>
          <span>AI &amp; Machine Learning</span>
          <span>Software Developer</span>
          <span>Computer Science &amp; Engineering</span>
        </div>
      </div>

      <div className="loading-wrap">
        <div className="loading-hover" />
        <button
          className="loading-button"
          type="button"
          aria-label="Enter portfolio"
          onClick={onDismiss}
        >
          <span className="loading-label">{exiting ? "Welcome" : "Loading"}</span>
        </button>
      </div>
    </div>
  );
};

export default Loading;
