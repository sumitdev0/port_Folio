import React, { useState } from "react";
import { PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { Github, ExternalLink, Check } from "lucide-react";

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Web Applications", value: "web" },
    { label: "Python & Security", value: "python" },
    { label: "Algorithms & Math", value: "algo" },
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === "all") return true;
    if (filter === "web") return proj.category.includes("Web") || proj.category.includes("Finance");
    if (filter === "python") return proj.tools.includes("Python") || proj.category.includes("Cybersecurity");
    if (filter === "algo") return proj.category.includes("Algorithms") || proj.tools.includes("Expression");
    return true;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <div>
            <div className="section-tag">03 // SELECTED WORK</div>
            <h2 className="section-title">
              Engineered for <span>purpose & performance.</span>
            </h2>
            <p className="section-subtitle">
              A collection of software engineering projects, security utilities, and full-stack applications.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono)",
                  background: filter === cat.value ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.05)",
                  color: filter === cat.value ? "#07060a" : "var(--text-secondary)",
                  fontWeight: filter === cat.value ? 700 : 500,
                  border: "1px solid",
                  borderColor: filter === cat.value ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.08)",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "32px",
          }}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Project Image Preview with Overlay */}
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "rgba(10, 8, 15, 0.8)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onError={(e) => {
                    // Fallback to placeholder gradient if image missing
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "rgba(7, 6, 10, 0.75)",
                    backdropFilter: "blur(8px)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent-cyan)",
                    border: "1px solid rgba(56, 239, 125, 0.3)",
                    fontWeight: 600,
                  }}
                >
                  {project.category}
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    fontWeight: 700,
                  }}
                >
                  0{idx + 1}
                </div>
              </div>

              {/* Project Content */}
              <div
                style={{
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      marginBottom: "10px",
                      color: "#ffffff",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {project.highlights.map((h, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.82rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <Check size={14} color="var(--accent-purple)" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Tools & GitHub Action */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "20px",
                      paddingTop: "16px",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    {project.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="pill-badge" style={{ fontSize: "0.72rem", padding: "3px 8px" }}>
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "var(--accent-purple)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--accent-purple)")}
                    >
                      <Github size={16} />
                      <span>Source Repository</span>
                    </a>

                    <button
                      onClick={() => setSelectedProject(project)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <span>Details</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(5, 4, 8, 0.85)",
              backdropFilter: "blur(16px)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="glass-card"
              style={{
                maxWidth: "600px",
                width: "100%",
                padding: "36px",
                border: "1px solid rgba(157, 114, 255, 0.3)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--accent-cyan)",
                      marginBottom: "6px",
                    }}
                  >
                    {selectedProject.category}
                  </div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.5rem",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "24px", color: "var(--text-secondary)" }}>
                {selectedProject.description}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "10px" }}>
                  KEY ARCHITECTURAL HIGHLIGHTS
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedProject.highlights?.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ffffff", fontSize: "0.9rem" }}>
                      <Check size={16} color="var(--accent-cyan)" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  <Github size={18} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
