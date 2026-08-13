import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
  wireframeColor?: string;
  accentColor?: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  className = '',
  wireframeColor = '#3b82f6',
  accentColor = '#60a5fa'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera (Narrow FOV 38 prevents perspective edge distortion for perfectly equal edge lengths)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 11;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Group
    const group = new THREE.Group();
    scene.add(group);

    // Detect current theme for optimal wireframe contrast & bold stroke width (Cyan-Blue Mix)
    const isDark = document.documentElement.classList.contains('dark');
    const mainColor = isDark ? '#06b6d4' : '#0284c7'; // Cyan-Blue blend in Light & Dark Mode
    const boldAccentColor = isDark ? '#38bdf8' : '#0ea5e9'; // Ocean Cyan accent
    const lineOpacity = isDark ? 0.85 : 0.98; // Full opacity contrast in Light Mode

    // -------------------------------------------------------------
    // 3 BOLD PENTAGONAL DODECAHEDRON POLYGONS WITH THICK BORDER LINES
    // -------------------------------------------------------------

    // POLYGON 1: Top-Left
    const geoPolyhedron1 = new THREE.DodecahedronGeometry(2.4, 0);
    const edgesGeo1 = new THREE.EdgesGeometry(geoPolyhedron1);
    const mat1 = new THREE.LineBasicMaterial({
      color: new THREE.Color(mainColor),
      transparent: true,
      opacity: lineOpacity
    });
    const poly1 = new THREE.LineSegments(edgesGeo1, mat1);
    poly1.position.set(-4.5, 3.2, -1.0);
    poly1.rotation.set(0.3, 0.4, 0.1);
    group.add(poly1);

    // Thick border stroke overlay for Polygon 1 (Light Mode Boldness)
    const poly1Stroke = new THREE.LineSegments(edgesGeo1, mat1);
    poly1Stroke.scale.set(1.003, 1.003, 1.003);
    poly1.add(poly1Stroke);

    // POLYGON 2: Main Right (Large bold dodecahedron)
    const geoPolyhedron2 = new THREE.DodecahedronGeometry(4.2, 0);
    const edgesGeo2 = new THREE.EdgesGeometry(geoPolyhedron2);
    const mat2 = new THREE.LineBasicMaterial({
      color: new THREE.Color(boldAccentColor),
      transparent: true,
      opacity: lineOpacity
    });
    const poly2 = new THREE.LineSegments(edgesGeo2, mat2);
    poly2.position.set(4.2, 0.4, 0.2);
    poly2.rotation.set(0.25, -0.35, -0.15);
    group.add(poly2);

    // Thick border stroke overlay for Polygon 2
    const poly2Stroke = new THREE.LineSegments(edgesGeo2, mat2);
    poly2Stroke.scale.set(1.002, 1.002, 1.002);
    poly2.add(poly2Stroke);

    // POLYGON 3: Bottom-Center
    const geoPolyhedron3 = new THREE.DodecahedronGeometry(2.0, 0);
    const edgesGeo3 = new THREE.EdgesGeometry(geoPolyhedron3);
    const mat3 = new THREE.LineBasicMaterial({
      color: new THREE.Color(mainColor),
      transparent: true,
      opacity: lineOpacity
    });
    const poly3 = new THREE.LineSegments(edgesGeo3, mat3);
    poly3.position.set(0.8, -4.0, -1.2);
    poly3.rotation.set(-0.2, 0.3, 0.1);
    group.add(poly3);

    // Thick border stroke overlay for Polygon 3
    const poly3Stroke = new THREE.LineSegments(edgesGeo3, mat3);
    poly3Stroke.scale.set(1.003, 1.003, 1.003);
    poly3.add(poly3Stroke);

    // -------------------------------------------------------------
    // Floating Background Particles
    // -------------------------------------------------------------
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(accentColor),
      size: 0.04,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Scroll Tracking (Driven strictly by Scroll Progress)
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop (Slowed down rotation)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const scrollRatio = Math.min(scrollY / 1000, 2);

      // Very slow, buttery smooth ambient group rotation
      group.rotation.x = elapsedTime * 0.015;
      group.rotation.y = elapsedTime * 0.025;

      // SUBTLE EXPANSION AND SLOW ROTATIONS ON SCROLL
      const expandScale1 = 1 + scrollRatio * 0.3;
      poly1.scale.set(expandScale1, expandScale1, expandScale1);
      poly1.rotation.x = elapsedTime * 0.04 + scrollRatio * 0.4;
      poly1.rotation.y = elapsedTime * 0.05;

      const expandScale2 = 1 + scrollRatio * 0.35;
      poly2.scale.set(expandScale2, expandScale2, expandScale2);
      poly2.rotation.x = elapsedTime * 0.03;
      poly2.rotation.y = elapsedTime * 0.04 + scrollRatio * 0.5;

      const expandScale3 = 1 + scrollRatio * 0.3;
      poly3.scale.set(expandScale3, expandScale3, expandScale3);
      poly3.rotation.y = elapsedTime * 0.05 + scrollRatio * 0.4;
      poly3.rotation.z = elapsedTime * 0.02;

      particleSystem.rotation.y = elapsedTime * 0.008;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geoPolyhedron1.dispose();
      geoPolyhedron2.dispose();
      geoPolyhedron3.dispose();
      edgesGeo1.dispose();
      edgesGeo2.dispose();
      edgesGeo3.dispose();
      particleGeo.dispose();
      mat1.dispose();
      mat2.dispose();
      mat3.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [wireframeColor, accentColor]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
