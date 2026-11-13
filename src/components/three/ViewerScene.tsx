"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import type { Finish, ViewerAngle } from "@/types";
import { cn } from "@/lib/utils";
import { CanvasShell } from "./CanvasShell";
import { SoftShadow, StudioEnvironment } from "./Studio";
import { Headphones } from "./Headphones";

export interface ViewerApi {
  zoomBy: (factor: number) => void;
}

interface OrbitApi {
  object: THREE.Camera;
  target: THREE.Vector3;
  update: () => void;
}

const HOTSPOTS = [
  { id: "band", label: "Suspended headband", position: [0, 2.95, 0.1] as const },
  { id: "driver", label: "40 mm driver", position: [1.6, 0.35, 0.4] as const },
  { id: "cushion", label: "Cushion assembly", position: [0.85, -1.45, 0.3] as const },
  { id: "controls", label: "Control rail", position: [2.05, -1.05, 0.35] as const },
];

function ViewerContent({
  finish,
  angle,
  resetKey,
  showLabels,
  onApi,
}: {
  finish: Finish;
  angle: ViewerAngle;
  resetKey: number;
  showLabels: boolean;
  onApi: (api: ViewerApi) => void;
}) {
  const controls = useRef<OrbitApi | null>(null);
  const camera = useThree((s) => s.camera);
  const targetPos = useRef(new THREE.Vector3(...angle.position));
  const targetLook = useRef(new THREE.Vector3(...angle.target));
  const animating = useRef(true);
  const apiReady = useRef(false);

  useEffect(() => {
    targetPos.current.set(...angle.position);
    targetLook.current.set(...angle.target);
    animating.current = true;
  }, [angle, resetKey]);

  const buildApi = useCallback(
    (instance: OrbitApi) => {
      controls.current = instance;
      if (apiReady.current) return;
      apiReady.current = true;
      onApi({
        zoomBy: (factor: number) => {
          const c = controls.current;
          if (!c) return;
          const dir = c.object.position.clone().sub(c.target);
          const dist = THREE.MathUtils.clamp(dir.length() * factor, 5.4, 13.5);
          c.object.position.copy(c.target.clone().add(dir.normalize().multiplyScalar(dist)));
          c.update();
        },
      });
    },
    [onApi],
  );

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c || !animating.current) return;
    const d = Math.min(delta, 0.05);
    const k = 1 - Math.pow(0.0009, d);
    camera.position.lerp(targetPos.current, k);
    c.target.lerp(targetLook.current, k);
    c.update();
    if (camera.position.distanceTo(targetPos.current) < 0.03) {
      animating.current = false;
    }
  });

  return (
    <>
      <StudioEnvironment intensity={1.1} />
      <SoftShadow y={-2.65} scale={7.6} opacity={0.65} />
      <group position={[0, 0.05, 0]}>
        <Headphones finish={finish} baseRotation={[0.05, -0.45, 0]} />
      </group>

      {showLabels &&
        HOTSPOTS.map((spot) => (
          <Html
            key={spot.id}
            position={[spot.position[0], spot.position[1], spot.position[2]]}
            center
            zIndexRange={[20, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div className="-translate-y-1/2 translate-x-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="block h-px w-5 bg-ivory/50" />
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ivory/90">
                  {spot.label}
                </span>
              </div>
            </div>
            <span className="absolute -left-[3px] -top-[3px] block h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_10px_#8271ff]" />
          </Html>
        ))}

      <OrbitControls
        ref={(instance) => {
          if (instance) buildApi(instance as unknown as OrbitApi);
        }}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        rotateSpeed={0.65}
        zoomSpeed={0.7}
        minDistance={5.4}
        maxDistance={13.5}
        minPolarAngle={0.85}
        maxPolarAngle={2.15}
        onStart={() => {
          animating.current = false;
        }}
      />
    </>
  );
}

export default function ViewerScene({
  finish,
  angle,
  resetKey,
  showLabels,
  onApi,
  className,
}: {
  finish: Finish;
  angle: ViewerAngle;
  resetKey: number;
  showLabels: boolean;
  onApi: (api: ViewerApi) => void;
  className?: string;
}) {
  return (
    <CanvasShell
      finish={finish}
      className={cn("h-full w-full", className)}
      grab
      camera={{ position: angle.position, fov: 30 }}
      dpr={[1, 1.75]}
      label="VYRA ONE 360 degree product viewer. Drag to rotate, scroll to zoom."
      posterClassName="scale-95"
    >
      <ViewerContent
        finish={finish}
        angle={angle}
        resetKey={resetKey}
        showLabels={showLabels}
        onApi={onApi}
      />
    </CanvasShell>
  );
}
