"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { Finish } from "@/types";
import {
  createBandGeometry,
  createCapGeometry,
  createCupShellGeometry,
  createInnerPlateGeometry,
  createYokeCurve,
} from "./geometry";

export type PartId = "frame" | "acoustics" | "cushion" | "band" | "controls";

export interface RotationState {
  x: number;
  y: number;
}

interface HeadphonesProps {
  finish: Finish;
  /** 0 = assembled, 1 = fully exploded */
  explode?: number;
  highlight?: PartId | null;
  rotationRef?: RefObject<RotationState>;
  baseRotation?: [number, number, number];
  scale?: number;
  interactive?: boolean;
  onPartClick?: (part: PartId) => void;
}

const BAND_POINTS: Array<[number, number, number]> = [
  [-1.56, 0.26, 0],
  [-1.63, 0.82, 0],
  [-1.58, 1.42, 0],
  [-1.42, 1.98, 0],
  [-1.1, 2.48, 0],
  [-0.62, 2.9, 0],
  [-0.22, 3.09, 0],
  [0, 3.14, 0],
  [0.22, 3.09, 0],
  [0.62, 2.9, 0],
  [1.1, 2.48, 0],
  [1.42, 1.98, 0],
  [1.58, 1.42, 0],
  [1.63, 0.82, 0],
  [1.56, 0.26, 0],
];

export function Headphones({
  finish,
  explode = 0,
  highlight = null,
  rotationRef,
  baseRotation = [0.1, -0.45, 0],
  scale = 1,
  interactive = false,
  onPartClick,
}: HeadphonesProps) {
  const root = useRef<THREE.Group>(null);
  const bandGroup = useRef<THREE.Group>(null);
  const leftCup = useRef<THREE.Group>(null);
  const rightCup = useRef<THREE.Group>(null);
  const leftCushion = useRef<THREE.Group>(null);
  const rightCushion = useRef<THREE.Group>(null);
  const yokeGroup = useRef<THREE.Group>(null);

  const geo = useMemo(() => {
    const band = createBandGeometry(BAND_POINTS, 0.66, 0.105, 140, 18);
    const innerPoints = BAND_POINTS.map(([x, y, z]) => {
      const cx = 0;
      const cy = 1.7;
      return [
        cx + (x - cx) * 0.94,
        cy + (y - cy) * 0.94 - 0.055,
        z,
      ] as [number, number, number];
    });
    const innerBand = createBandGeometry(innerPoints, 0.46, 0.075, 120, 14);
    return {
      band: band.geometry,
      innerBand: innerBand.geometry,
      shell: createCupShellGeometry(),
      cap: createCapGeometry(),
      innerPlate: createInnerPlateGeometry(),
      cushion: new THREE.TorusGeometry(0.72, 0.275, 24, 72),
      grille: new THREE.CircleGeometry(0.6, 72),
      yokeLeft: new THREE.TubeGeometry(createYokeCurve(-1), 48, 0.052, 14, false),
      yokeRight: new THREE.TubeGeometry(createYokeCurve(1), 48, 0.052, 14, false),
      logoBar: new THREE.BoxGeometry(0.018, 0.24, 0.05),
      ring: new THREE.TorusGeometry(0.6, 0.009, 8, 96),
      button: new THREE.CapsuleGeometry(0.045, 0.26, 4, 12),
      port: new THREE.BoxGeometry(0.055, 0.1, 0.2),
    };
  }, []);

  const mats = useMemo(() => {
    const shell = new THREE.MeshPhysicalMaterial({
      color: finish.shell,
      metalness: finish.metalness,
      roughness: finish.roughness,
      clearcoat: 0.7,
      clearcoatRoughness: 0.26,
      envMapIntensity: 1.25,
    });
    const accent = new THREE.MeshPhysicalMaterial({
      color: finish.metal,
      metalness: 1,
      roughness: 0.24,
      envMapIntensity: 1.4,
    });
    const cap = new THREE.MeshPhysicalMaterial({
      color: finish.shellAccent,
      metalness: 0.7,
      roughness: 0.38,
      clearcoat: 0.4,
      clearcoatRoughness: 0.4,
      envMapIntensity: 1.15,
    });
    const cushion = new THREE.MeshPhysicalMaterial({
      color: finish.cushion,
      metalness: 0,
      roughness: 0.95,
      sheen: 0.7,
      sheenRoughness: 0.85,
      sheenColor: new THREE.Color(finish.metal),
      envMapIntensity: 0.5,
    });
    const fabric = new THREE.MeshStandardMaterial({
      color: "#0e1015",
      roughness: 1,
      metalness: 0,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: "#07080b",
      roughness: 0.72,
      metalness: 0.2,
    });
    const grille = new THREE.MeshStandardMaterial({
      color: "#14161c",
      roughness: 0.55,
      metalness: 0.55,
    });
    const led = new THREE.MeshStandardMaterial({
      color: "#0a0b10",
      emissive: new THREE.Color("#8271ff"),
      emissiveIntensity: 2.2,
      roughness: 0.3,
    });
    return { shell, accent, cap, cushion, fabric, dark, grille, led };
  }, [finish]);

  const targets = useMemo(
    () => ({
      shell: new THREE.Color(finish.shell),
      accent: new THREE.Color(finish.metal),
      cap: new THREE.Color(finish.shellAccent),
      cushion: new THREE.Color(finish.cushion),
    }),
    [finish],
  );

  const emit = useRef<Record<string, number>>({});

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const k = 1 - Math.pow(0.001, d);

    // colour transitions between finishes
    mats.shell.color.lerp(targets.shell, k);
    mats.accent.color.lerp(targets.accent, k);
    mats.cap.color.lerp(targets.cap, k);
    mats.cushion.color.lerp(targets.cushion, k);
    mats.shell.metalness += (finish.metalness - mats.shell.metalness) * k;
    mats.shell.roughness += (finish.roughness - mats.shell.roughness) * k;
    mats.shell.envMapIntensity = 1.25;

    // explode transitions
    const e = explode;
    if (bandGroup.current) {
      bandGroup.current.position.y += (e * 0.85 - bandGroup.current.position.y) * k;
    }
    if (leftCup.current) {
      leftCup.current.position.x += (-1.52 - e * 1.05 - leftCup.current.position.x) * k;
    }
    if (rightCup.current) {
      rightCup.current.position.x += (1.52 + e * 1.05 - rightCup.current.position.x) * k;
    }
    if (leftCushion.current) {
      leftCushion.current.position.x += (-0.3 + e * 0.5 - leftCushion.current.position.x) * k;
    }
    if (rightCushion.current) {
      rightCushion.current.position.x += (0.3 - e * 0.5 - rightCushion.current.position.x) * k;
    }
    if (yokeGroup.current) {
      yokeGroup.current.scale.setScalar(1);
    }

    // rotation (drag / scroll driven)
    if (rotationRef?.current && root.current) {
      const r = rotationRef.current;
      root.current.rotation.x += (r.x - root.current.rotation.x) * k;
      root.current.rotation.y += (r.y - root.current.rotation.y) * k;
    }

    // highlight emission
    const emitTargets: Record<string, number> = {
      frame: highlight === "frame" ? 0.22 : 0,
      acoustics: highlight === "acoustics" ? 0.3 : 0,
      cushion: highlight === "cushion" ? 0.22 : 0,
      band: highlight === "band" ? 0.22 : 0,
      controls: highlight === "controls" ? 0.45 : 0,
    };
    const apply = (mat: THREE.MeshStandardMaterial, key: string) => {
      const prev = emit.current[key] ?? 0;
      const next = prev + (emitTargets[key] - prev) * k;
      emit.current[key] = next;
      if (next > 0.002) {
        mat.emissive.setHex(0x8271ff);
        mat.emissiveIntensity = next;
      } else {
        mat.emissiveIntensity = 0;
      }
    };
    apply(mats.shell, "frame");
    apply(mats.accent, "frame");
    apply(mats.cap, "acoustics");
    apply(mats.grille, "acoustics");
    apply(mats.cushion, "cushion");
    apply(mats.fabric, "band");
  });

  const part = (id: PartId) =>
    interactive && onPartClick
      ? {
          onPointerDown: (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            onPartClick(id);
          },
          onPointerOver: (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          },
          onPointerOut: () => {
            document.body.style.cursor = "";
          },
        }
      : {};

  return (
    <group ref={root} scale={scale} rotation={baseRotation} position={[0, -0.15, 0]}>
      {/* ---------------- headband ---------------- */}
      <group ref={bandGroup} {...part("band")}>
        <mesh geometry={geo.band} material={mats.shell} castShadow receiveShadow />
        <mesh geometry={geo.innerBand} material={mats.fabric} castShadow />
        {/* end caps */}
        <mesh position={[-1.56, 0.26, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.accent}>
          <cylinderGeometry args={[0.105, 0.105, 0.7, 20]} />
        </mesh>
        <mesh position={[1.56, 0.26, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.accent}>
          <cylinderGeometry args={[0.105, 0.105, 0.7, 20]} />
        </mesh>
      </group>

      {/* ---------------- yokes ---------------- */}
      <group ref={yokeGroup} {...part("frame")}>
        <mesh geometry={geo.yokeLeft} material={mats.accent} castShadow />
        <mesh geometry={geo.yokeRight} material={mats.accent} castShadow />
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 1.93, -0.62, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} material={mats.accent}>
              <cylinderGeometry args={[0.095, 0.095, 0.24, 24]} />
            </mesh>
            <mesh position={[side * 0.05, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.dark}>
              <cylinderGeometry args={[0.055, 0.055, 0.3, 18]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ---------------- earcups ---------------- */}
      {([1, -1] as const).map((side) => (
        <group
          key={side}
          ref={side === 1 ? rightCup : leftCup}
          position={[side * 1.52, -0.75, 0]}
        >
          <group rotation={[0, 0, side === 1 ? -Math.PI / 2 : Math.PI / 2]}>
            <mesh
              geometry={geo.shell}
              material={mats.shell}
              castShadow
              receiveShadow
              {...part("frame")}
            />
            <mesh geometry={geo.cap} material={mats.cap} position={[0, 0.4, 0]} {...part("acoustics")} />
            <mesh geometry={geo.ring} material={mats.accent} position={[0, 0.445, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <mesh geometry={geo.ring} material={mats.accent} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.14} />
            {/* V mark */}
            <group position={[0, 0.465, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh geometry={geo.logoBar} material={mats.accent} position={[0, -0.02, -0.06]} rotation={[0.32, 0, 0]} />
              <mesh geometry={geo.logoBar} material={mats.accent} position={[0, -0.02, 0.06]} rotation={[-0.32, 0, 0]} />
            </group>
            {/* control rail on right cup */}
            {side === 1 && (
              <group position={[0.72, -0.42, -0.16]} rotation={[0, 0, -0.5]} {...part("controls")}>
                <mesh geometry={geo.button} material={mats.accent} />
                <mesh position={[0.06, 0.02, 0]} rotation={[0, 0, 0.2]} material={mats.dark}>
                  <boxGeometry args={[0.05, 0.16, 0.1]} />
                </mesh>
              </group>
            )}
            {side === -1 && (
              <mesh position={[0.35, -0.8, 0.12]} material={mats.dark} {...part("controls")}>
                <boxGeometry args={[0.05, 0.1, 0.2]} />
              </mesh>
            )}
            <mesh position={[0.05, 0.62, 0.42]} material={mats.led}>
              <sphereGeometry args={[0.016, 12, 12]} />
            </mesh>
          </group>

          {/* ear cushion */}
          <group
            ref={side === 1 ? rightCushion : leftCushion}
            position={[side * -0.3, 0, 0]}
            {...part("cushion")}
          >
            <mesh
              geometry={geo.cushion}
              material={mats.cushion}
              rotation={[0, Math.PI / 2, 0]}
              scale={[0.97, 1.09, 1]}
              castShadow
            />
          </group>

          {/* inner acoustic plate */}
          <mesh
            geometry={geo.innerPlate}
            material={mats.dark}
            position={[side * -0.34, 0, 0]}
            rotation={[0, side === 1 ? -Math.PI / 2 : Math.PI / 2, 0]}
            {...part("acoustics")}
          />
          <mesh
            geometry={geo.grille}
            material={mats.grille}
            position={[side * -0.42, 0, 0]}
            rotation={[0, side === 1 ? -Math.PI / 2 : Math.PI / 2, 0]}
          />
          <mesh
            position={[side * -0.41, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            material={mats.accent}
          >
            <torusGeometry args={[0.56, 0.012, 8, 80]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
