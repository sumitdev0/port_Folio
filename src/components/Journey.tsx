import React from "react";
import { JOURNEY_MILESTONES } from "../data/portfolioData";
import { GraduationCap, Award, Users, Calendar } from "lucide-react";

export const Journey: React.FC = () => {
  const getIcon = (badge: string) => {
    switch (badge) {
      case "DEGREE":
        return <GraduationCap size={20} color="var(--accent-purple)" />;
      case "CERTIFIED":
        return <Award size={20} color="var(--accent-cyan)" />;
      default:
        return <Users size={20} color="#ffd166" />;
    }
  };

  return (
    <section id="journey" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div className="section-tag">05 // EDUCATION & PATHWAY</div>
          <h2 className="section-title">
            Academic pathway & <span>milestones.</span>
          </h2>
          <p className="section-subtitle">
            Formal education, industrial cloud certifications, and hands-on community explorations in modern artificial intelligence.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            position: "relative",
            maxWidth: "860px",
            margin: "0 auto",
            paddingLeft: "32px",
          }}
        >
          {/* Vertical Glowing Line */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              bottom: "20px",
              left: "11px",
              width: "2px",
              background: "linear-gradient(180deg, var(--accent-purple) 0%, var(--accent-cyan) 60%, transparent 100%)",
              opacity: 0.6,
            }}
          />

          {/* Timeline Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {JOURNEY_MILESTONES.map((milestone, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                {/* Glowing Dot Anchor */}
                <div
                  style={{
                    position: "absolute",
                    left: "-32px",
                    top: "16px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--bg-primary)",
                    border: "2px solid",
                    borderColor: idx === 0 ? "var(--accent-purple)" : "var(--accent-cyan)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 12px ${idx === 0 ? "var(--accent-purple-glow)" : "var(--accent-cyan-glow)"}`,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: idx === 0 ? "var(--accent-purple)" : "var(--accent-cyan)",
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: "32px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "#ffffff",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {getIcon(milestone.badge)}
                        <span>{milestone.badge}</span>
                      </span>

                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {milestone.organization}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: "var(--accent-cyan)",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Calendar size={14} />
                      <span>{milestone.year}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      marginBottom: "12px",
                      color: "#ffffff",
                    }}
                  >
                    {milestone.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                    }}
                  >
                    {milestone.description}
                  </p>

                  {milestone.tags && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {milestone.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="pill-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
