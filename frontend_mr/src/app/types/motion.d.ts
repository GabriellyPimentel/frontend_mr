// src/types/motion.d.ts
import { HTMLMotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export interface HTMLMotionProps<T = any> extends HTMLAttributes<T> {
    className?: string;
    style?: React.CSSProperties;
  }
}