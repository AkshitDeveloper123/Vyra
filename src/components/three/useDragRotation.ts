"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { RotationState } from "./Headphones";

interface Options {
  idleSpeed?: number;
  parallax?: number;
  baseX?: number;
  disabled?: boolean;
}

/**
 * Pointer drag with inertia for the hero + exploded scenes. Touch action is
 * constrained to pan-y on the canvas so vertical page scrolling always works.
 */
export function useDragRotation(
  rotation: RefObject<RotationState>,
  { idleSpeed = 0.075, parallax = 0.06, baseX = 0.06, disabled = false }: Options = {},
) {
  const gl = useThree((s) => s.gl);
  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    vx: 0,
    vy: 0,
    idle: 10,
    pointerId: -1,
  });

  useEffect(() => {
    if (disabled) return;
    const el = gl.domElement;

    const onDown = (event: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.vx = 0;
      drag.current.vy = 0;
      drag.current.idle = 0;
      drag.current.pointerId = event.pointerId;
      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = event.clientX - drag.current.lastX;
      const dy = event.clientY - drag.current.lastY;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      const next = rotation.current ?? { x: baseX, y: -0.4 };
      next.y += dx * 0.007;
      next.x = Math.max(-0.5, Math.min(0.65, next.x + dy * 0.0045));
      drag.current.vx = dx * 0.0009;
      drag.current.vy = dy * 0.0004;
      drag.current.idle = 0;
      rotation.current = next;
    };

    const end = (event: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.active = false;
      drag.current.idle = 0;
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("pointerleave", end);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("pointerleave", end);
    };
  }, [gl, disabled, baseX, rotation]);

  useFrame((state, delta) => {
    if (disabled) return;
    const d = Math.min(delta, 0.05);
    const r = rotation.current ?? { x: baseX, y: -0.4 };
    const dState = drag.current;

    if (!dState.active) {
      dState.idle += d;
      r.y += dState.vx;
      r.x = Math.max(-0.5, Math.min(0.65, r.x + dState.vy));

      dState.vx *= 0.92;
      dState.vy *= 0.9;

      if (dState.idle > 1.2) {
        r.y += idleSpeed * d;
        const targetX = baseX + state.pointer.y * parallax;
        r.x += (targetX - r.x) * (1 - Math.pow(0.02, d));
      }
    }

    rotation.current = r;
  });
}
