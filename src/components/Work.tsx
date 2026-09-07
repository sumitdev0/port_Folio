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
    image: "/images/project-expense-tracker.jpg",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Password Manager",
    category: "Cybersecurity & Utilities",
    tools: "Python, Cryptography, Hashing, Secure Vault",
    image: "/images/project-password-manager.jpg",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Python Web Automation",
    category: "Automation & Scripting",
    tools: "Python, Web Scraping, Headless Automation, Pipelines",
    image: "/images/project-web-automation.jpg",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Smart Calculator",
    category: "Algorithms & Math Engine",
    tools: "JavaScript, Python, Expression Parsing, Interactive UI",
    image: "/images/project-smart-calculator.jpg",
    link: "https://github.com/sumitdev0",
  },
  {
    name: "Task Tracker",
    category: "Productivity & State Management",
    tools: "JavaScript, HTML, CSS, Task Scheduling, Filtering",
    image: "/images/project-task-tracker.jpg",
    link: "https://github.com/sumitdev0",
  },
];

const Work = () => {
  useGSAP(() => {
    const workSection = document.querySelector(".work-section") as HTMLElement;
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workContainer = document.querySelector(".work-container") as HTMLElement;
    if (!workSection || !workFlex || !workContainer) return;

    const getScrollDistance = () => {
      const boxes = workFlex.querySelectorAll<HTMLElement>(".work-box");
      if (!boxes || boxes.length === 0) return 0;
      const lastBox = boxes[boxes.length - 1];
      const totalWidth = lastBox.offsetLeft + lastBox.offsetWidth;
      const containerWidth = workContainer.clientWidth;
      return Math.max(0, totalWidth - containerWidth + 80);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: 1,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollDistance(),
      ease: "none",
    });

    const refreshOnImageLoad = () => {
      ScrollTrigger.refresh();
    };

    const imgs = workFlex.querySelectorAll("img");
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", refreshOnImageLoad);
    });

    window.addEventListener("resize", refreshOnImageLoad);

    return () => {
      window.removeEventListener("resize", refreshOnImageLoad);
      imgs.forEach((img) => img.removeEventListener("load", refreshOnImageLoad));
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
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
      </div>
    </div>
  );
};

export default Work;
