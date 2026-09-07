import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initialFX() {
  document.body.style.overflowY = "auto";
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);

  const mainEl = document.querySelector("main");
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  // Smooth entrance animation for hero typography
  gsap.fromTo(
    [".landing-intro h2", ".landing-intro h1", ".landing-info h3", ".landing-info-h2"],
    { opacity: 0, y: 35, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.2,
    }
  );

  // Smooth entrance for navigation and social dock
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.1,
    }
  );
}
