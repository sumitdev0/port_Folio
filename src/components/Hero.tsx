import React, { useState, useEffect } from "react";
import { Hero3D } from "./Hero3D";
import { PERSONAL_INFO } from "../data/portfolioData";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";

export const Hero: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % PERSONAL_INFO.titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "140px",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      {/* 3D WebGL Background / Visual Scene */}
      <Hero3D />

      <div className="container" style={{ pointerEvents: "none" }}>
        <div
          style={{
            maxWidth: "760px",
            pointerEvents: "auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Top Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(157, 114, 255, 0.1)",
              border: "1px solid rgba(157, 114, 255, 0.25)",
              color: "var(--accent-purple)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "24px",
              backdropFilter: "blur(10px)",
            }}
          >
            <Sparkles size={14} />
            <span>AI & Machine Learning Specialist</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "clamp(3.2rem, 7.5vw, 6.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: "20px",
            }}
          >
            SUMIT <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 20%, #9d72ff 65%, #38ef7d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BAL
            </span>
          </h1>

          {/* Dynamic Role Switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              <Terminal size={22} color="var(--accent-cyan)" />
              <span className="landing-creative-neon">A Creative </span>
              <span
                key={titleIndex}
                style={{
                  color: "var(--accent-purple)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(157, 114, 255, 0.4)",
                  textUnderlineOffset: "6px",
                  animation: "fadeInUp 0.4s ease-out forwards",
                }}
              >
                {PERSONAL_INFO.titles[titleIndex]}
              </span>
            </div>
          </div>

          {/* Intro Description */}
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              lineHeight: 1.65,
              color: "var(--text-secondary)",
              marginBottom: "36px",
              maxWidth: "600px",
            }}
          >
            Pursuing Computer Science & Engineering at Narula Institute of Technology. Designing robust software, algorithmic problem solutions, and intelligent agentic workflows.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              alignItems: "center",
              marginBottom: "44px",
            }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary"
            >
              <span>Explore Projects</span>
              <ArrowDown size={16} />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="btn-secondary"
            >
              <Mail size={16} />
              <span>Get In Touch</span>
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="pill-badge"
              style={{ padding: "12px 18px", fontSize: "0.9rem" }}
              title="GitHub Profile"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="pill-badge"
              style={{ padding: "12px 18px", fontSize: "0.9rem" }}
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "16px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              maxWidth: "600px",
            }}
          >
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: i === 0 ? "var(--accent-cyan)" : "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "2px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
