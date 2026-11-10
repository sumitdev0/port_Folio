import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ onReady }: { onReady: (ready: boolean) => void }) => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / height;

    const scene = new THREE.Scene();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(22, aspect, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9d72ff, 2.0);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    const purpleRim = new THREE.PointLight(0xc2a4ff, 5, 25);
    purpleRim.position.set(-4, 4, -2);
    scene.add(purpleRim);

    const cyanRim = new THREE.PointLight(0x38ef7d, 4, 25);
    cyanRim.position.set(4, -2, 2);
    scene.add(cyanRim);

    // Pivot group for mouse rotation and floating animation
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);

    // State object to decouple GSAP scroll rotation from interactive mouse rotation
    const scrollState = {
      rotY: 0,
      rotX: 0,
    };

    // --- Zoom In / Zoom Out Scroll Animations (GSAP ScrollTrigger) ---
    const setupScroll = () => gsap.context(() => {
      // 1. Landing to About: Zoom out camera, rotate character, shift model to the left
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl1
        .fromTo(scrollState, { rotY: 0 }, { rotY: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 12.5, duration: 1 }, 0)
        .fromTo(".character-model", { x: "0%" }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "12%" }, { y: "0%", duration: 1 }, 0);

      // 2. About to What I Do: Zoom out further, shift character slightly back towards center, fade about
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "center 55%",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl2
        .to(
          camera.position,
          { z: 26, y: 1.5, duration: 4, ease: "power2.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 4 }, 0)
        .to(".about-section", { opacity: 0, delay: 1, duration: 2 }, 0)
        .to(".character-model", { x: "-12%", duration: 4 }, 0)
        .to(scrollState, { rotY: 0.92, rotX: 0.12, duration: 4 }, 0)
        .to(".character-rim", { opacity: 0, scale: 0, duration: 2 }, 0);

      // 3. What I Do: As user scrolls down in What I Do, the boy simply moves upward 1:1 with the scroll
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".whatIDO",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 1, ease: "none" },
          0
        )
        .to(scrollState, { rotX: -0.04, duration: 1 }, 0);
    });

    // --- Interactive Mouse Follow Physics ---
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.x = x;
      mouse.y = y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animId = 0;
    let inView = false;
    let model: THREE.Group | undefined;
    let scrollContext: gsap.Context | undefined;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth lerp mouse tracking on top of scroll rotation
      targetRotation.y += (mouse.x * 0.35 - targetRotation.y) * 0.08;
      targetRotation.x += (-mouse.y * 0.25 - targetRotation.x) * 0.08;

      pivotGroup.rotation.y = scrollState.rotY + targetRotation.y;
      pivotGroup.rotation.x = scrollState.rotX + targetRotation.x;

      // Gentle breathing idle floating motion
      pivotGroup.position.y = Math.sin(time * 1.5) * 0.06;

      renderer.render(scene, camera);
    };
    const updateAnimation = () => {
      if (model && inView && !document.hidden) {
        if (!animId) animId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", updateAnimation);

    const request = new AbortController();
    const character = container.parentElement;

    const loadModel = async () => {
      try {
        const response = await fetch("/models/meshy-model.glb", { signal: request.signal });
        if (!response.ok) throw new Error(`Model returned HTTP ${response.status}`);
        const data = await response.arrayBuffer();
        const gltf = await new GLTFLoader().parseAsync(data, "/models/");
        if (request.signal.aborted) {
          disposeModel(gltf.scene);
          return;
        }

        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const scale = 2.6 / (Math.max(size.x, size.y, size.z) || 1);
        model.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(scale));
        model.scale.setScalar(scale);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
          if (!mesh.isMesh) return;
          mesh.material.roughness = Math.min(mesh.material.roughness, 0.7);
          mesh.material.metalness = Math.max(mesh.material.metalness, 0.2);
        });

        pivotGroup.add(model);
        renderer.render(scene, camera);
        character?.classList.add("character-loaded");
        onReady(true);
        scrollContext = setupScroll();
        ScrollTrigger.refresh();
        updateAnimation();
      } catch (error) {
        if (!request.signal.aborted) console.warn("Could not load the 3D character", error);
      }
    };
    void loadModel();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      request.abort();
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateAnimation);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      scrollContext?.revert();
      if (model) disposeModel(model);
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, [onReady]);

  return (
    <div
      ref={canvasDiv}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
};

export default Scene;

function disposeModel(model: THREE.Group) {
  model.traverse((child) => {
    const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    for (const value of Object.values(mesh.material)) {
      if (value instanceof THREE.Texture) {
        if (value.image instanceof ImageBitmap) value.image.close();
        value.dispose();
      }
    }
    mesh.material.dispose();
  });
}
