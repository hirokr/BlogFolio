import { LucideIcon } from 'lucide-react';

/**
 * Type for Lucide React icon components
 * Can be used to type icon props and icon references
 */
export type IconType = LucideIcon;

/**
 * Props for icon components from lucide-react
 */
export interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  className?: string;
}
