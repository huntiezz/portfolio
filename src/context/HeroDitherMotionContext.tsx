import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HeroDitherMotionValue = {
  motionPaused: boolean;
  toggleMotionPaused: () => void;
};

const HeroDitherMotionContext = createContext<HeroDitherMotionValue | null>(null);

export function HeroDitherMotionProvider({ children }: { children: ReactNode }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const toggleMotionPaused = useCallback(() => {
    setMotionPaused((p) => !p);
  }, []);

  const value = useMemo(
    () => ({ motionPaused, toggleMotionPaused }),
    [motionPaused, toggleMotionPaused],
  );

  return (
    <HeroDitherMotionContext.Provider value={value}>{children}</HeroDitherMotionContext.Provider>
  );
}

export function useHeroDitherMotion(): HeroDitherMotionValue | null {
  return useContext(HeroDitherMotionContext);
}
