"use client";

import { useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

/**
 * Motion 12 + Next 16 + React 19: a MotionValue for `opacity` passed through
 * `style` doesn't update on scroll (transforms like `y` do). This writes the
 * value straight to the DOM instead. Set an initial `style={{ opacity }}`.
 */
export function useOpacityRef<T extends HTMLElement = HTMLDivElement>(
  value: MotionValue<number>
) {
  const ref = useRef<T>(null);
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.style.opacity = String(v);
  });
  return ref;
}
