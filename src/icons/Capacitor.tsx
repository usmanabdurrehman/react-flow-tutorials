import React, { CSSProperties } from "react";

export default function Capacitor({
  color = "black",
  height,
}: {
  color?: string;
  height?: number;
}) {
  const cls1 = {
    strokeLinecap: "round",
    fill: "none",
    stroke: color,
    strokeWidth: "3.5px",
  } satisfies CSSProperties;

  const cls2 = {
    strokeLinecap: "square",
    fill: "none",
    stroke: color,
    strokeWidth: "3.5px",
  } satisfies CSSProperties;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38.5 31.5"
      height={height}
    >
      <defs></defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="svg8">
          <g id="g1579">
            <path id="path2791" style={cls1} d="M36.75,15.75h-14" />
            <path id="path2793" style={cls1} d="M15.75,15.75h-14" />
            <path id="path2795" style={cls2} d="M22.75,29.75v-28" />
            <path id="path2797" style={cls2} d="M15.75,29.75v-28" />
          </g>
        </g>
      </g>
    </svg>
  );
}
