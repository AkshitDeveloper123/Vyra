"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import type { Finish } from "@/types";
import { cn } from "@/lib/utils";
import { CanvasShell } from "./CanvasShell";
import { SoftShadow, StudioEnvironment } from "./Studio";
import { Headphones, type RotationState } from "./Headphones";

function ScrollRig({
  progress,
  rotation,
}: {
  progress: MotionValue<number>;
  rotation: RefObject<RotationState>;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const base = useRef(13);

  useEffect(() => {
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = Math.max(size.width / size.height, 0.5);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    base.current = Math.max(3.1 / Math.sin(vFov / 2), 3.1 / Math.sin(hFov / 2));
  }, [camera, size.width, size.height]);

  useFrame((_, delta) => {
    const p = Math.min(Math.max(progress.get(), 0), 1);
    const d = Math.min(delta, 0.05);
    const damp = 1 - Math.pow(0.0008, d);
    camera.position.z += (base.current * (1 - p * 0.38) - camera.position.z) * damp;
    camera.position.x += (p * 1.65 - camera.position.x) * damp;
    camera.position.y += (0.15 + p * 0.65 - camera.position.y) * damp;
    camera.lookAt(0, 0.05 + p * 0.2, 0);

    if (rotation.current) {
      rotation.current.y += (-0.5 + p * 1.5 - rotation.current.y) * damp;
      rotation.current.x += (0.04 + p * 0.14 - rotation.current.x) * damp;
    }
  });

  return null;
}

export default function StoryScene({
  finish,
  progress,
  className,
}: {
  finish: Finish;
  progress: MotionValue<number>;
  className?: string;
}) {
  const rotation = useRef<RotationState>({ x: 0.04, y: -0.5 });

  return (
    <CanvasShell
      finish={finish}
      className={cn("h-full w-full", className)}
      camera={{ position: [0, 0.2, 13], fov: 30 }}
      dpr={[1, 1.6]}
      label="VYRA ONE emerging from darkness in an interactive scroll sequence"
      posterClassName="scale-90 opacity-80"
    >
      <ScrollRig progress={progress} rotation={rotation} />
      <StudioEnvironment intensity={0.9} />
      <SoftShadow y={-2.6} scale={7} opacity={0.55} />
      <Headphones finish={finish} rotationRef={rotation} baseRotation={[0.04, -0.5, 0]} />
    </CanvasShell>
  );
}
