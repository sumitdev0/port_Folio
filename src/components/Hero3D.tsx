import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x9d72ff, 4, 50);
    purpleLight.position.set(4, 4, 4);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x38ef7d, 3, 50);
    cyanLight.position.set(-4, -4, 3);
    scene.add(cyanLight);

    // 3. Central Neural / Cybernetic Core
    const group = new THREE.Group();
    scene.add(group);

    // Inner glowing crystal icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x140d2b,
      emissive: 0x5a2ec2,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Outer wireframe shell
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xc2a4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(coreGeometry, wireMaterial);
    wireMesh.scale.setScalar(1.03);
    group.add(wireMesh);

    // Orbiting Rings
    const ringGroup = new THREE.Group();
    group.add(ringGroup);

    const ringGeometry1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x9d72ff,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeometry2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x38ef7d,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    // 4. Neural Particle Cloud
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x9d72ff);
    const c2 = new THREE.Color(0x38ef7d);
    const c3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? c1 : Math.random() > 0.5 ? c2 : c3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // 5. Mouse Interaction Tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.8;
      targetY = y * 1.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse inertia
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      group.rotation.y = elapsedTime * 0.18 + mouseX;
      group.rotation.x = Math.sin(elapsedTime * 0.15) * 0.15 + mouseY;

      // Spin rings at alternating speeds
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.3;

      // Subtle breathing scale pulse
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.035;
      coreMesh.scale.set(scale, scale, scale);
      wireMesh.scale.set(scale * 1.03, scale * 1.03, scale * 1.03);

      // Orbiting light dynamics
      purpleLight.position.x = Math.cos(elapsedTime * 0.8) * 4;
      purpleLight.position.y = Math.sin(elapsedTime * 0.8) * 4;
      cyanLight.position.x = -Math.cos(elapsedTime * 0.6) * 4;
      cyanLight.position.z = Math.sin(elapsedTime * 0.6) * 4;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      ringGeometry1.dispose();
      ringMaterial1.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "auto",
        zIndex: 1,
      }}
      aria-label="Interactive 3D Neural Core Visualization"
    />
  );
};
