import React from "react";

export default function Resistor({
  color = "black",
  height,
}: {
  color?: string;
  height?: number;
}) {
  const cls1 = {
    fill: "none",
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "bevel",
    strokeWidth: "1.5px",
  } satisfies React.CSSProperties;

  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66.5 15.57"
    >
      <defs></defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="svg8">
          <path
            id="path3970"
            style={cls1}
            d="M64.75,7.78H54.25l-3.5-7-7,14-7-14-7,14-7-14-7,14-3.5-7H1.75"
          />
        </g>
      </g>
    </svg>
  );
}
