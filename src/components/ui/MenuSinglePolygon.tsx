import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MenuSinglePolygonProps {
  className?: string;
}

export const MenuSinglePolygon: React.FC<MenuSinglePolygonProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera (Narrow FOV 38 for perfectly equal edge lengths)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for Single Polygon
    const polygonGroup = new THREE.Group();
    scene.add(polygonGroup);

    // Detect theme for optimal stroke contrast in Light Mode
    const isDark = document.documentElement.classList.contains('dark');
    const polyColor = isDark ? '#3b82f6' : '#1d4ed8';
    const polyOpacity = isDark ? 0.85 : 0.98;

    // CLEAN PENTAGONAL DODECAHEDRON POLYGON (EDGESGEOMETRY)
    const mainGeometry = new THREE.DodecahedronGeometry(3.2, 0);
    const edgesGeo = new THREE.EdgesGeometry(mainGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(polyColor),
      transparent: true,
      opacity: polyOpacity
    });
    const mainPolygon = new THREE.LineSegments(edgesGeo, lineMaterial);
    polygonGroup.add(mainPolygon);

    // Thick border stroke overlay for Menu Polygon
    const menuStrokeOverlay = new THREE.LineSegments(edgesGeo, lineMaterial);
    menuStrokeOverlay.scale.set(1.003, 1.003, 1.003);
    mainPolygon.add(menuStrokeOverlay);

    // Position Single Polygon on the Right-Center area
    polygonGroup.position.set(1.8, 0, 0);

    // Mouse Tracking for Direct Cursor Movement Response
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      // Mouse position normalized (-1 to +1)
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation towards mouse cursor
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      // Move polygon directly towards mouse cursor
      polygonGroup.position.x = 1.8 + currentX * 1.4;
      polygonGroup.position.y = -currentY * 1.2;

      // Rotate and tilt polygon facing cursor
      polygonGroup.rotation.x = elapsedTime * 0.25 + currentY * 1.5;
      polygonGroup.rotation.y = elapsedTime * 0.35 + currentX * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      mainGeometry.dispose();
      edgesGeo.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
