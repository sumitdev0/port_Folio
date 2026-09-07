import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices (desktops/laptops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const loop = () => {
      // Lerp smoothing
      const speed = 0.22;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animId = requestAnimationFrame(loop);

    // Add hover listeners to clickable elements
    const handleElementHover = () => setHovered(true);
    const handleElementUnhover = () => setHovered(false);

    const attachListeners = () => {
      const clickables = document.querySelectorAll(
        "a, button, input, textarea, .glass-card, [role='button']"
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleElementHover);
        el.addEventListener("mouseleave", handleElementUnhover);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovered ? "hovered" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    />
  );
};
