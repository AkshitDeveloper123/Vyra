"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Finish, FinishId } from "@/types";
import { FINISH_MAP, FINISHES } from "@/data/product";

interface FinishContextValue {
  finishId: FinishId;
  finish: Finish;
  finishes: Finish[];
  setFinish: (id: FinishId) => void;
}

const FinishContext = createContext<FinishContextValue | null>(null);
const STORAGE_KEY = "vyra:finish";

export function FinishProvider({ children }: { children: ReactNode }) {
  const [finishId, setFinishId] = useState<FinishId>("obsidian");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && stored in FINISH_MAP) setFinishId(stored as FinishId);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setFinish = useCallback((id: FinishId) => {
    setFinishId(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(
    () => ({
      finishId,
      finish: FINISH_MAP[finishId],
      finishes: FINISHES,
      setFinish,
    }),
    [finishId, setFinish],
  );

  return <FinishContext.Provider value={value}>{children}</FinishContext.Provider>;
}

export function useFinish() {
  const context = useContext(FinishContext);
  if (!context) throw new Error("useFinish must be used inside FinishProvider");
  return context;
}
