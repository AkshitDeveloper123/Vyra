"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Finish } from "@/types";
import { CanvasShell } from "./CanvasShell";
import { FitCamera, SoftShadow, StudioEnvironment } from "./Studio";
import { Headphones, type RotationState } from "./Headphones";
import { useDragRotation } from "./useDragRotation";
import { cn } from "@/lib/utils";

function SceneContent({
  finish,
  offsetX,
  radius,
}: {
  finish: Finish;
  offsetX: number;
  radius: number;
}) {
  const reduced = useReducedMotion();
  const rotation = useRef<RotationState>({ x: 0.05, y: -0.55 });
  useDragRotation(rotation, {
    idleSpeed: reduced ? 0 : 0.07,
    parallax: reduced ? 0 : 0.07,
    baseX: 0.04,
  });
  return (
    <>
      <FitCamera radius={radius} offsetY={0.15} />
      <StudioEnvironment />
      <SoftShadow y={-2.62} scale={7.4} opacity={0.75} />
      <group position={[offsetX, 0.05, 0]}>
        <Headphones finish={finish} rotationRef={rotation} baseRotation={[0.05, -0.55, 0]} />
      </group>
    </>
  );
}

export default function HeroScene({
  finish,
  offsetX = 1.15,
  radius = 3.15,
  className,
}: {
  finish: Finish;
  offsetX?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <CanvasShell
      finish={finish}
      className={cn("h-full w-full", className)}
      grab
      camera={{ position: [0, 0.4, 11.5], fov: 30 }}
      dpr={[1, 1.8]}
      label="Interactive VYRA ONE headphones. Drag to rotate."
      fallbackNote="Your browser cannot display WebGL, so this is a static studio illustration. All product information remains available below."
    >
      <SceneContent finish={finish} offsetX={offsetX} radius={radius} />
    </CanvasShell>
  );
}
