import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/WhatIDo.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WhatIDo = ({ animated }: { animated: boolean }) => {
  useGSAP(() => {
    if (!animated) return;
    // Scroll-triggered entrance animation for What I Do cards and dashed borders
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".what-border1",
      { maxWidth: "0%" },
      { maxWidth: "100%", duration: 0.9, ease: "power2.out" }
    )
      .fromTo(
        ".what-border2",
        { maxHeight: "0%" },
        { maxHeight: "100%", duration: 0.9, ease: "power2.out" },
        "<"
      )
      .fromTo(
        ".what-corner",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
        "-=0.5"
      )
      .fromTo(
        ".what-content-in",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.3"
      );

  }, { dependencies: [animated], revertOnUpdate: true });

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className={animated ? "what-content what-noTouch" : "what-content"}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <div className="what-header">
                <h3>DEVELOP</h3>
                <div className="what-arrow"></div>
              </div>
              <h4>Description</h4>
              <p>
                Building responsive web interfaces, robust scripts, and database-backed applications with clean logic and modern developer tooling.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">C</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">HTML</div>
                <div className="what-tags">CSS</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">Vercel</div>
                <div className="what-tags">Web Automation</div>
              </div>
            </div>
          </div>
          <div
            className={animated ? "what-content what-noTouch" : "what-content"}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <div className="what-header">
                <h3>AI & DATA</h3>
                <div className="what-arrow"></div>
              </div>
              <h4>Description</h4>
              <p>
                Applying mathematical analysis and algorithmic problem solving to AI workflows, numerical computation, and agentic architectures.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">NumPy</div>
                <div className="what-tags">JupyterLab</div>
                <div className="what-tags">Data Structures</div>
                <div className="what-tags">Algorithms</div>
                <div className="what-tags">Problem Solving</div>
                <div className="what-tags">Google Cloud AI</div>
                <div className="what-tags">Agentic Systems</div>
                <div className="what-tags">Decoding RAG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
