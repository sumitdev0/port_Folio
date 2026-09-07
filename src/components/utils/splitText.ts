import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    const text = para.getAttribute("data-original") || para.innerText;
    para.setAttribute("data-original", text);
    para.innerHTML = text
      .split(" ")
      .map(
        (word) =>
          `<span class="split-line" style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="split-word" style="display:inline-block;">${word}&nbsp;</span></span>`
      )
      .join("");

    const words = para.querySelectorAll(".split-word");
    gsap.fromTo(
      words,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.015,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement || para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });

  titles.forEach((title) => {
    // If title has complex nested structure (e.g. What I Do), skip char splitting
    if (title.querySelector(".hat-h2") || title.querySelector("div")) return;

    const text = title.getAttribute("data-original") || title.innerText;
    title.setAttribute("data-original", text);
    title.innerHTML = text
      .split("")
      .map(
        (char) =>
          `<span class="split-line" style="display:inline-block;overflow:hidden;"><span class="split-char" style="display:inline-block;">${char === " " ? "&nbsp;" : char}</span></span>`
      )
      .join("");

    const chars = title.querySelectorAll(".split-char");
    gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.025,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement || title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });
}
