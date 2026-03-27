import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import bustUrl from "../../assets/roman_bust.glb";

// Ensure network-level + loader-level caching for repeat visits.
THREE.Cache.enabled = true;

let hasBustLoadedOnce = false;

function BustModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(bustUrl) as unknown as { scene: THREE.Group };

  // Base orientation so the model faces the viewer immediately on mount.
  const baseRotY = Math.PI + 0.25;
  const baseRotX = 0.06;
  const desiredRot = useRef({ x: baseRotX, y: baseRotY });

  // Recenter the model so its bounding-box center is at the group's origin.
  const centered = useMemo(() => {
    const c = scene.clone(true) as THREE.Group;
    c.updateWorldMatrix(true, true);

    // Some GLBs ship with embedded lights; disable them to prevent "white light" flashes.
    c.traverse((obj) => {
      // THREE.Light has `isLight === true`
      const maybeLight = obj as THREE.Object3D & { isLight?: boolean };
      if (maybeLight.isLight) {
        const l = obj as unknown as THREE.Light;
        l.intensity = 0;
        l.visible = false;
      }
    });

    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.sub(center);
    return c;
  }, [scene]);

  // Hide the geometry briefly after mount to avoid a "default white" flash
  // while textures/materials finish settling.
  const [showModel, setShowModel] = useState(() => hasBustLoadedOnce);
  useEffect(() => {
    hasBustLoadedOnce = true;
    if (hasBustLoadedOnce) setShowModel(true);
    if (showModel) return;
    const id = window.setTimeout(() => setShowModel(true), 850);
    return () => window.clearTimeout(id);
  }, [showModel]);

  useFrame((state, delta) => {
    // Reduce how much it reacts to the cursor.
    const cursorRotY = state.pointer.x * 0.18;
    const cursorRotX = state.pointer.y * 0.08;

    // Add a small delay by first easing "desired" toward the cursor,
    // then easing the actual group toward that desired rotation.
    const targetY = baseRotY + cursorRotY;
    const targetX = baseRotX - cursorRotX;

    const d = desiredRot.current;
    const desiredEase = 1 - Math.pow(0.01, delta); // smaller => more lag
    d.y = THREE.MathUtils.lerp(d.y, targetY, desiredEase);
    d.x = THREE.MathUtils.lerp(d.x, targetX, desiredEase);

    const g = group.current;
    if (!g) return;

    const rotEase = 1 - Math.pow(0.001, delta); // smoothing for visual stability
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, d.y, rotEase);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, d.x, rotEase);
  });

  return (
    <>
      {/* Lights live inside this component so they only appear once the GLB is loaded. */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[2.2, 2.4, 1.6]} intensity={0.9} color={"#ffffff"} />
      {/* subtle rim/back fill */}
      <pointLight position={[-1.2, 1.4, -2.2]} intensity={2.0} color={"#56ffe2"} distance={12} />

      {!showModel && (
        <Html fullscreen>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(10,10,10,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Space Mono',monospace",
              fontSize: 12,
              letterSpacing: 2,
              color: "#444",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            LOADING
          </div>
        </Html>
      )}

      <group ref={group} position={[0, -0.22, 0.12]} rotation={[0.06, Math.PI + 0.25, 0]}>
        {/* Prevent R3F from disposing cached GLTF resources on unmount. */}
        <primitive object={centered} scale={2.42} visible={showModel} dispose={null} />
      </group>
    </>
  );
}

export default function RomanBustScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.62, 3.0], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <BustModel />
      </Suspense> 
    </Canvas>
  );
}

useGLTF.preload(bustUrl);
