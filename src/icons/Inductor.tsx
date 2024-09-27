import React from "react";

const Inductor = ({
  color = "black",
  height = 32,
}: {
  color?: string;
  height?: number;
}) => {
  const cls = {
    strokeWidth: "1.5px",
    stroke: color,
  } satisfies React.CSSProperties;

  const cls1 = {
    ...cls,
    fill: "none",
    strokeLinecap: "round",
  } satisfies React.CSSProperties;

  const cls2 = {
    ...cls,
    strokeLinecap: "square",
    strokeLinejoin: "round",
    fill: "none",
  } satisfies React.CSSProperties;

  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66.5 17.5"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="svg8">
          <g id="g1092">
            <path id="path918" style={cls1} d="M1.75,8.75h14" />
            <path id="path920" style={cls1} d="M50.75,8.75h14" />
            <rect
              id="rect922"
              style={cls2}
              x="15.75"
              y="1.75"
              width="35"
              height="14"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Inductor;
