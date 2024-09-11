import React from "react";

const Inductor = ({
  color = "black",
  height,
}: {
  color?: string;
  height: number;
}) => {
  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66.5 17.5"
    >
      <defs>
        <style>
          {`.cls-1 { fill: none; stroke-linecap: round; }`}
          {`.cls-1, .cls-2 { stroke: #000; stroke-width: 3.5px; }`}
          {`.cls-2 { stroke-linecap: square; stroke-linejoin: round; }`}
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="svg8">
          <g id="g1092">
            <path id="path918" className="cls-1" d="M1.75,8.75h14" />
            <path id="path920" className="cls-1" d="M50.75,8.75h14" />
            <rect
              id="rect922"
              className="cls-2"
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
