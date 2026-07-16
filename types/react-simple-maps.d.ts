declare module "react-simple-maps" {
  import type { ComponentType, ReactNode } from "react";

  export const ComposableMap: ComponentType<Record<string, unknown> & { children?: ReactNode }>;
  export const ZoomableGroup: ComponentType<Record<string, unknown> & { children?: ReactNode }>;
  export const Geographies: ComponentType<Record<string, unknown> & { children: (props: { geographies: Array<Record<string, unknown> & { rsmKey: string; id?: string | number }> }) => ReactNode }>;
  export const Geography: ComponentType<Record<string, unknown>>;
}
