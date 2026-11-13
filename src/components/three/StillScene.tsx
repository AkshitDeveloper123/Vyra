"use client";

import type { Finish } from "@/types";
import { cn } from "@/lib/utils";
import { CanvasShell } from "./CanvasShell";
import { FitCamera, SoftShadow, StudioEnvironment } from "./Studio";
import { Headphones } from "./Headphones";

export default function StillScene({
  finish,
  rotation = [0.06, -0.5, 0],
  radius = 2.95,
  modelPosition = [0, 0, 0],
  shadow = true,
  className,
  label = "VYRA ONE headphones studio render",
  intensity = 1,
}: {
  finish: Finish;
  rotation?: [number, number, number];
  radius?: number;
  modelPosition?: [number, number, number];
  shadow?: boolean;
  className?: string;
  label?: string;
  intensity?: number;
}) {
  return (
    <CanvasShell
      finish={finish}
      className={cn("h-full w-full", className)}
      camera={{ position: [0, 0.3, 11], fov: 30 }}
      dpr={[1, 1.6]}
      label={label}
      posterClassName="scale-95"
    >
      <FitCamera radius={radius} offsetY={0.1} />
      <StudioEnvironment intensity={intensity} />
      {shadow && <SoftShadow y={-2.6} scale={6.8} opacity={0.6} />}
      <group position={modelPosition}>
        <Headphones finish={finish} baseRotation={rotation} />
      </group>
    </CanvasShell>
  );
}
