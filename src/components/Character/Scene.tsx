import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / height;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(22, aspect, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
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

    // Loading progress tracker connected to LoadingProvider
    const progress = setProgress((value) => setLoading(value));

    // --- Load User's Custom GLB Model ---
    const loader = new GLTFLoader();
    const modelPath = "/models/3e69b859-24c7-43f9-8f43-3ade20ef6206.glb";

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.6 / (maxDim || 1);
        model.scale.setScalar(scale);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness, 0.7);
              mat.metalness = Math.max(mat.metalness, 0.2);
            }
          }
        });

        pivotGroup.add(model);
        progress.loaded();
        ScrollTrigger.refresh();
      },
      undefined,
      (error) => {
        console.warn("Could not load custom GLB model, falling back to core geometry:", error);
        const fallbackGeo = new THREE.IcosahedronGeometry(1.2, 1);
        const fallbackMat = new THREE.MeshPhysicalMaterial({
          color: 0x9d72ff,
          emissive: 0x5a2ec2,
          emissiveIntensity: 0.4,
          roughness: 0.2,
          metalness: 0.8,
        });
        const fallbackMesh = new THREE.Mesh(fallbackGeo, fallbackMat);
        pivotGroup.add(fallbackMesh);
        progress.loaded();
        ScrollTrigger.refresh();
      }
    );

    // State object to decouple GSAP scroll rotation from interactive mouse rotation
    const scrollState = {
      rotY: 0,
      rotX: 0,
    };

    // --- Zoom In / Zoom Out Scroll Animations (GSAP ScrollTrigger) ---
    let tl1: gsap.core.Timeline | null = null;
    let tl2: gsap.core.Timeline | null = null;
    let tl3: gsap.core.Timeline | null = null;

    if (window.innerWidth > 1024) {
      // 1. Landing to About: Zoom out camera, rotate character, shift model to the left
      tl1 = gsap.timeline({
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
        .fromTo(".about-me", { y: "-50%" }, { y: "0%", duration: 1 }, 0);

      // 2. About to What I Do: Zoom out further, shift character slightly back towards center, fade about
      tl2 = gsap.timeline({
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
      tl3 = gsap.timeline({
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
    }

    // --- Interactive Mouse Follow Physics ---
    let mouse = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.x = x;
      mouse.y = y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animId: number;
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
    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      progress.clear();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      tl1?.kill();
      tl2?.kill();
      tl3?.kill();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

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
