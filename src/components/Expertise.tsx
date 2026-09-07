import React, { useState } from "react";
import { Code2, Cpu, ArrowRight } from "lucide-react";

export const Expertise: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dev" | "ai">("dev");

  const domains = [
    {
      id: "dev" as const,
      tag: "DOMAIN // 01",
      title: "Full-Stack Development & Automation",
      subtitle: "Software Engineering & Infrastructure",
      description: "Building responsive, resilient web applications, data-backed cloud integrations, and robust automated Python scripting pipelines.",
      icon: <Code2 size={28} color="var(--accent-purple)" />,
      skills: [
        { name: "Python", desc: "Automation, CLI & Backend" },
        { name: "C Language", desc: "Memory & Low-Level Computing" },
        { name: "JavaScript / TS", desc: "Dynamic Frontend & Node" },
        { name: "HTML5 & CSS3", desc: "Modern Responsive Layouts" },
        { name: "Supabase", desc: "PostgreSQL Cloud DB & Auth" },
        { name: "Vercel", desc: "Edge Deployment & CI/CD" },
        { name: "Web Automation", desc: "Headless Scraping & Drivers" },
        { name: "Git & Version Control", desc: "Collaborative Pipelines" },
      ],
      points: [
        "Architecting clean, modular UI components and responsive layouts.",
        "Developing real-time persistent data storage solutions with Supabase.",
        "Automating repetitive web workflows using headless Python drivers.",
      ],
    },
    {
      id: "ai" as const,
      tag: "DOMAIN // 02",
      title: "AI, Data Science & Agentic Systems",
      subtitle: "Machine Intelligence & Numerical Computing",
      description: "Applying mathematical rigor, algorithmic problem solving, and modern ML/RAG frameworks to build intelligent, autonomous agentic workflows.",
      icon: <Cpu size={28} color="var(--accent-cyan)" />,
      skills: [
        { name: "NumPy", desc: "Matrix Math & Vector Operations" },
        { name: "JupyterLab", desc: "Exploratory Data Science" },
        { name: "Data Structures & Algos", desc: "Optimized Computational Thinking" },
        { name: "Google Cloud AI", desc: "Certified Foundation Models" },
        { name: "Agentic Systems", desc: "Autonomous Decision Loops" },
        { name: "Decoding RAG", desc: "Contextual Knowledge Retrieval" },
        { name: "Mathematical Modeling", desc: "Linear Algebra & Statistics" },
        { name: "Problem Solving", desc: "Algorithmic Analysis" },
      ],
      points: [
        "Implementing numerical matrix computation and high-speed data structures.",
        "Exploring Retrieval-Augmented Generation (RAG) for localized contextual intelligence.",
        "Studying agentic reasoning patterns, tool-calling loops, and prompt architectures.",
      ],
    },
  ];

  return (
    <section id="expertise" className="section" style={{ background: "rgba(10, 8, 15, 0.5)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "50px" }}>
          <div className="section-tag">02 // WHAT I DO</div>
          <h2 className="section-title">
            Specialized in <span>modern software & AI.</span>
          </h2>
          <p className="section-subtitle">
            Bridging the gap between reliable full-stack engineering and cutting-edge artificial intelligence architectures.
          </p>
        </div>

        {/* Domain Selector Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "36px",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "16px",
            overflowX: "auto",
          }}
        >
          {domains.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setActiveTab(domain.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                borderRadius: "12px",
                background: activeTab === domain.id ? "rgba(157, 114, 255, 0.15)" : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${activeTab === domain.id ? "var(--accent-purple)" : "var(--border-subtle)"}`,
                color: activeTab === domain.id ? "#ffffff" : "var(--text-secondary)",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "all 0.25s ease",
              }}
            >
              {domain.icon}
              <span>{domain.title}</span>
            </button>
          ))}
        </div>

        {/* Active Domain Presentation */}
        {domains
          .filter((d) => d.id === activeTab)
          .map((domain) => (
            <div
              key={domain.id}
              className="glass-card"
              style={{
                padding: "48px",
                border: "1px solid rgba(157, 114, 255, 0.2)",
                boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "48px",
                }}
              >
                {/* Overview Column */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      color: domain.id === "dev" ? "var(--accent-purple)" : "var(--accent-cyan)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      marginBottom: "12px",
                    }}
                  >
                    {domain.tag}
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      marginBottom: "8px",
                    }}
                  >
                    {domain.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "20px",
                    }}
                  >
                    {domain.subtitle}
                  </div>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                      marginBottom: "28px",
                    }}
                  >
                    {domain.description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {domain.points.map((point, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          fontSize: "0.95rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        <ArrowRight size={18} color="var(--accent-purple)" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Tools Grid */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "20px",
                    }}
                  >
                    // TOOLING & COMPETENCIES
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "14px",
                    }}
                  >
                    {domain.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          padding: "16px 18px",
                          borderRadius: "14px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-hover)";
                          e.currentTarget.style.background = "rgba(157, 114, 255, 0.08)";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            marginBottom: "4px",
                          }}
                        >
                          {skill.name}
                        </div>
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {skill.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
