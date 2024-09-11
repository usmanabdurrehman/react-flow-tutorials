import React from "react";

export default function Battery({
  color = "black",
  height,
}: {
  color?: string;
  height?: number;
}) {
  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 59.5 87.5"
    >
      <defs>
        <style>
          {`.cls-1, .cls-2, .cls-3 { fill: none; stroke: ${color} }`}
          {`.cls-1 { stroke-width: 2px; }`}
          {`.cls-2, .cls-3 { stroke-width: 3.5px; }`}
          {`.cls-2 { stroke-linecap: square; stroke-linejoin: round; }`}
          {`.cls-3 { stroke-linecap: round; }`}
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="svg8">
          <path id="path1838" className="cls-1" d="M29.75,31.5V21" />
          <circle
            id="circle1800"
            className="cls-2"
            cx="29.75"
            cy="43.75"
            r="28"
          />
          <path id="path1820" className="cls-3" d="M29.75,71.75v14" />
          <path id="path1822" className="cls-3" d="M29.75,15.75v-14" />
          <path id="path1836" className="cls-1" d="M35,26.25H24.5" />
          <path id="path1852" className="cls-1" d="M35,61.25H24.5" />
        </g>
      </g>
    </svg>
  );
}
