"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Finish } from "@/types";
import { cn } from "@/lib/utils";
import { CanvasShell } from "./CanvasShell";
import { FitCamera, SoftShadow, StudioEnvironment } from "./Studio";
import { Headphones, type PartId, type RotationState } from "./Headphones";
import { useDragRotation } from "./useDragRotation";

function SceneContent({
  finish,
  highlight,
  onPartClick,
  exploded,
}: {
  finish: Finish;
  highlight: PartId | null;
  onPartClick: (part: PartId) => void;
  exploded: boolean;
}) {
  const reduced = useReducedMotion();
  const rotation = useRef<RotationState>({ x: 0.1, y: -0.35 });
  useDragRotation(rotation, {
    idleSpeed: reduced ? 0 : 0.05,
    parallax: reduced ? 0 : 0.05,
    baseX: 0.1,
  });

  return (
    <>
      <FitCamera radius={exploded ? 3.7 : 3.1} offsetY={0.05} />
      <StudioEnvironment intensity={1.05} />
      <SoftShadow y={-2.75} scale={8.6} opacity={0.5} />
      <group position={[0, 0.05, 0]}>
        <Headphones
          finish={finish}
          rotationRef={rotation}
          baseRotation={[0.1, -0.35, 0]}
          explode={exploded ? 1 : 0}
          highlight={highlight}
          interactive
          onPartClick={onPartClick}
        />
      </group>
    </>
  );
}

export default function ExplodedScene({
  finish,
  highlight,
  onPartClick,
  exploded = true,
  className,
}: {
  finish: Finish;
  highlight: PartId | null;
  onPartClick: (part: PartId) => void;
  exploded?: boolean;
  className?: string;
}) {
  return (
    <CanvasShell
      finish={finish}
      className={cn("h-full w-full", className)}
      grab
      camera={{ position: [0, 0.3, 13], fov: 30 }}
      dpr={[1, 1.6]}
      label="Exploded interactive view of VYRA ONE. Select a component to inspect it."
      posterClassName="scale-90"
    >
      <SceneContent
        finish={finish}
        highlight={highlight}
        onPartClick={onPartClick}
        exploded={exploded}
      />
    </CanvasShell>
  );
}
