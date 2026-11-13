"use client";

import dynamic from "next/dynamic";
import { useFinish } from "@/components/product/FinishProvider";
import { HeadphonesPoster } from "./HeadphonesPoster";

function SceneLoading() {
  const { finish } = useFinish();
  return (
    <div className="h-full w-full">
      <HeadphonesPoster finish={finish} />
    </div>
  );
}

export const Hero3D = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

export const Still3D = dynamic(() => import("./StillScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

export const Story3D = dynamic(() => import("./StoryScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

export const Exploded3D = dynamic(() => import("./ExplodedScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

export const Viewer3D = dynamic(() => import("./ViewerScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});
