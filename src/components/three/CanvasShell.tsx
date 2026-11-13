"use client";

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import type { Finish } from "@/types";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { HeadphonesPoster } from "./HeadphonesPoster";

class CanvasErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let ok = false;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ??
        canvas.getContext("webgl");
      ok = Boolean(gl);
      const lose = gl?.getExtension("WEBGL_lose_context");
      lose?.loseContext();
    } catch {
      ok = false;
    }
    setSupported(ok);
  }, []);

  return supported;
}

interface CanvasShellProps {
  children: ReactNode;
  finish: Finish;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  dpr?: [number, number];
  grab?: boolean;
  label?: string;
  onCreated?: () => void;
  posterClassName?: string;
  fallbackNote?: string;
}

export function CanvasShell({
  children,
  finish,
  className,
  camera = { position: [0, 0.4, 11], fov: 30 },
  dpr = [1, 1.75],
  grab = false,
  label = "Interactive 3D model of VYRA ONE headphones",
  onCreated,
  posterClassName,
  fallbackNote,
}: CanvasShellProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: "280px",
    threshold: 0.01,
  });
  const supported = useWebGLSupport();
  const [ready, setReady] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const handleCreated = () => {
    timer.current = window.setTimeout(() => {
      setReady(true);
      onCreated?.();
    }, 220);
  };

  return (
    <div
      ref={ref}
      className={cn("canvas-shell relative isolate overflow-hidden", className)}
      data-grab={grab ? "true" : "false"}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 grid place-items-center transition-all duration-700",
          ready ? "scale-[1.02] opacity-0" : "opacity-100",
          posterClassName,
        )}
      >
        <HeadphonesPoster finish={finish} label={label} />
      </div>

      {supported !== false && (
        <CanvasErrorBoundary onError={() => setReady(false)}>
          <Canvas
            camera={{ position: camera.position ?? [0, 0.4, 11], fov: camera.fov ?? 30 }}
            dpr={dpr}
            frameloop={inView ? "always" : "never"}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
            }}
            onCreated={({ gl }) => {
              gl.domElement.style.touchAction = "pan-y";
              gl.domElement.setAttribute("aria-hidden", "true");
              handleCreated();
            }}
            style={{
              position: "absolute",
              inset: 0,
              opacity: ready ? 1 : 0,
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
            aria-label={label}
            role="img"
          >
            <Suspense fallback={null}>{children}</Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      )}

      {!ready && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-line bg-ink/60 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
            </span>
            <span className="label text-silver-dim">
              {supported === false ? "Static view" : "Rendering VYRA ONE"}
            </span>
          </div>
        </div>
      )}

      {supported === false && fallbackNote && (
        <p className="absolute inset-x-0 bottom-16 mx-auto max-w-xs text-center text-[11px] leading-relaxed text-silver-dim">
          {fallbackNote}
        </p>
      )}
    </div>
  );
}
