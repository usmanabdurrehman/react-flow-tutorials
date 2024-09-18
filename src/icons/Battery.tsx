import React from "react";

export default function Battery({
  color = "black",
  height,
}: {
  color?: string;
  height?: number;
}) {
  const cls = { fill: "none", stroke: color };
  const cls1 = { ...cls, strokeWidth: 2 };
  const cls2 = {
    ...cls,
    strokeWidth: 3.5,
    strokeLinecap: "square",
    strokeLinejoin: "round",
  };
  const cls3 = { ...cls, strokeWidth: 3.5, strokeLinecap: "round" };

  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 59.5 87.5"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="svg8">
          <path id="path1838" style={cls1} d="M29.75,31.5V21" />
          <circle id="circle1800" style={cls2} cx="29.75" cy="43.75" r="28" />
          <path id="path1820" style={cls3} d="M29.75,71.75v14" />
          <path id="path1822" style={cls3} d="M29.75,15.75v-14" />
          <path id="path1836" style={cls1} d="M35,26.25H24.5" />
          <path id="path1852" style={cls1} d="M35,61.25H24.5" />
        </g>
      </g>
    </svg>
  );
}
