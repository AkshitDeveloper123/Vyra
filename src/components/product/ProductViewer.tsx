"use client";

import { useCallback, useRef, useState } from "react";
import {
  Compass,
  Maximize,
  Minus,
  Plus,
  RotateCcw,
  Tag,
} from "lucide-react";
import { Viewer3D } from "@/components/three/lazy";
import type { ViewerApi } from "@/components/three/ViewerScene";
import { useFinish } from "@/components/product/FinishProvider";
import { VIEWER_ANGLES } from "@/data/product";
import { cn } from "@/lib/utils";

export function ProductViewer() {
  const { finish } = useFinish();
  const [angleIndex, setAngleIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [showLabels, setShowLabels] = useState(false);
  const apiRef = useRef<ViewerApi | null>(null);

  const handleApi = useCallback((api: ViewerApi) => {
    apiRef.current = api;
  }, []);

  const reset = () => {
    setAngleIndex(0);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div id="viewer" className="scroll-mt-28">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(85%_70%_at_50%_42%,#141722,#090a0e_72%)]">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
            <span className="label text-silver-dim">Fig. 06 — 360° study</span>
          </div>
          <span className="label hidden text-silver-dim sm:block">WebGL / interactive</span>
        </div>

        <div className="h-[380px] w-full sm:h-[500px] lg:h-[620px]">
          <Viewer3D
            finish={finish}
            angle={VIEWER_ANGLES[angleIndex]}
            resetKey={resetKey}
            showLabels={showLabels}
            onApi={handleApi}
            className="h-full w-full"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-black/45 to-transparent p-4 pt-16 sm:p-5">
          <p className="label text-silver-dim">Drag to rotate · scroll to zoom</p>
          <p className="label text-silver-dim">{finish.name}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-graphite/20 p-2">
        <div
          role="group"
          aria-label="Viewer angle"
          className="no-scrollbar flex items-center gap-1 overflow-x-auto"
        >
          {VIEWER_ANGLES.map((angle, index) => {
            const active = index === angleIndex;
            return (
              <button
                key={angle.id}
                type="button"
                onClick={() => setAngleIndex(index)}
                aria-pressed={active}
                className={cn(
                  "label shrink-0 rounded-full px-3 py-2 transition-all duration-300",
                  active
                    ? "bg-ivory text-ink"
                    : "text-silver hover:bg-ivory/[0.06] hover:text-ivory",
                )}
              >
                {angle.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 border-line pl-2 sm:border-l">
          <button
            type="button"
            onClick={() => apiRef.current?.zoomBy(1.16)}
            aria-label="Zoom out"
            className="grid h-8 w-8 place-items-center rounded-full text-silver transition-colors hover:bg-ivory/[0.06] hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => apiRef.current?.zoomBy(0.86)}
            aria-label="Zoom in"
            className="grid h-8 w-8 place-items-center rounded-full text-silver transition-colors hover:bg-ivory/[0.06] hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            <Plus size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setShowLabels((prev) => !prev)}
            aria-pressed={showLabels}
            aria-label={showLabels ? "Hide component labels" : "Show component labels"}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet",
              showLabels
                ? "bg-violet/15 text-violet-soft"
                : "text-silver hover:bg-ivory/[0.06] hover:text-ivory",
            )}
          >
            <Tag size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset viewer"
            className="grid h-8 w-8 place-items-center rounded-full text-silver transition-colors hover:bg-ivory/[0.06] hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] text-silver-dim">
          <Compass size={12} aria-hidden="true" />
          Head-tracked preview unavailable in this demo — the model is a concept study.
        </p>
        <p className="flex items-center gap-2 text-[11px] text-silver-dim">
          <Maximize size={11} aria-hidden="true" />
          Pinch or scroll to zoom
        </p>
      </div>
    </div>
  );
}
