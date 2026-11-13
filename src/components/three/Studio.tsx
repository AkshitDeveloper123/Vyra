"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";

export function StudioEnvironment({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.35 * intensity} />
      <directionalLight position={[4, 6, 5]} intensity={2.6 * intensity} color="#fffaf2" />
      <directionalLight position={[-5, 2, -3]} intensity={1.4 * intensity} color="#9c93ff" />
      <pointLight position={[-3.5, -1.5, 3]} intensity={10 * intensity} color="#8271ff" distance={14} decay={2} />

      <Environment resolution={192} frames={1}>
        <color attach="background" args={["#05060a"]} />
        <Lightformer
          form="rect"
          intensity={7 * intensity}
          color="#ffffff"
          scale={[10, 4, 1]}
          position={[0, 5, 2]}
          rotation={[-0.4, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.6 * intensity}
          color="#dfe2ff"
          scale={[5, 9, 1]}
          position={[-7, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={3.4 * intensity}
          color="#8271ff"
          scale={[4, 9, 1]}
          position={[6, 1, -3]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          form="circle"
          intensity={1.6 * intensity}
          color="#5b6480"
          scale={5}
          position={[0, -5, 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.2 * intensity}
          color="#ffffff"
          scale={[6, 2, 1]}
          position={[2, 0, 6]}
          rotation={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}

/** Cheap, soft grounding shadow that does not require shadow maps. */
export function SoftShadow({ y = -2.55, scale = 7, opacity = 0.7 }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(128, 128, 6, 128, 128, 124);
    gradient.addColorStop(0, "rgba(0,0,0,0.62)");
    gradient.addColorStop(0.45, "rgba(0,0,0,0.28)");
    gradient.addColorStop(0.78, "rgba(0,0,0,0.07)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  if (!texture) return null;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[scale, scale * 0.72]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

/**
 * Frames a ~5 unit tall object for any aspect ratio. Keeps the product
 * fully visible on narrow screens instead of cropping it.
 */
export function FitCamera({
  radius = 2.9,
  offsetY = 0,
  positionX = 0,
}: {
  radius?: number;
  offsetY?: number;
  positionX?: number;
}) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const aspect = Math.max(size.width / size.height, 0.35);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const distV = radius / Math.sin(vFov / 2);
    const distH = radius / Math.sin(hFov / 2);
    const distance = Math.max(distV, distH);
    cam.position.set(positionX, offsetY * 0.5, distance);
    cam.lookAt(new THREE.Vector3(positionX * 0.3, offsetY, 0));
    cam.updateProjectionMatrix();
  }, [camera, size.width, size.height, radius, offsetY, positionX]);

  return null;
}

export function SceneGroup({
  children,
  position = [0, 0, 0],
}: {
  children: ReactNode;
  position?: [number, number, number];
}) {
  return <group position={position}>{children}</group>;
}
