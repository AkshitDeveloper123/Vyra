"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { FinishProvider } from "@/components/product/FinishProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { UIProvider } from "@/components/ui/UIProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <FinishProvider>
          <CartProvider>{children}</CartProvider>
        </FinishProvider>
      </UIProvider>
    </MotionConfig>
  );
}
