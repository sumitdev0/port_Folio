import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Career.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Career = ({ animated }: { animated: boolean }) => {
  useGSAP(() => {
    if (!animated) return;
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 30%",
        end: "100% center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    careerTimeline
      .fromTo(
        ".career-timeline",
        { maxHeight: "10%" },
        { maxHeight: "100%", duration: 0.5 },
        0
      )
      .fromTo(
        ".career-timeline",
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0
      )
      .fromTo(
        ".career-info-box",
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.5 },
        0
      )
      .fromTo(
        ".career-dot",
        { animationIterationCount: "infinite" },
        {
          animationIterationCount: "1",
          delay: 0.3,
          duration: 0.1,
        },
        0
      );

    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  }, { dependencies: [animated], revertOnUpdate: true });
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CSE (AI & ML)</h4>
                <h5>Narula Institute of Technology</h5>
              </div>
              <h3>2029</h3>
            </div>
            <p>
              Undergraduate program in Computer Science and Engineering (AI & ML). Maintaining a CGPA of 8.165 with major focus on CS, Mathematics, and Data Structures.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Innovation with Google AI</h4>
                <h5>Google Cloud</h5>
              </div>
              <h3>CERT</h3>
            </div>
            <p>
              Completed certification covering Google Cloud AI ecosystems, generative models, and intelligent cloud developer tools.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>ML to Agentic Systems & RAG</h4>
                <h5>Google Developer Group (GDG NiT)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Active participant in specialized technical sessions exploring modern machine learning pipelines, Retrieval-Augmented Generation (RAG), and agentic workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
