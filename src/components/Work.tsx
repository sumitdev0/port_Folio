import { useState, useRef } from "react";
import "../styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "Expense Tracker",
    category: "Finance & Web Application",
    tools: "JavaScript, HTML, CSS, Supabase, Analytics",
    image: "/images/project-expense-tracker.webp",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Password Manager",
    category: "Cybersecurity & Utilities",
    tools: "Python, Cryptography, Hashing, Secure Vault",
    image: "/images/project-password-manager.webp",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Python Web Automation",
    category: "Automation & Scripting",
    tools: "Python, Web Scraping, Headless Automation, Pipelines",
    image: "/images/project-web-automation.webp",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Smart Calculator",
    category: "Algorithms & Math Engine",
    tools: "JavaScript, Python, Expression Parsing, Interactive UI",
    image: "/images/project-smart-calculator.webp",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Task Tracker",
    category: "Productivity & State Management",
    tools: "JavaScript, HTML, CSS, Task Scheduling, Filtering",
    image: "/images/project-task-tracker.webp",
    link: "https://github.com/sumitdev0",
  },
];

const Work = ({ animated }: { animated: boolean }) => {
  const [activeProject, setActiveProject] = useState(1);
  const activeProjectRef = useRef(1);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!animated) return;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workWrapper = document.querySelector(".work-wrapper") as HTMLElement;
    if (!workSection || !workFlex || !workWrapper) return;

    const getScrollDistance = () => {
      const boxes = workFlex.querySelectorAll<HTMLElement>(".work-box");
      if (!boxes || boxes.length === 0) return 0;
      const lastBox = boxes[boxes.length - 1];
      const totalWidth = lastBox.offsetLeft + lastBox.offsetWidth;
      const viewportWidth = workWrapper.clientWidth || window.innerWidth;
      // Position the last card cleanly in view with balanced end padding
      const endPadding = Math.max(32, Math.min(80, viewportWidth * 0.05));
      return Math.max(0, totalWidth - viewportWidth + endPadding);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: 0.3,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${Math.min(100, Math.max(15, self.progress * 100))}%`;
          }
          const current = Math.min(
            projects.length,
            Math.max(1, Math.ceil(self.progress * projects.length))
          );
          if (current !== activeProjectRef.current) {
            activeProjectRef.current = current;
            setActiveProject(current);
          }
        },
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollDistance(),
      ease: "none",
    });
  }, { dependencies: [animated], revertOnUpdate: true });

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-row">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-indicator">
            <span className="work-indicator-active">0{activeProject}</span>
            <span className="work-indicator-sep">/</span>
            <span>0{projects.length}</span>
          </div>
        </div>
      </div>

      <div className="work-wrapper">
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project scroll progress indicator */}
      <div className="work-progress-track">
        <div
          ref={progressFillRef}
          className="work-progress-fill"
          style={{ width: "15%" }}
        />
      </div>
    </div>
  );
};

export default Work;
