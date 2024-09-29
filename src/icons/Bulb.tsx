import React from "react";

export default function Bulb({
  color = "black",
  isOn = false,
  height = 34,
}: {
  color?: string;
  isOn?: boolean;
  height?: number;
}) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.001 512.001"
      xmlSpace="preserve"
      height={height}
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <polygon
          style={{ fill: "#AFB6BB" }}
          points="325.824,392.305 325.824,427.216 300.887,427.216 211.116,427.216 186.18,427.216 186.18,392.305 "
        />{" "}
        <g>
          {" "}
          <rect
            x="211.114"
            y="427.218"
            style={{ fill: "#546A79" }}
            width="89.767"
            height="44.886"
          />{" "}
          <rect
            x="186.184"
            y="352.407"
            style={{ fill: "#546A79" }}
            width="139.648"
            height="39.896"
          />{" "}
        </g>{" "}
        {isOn && (
          <circle
            fill="#f9b81c"
            stroke={`yellow`}
            strokeWidth={2}
            className="circle"
            cx="256"
            cy="185"
          >
            <animate
              attributeName="r"
              values="185;250"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        <path
          style={{ fill: isOn ? "#F9B81C" : "#ffffff" }}
          d="M325.824,352.407H186.18c-64.436-27.23-109.721-90.17-109.721-164.58 c0-99.148,80.395-179.542,179.542-179.542s179.542,80.395,179.542,179.542C435.544,262.237,390.259,325.176,325.824,352.407z"
        />{" "}
        <path
          style={{ fill: isOn ? "#FFD311" : "#ffffff" }}
          d="M176.204,187.827c0-81.823,54.809-150.74,129.67-172.373c-15.85-4.582-32.549-7.17-49.873-7.17 c-99.148,0-179.542,80.395-179.542,179.542c0,74.41,45.284,137.35,109.721,164.58h99.745 C221.489,325.176,176.204,262.236,176.204,187.827z"
        />{" "}
        <path
          fill={color}
          d="M256.002,0c-26.13,0-51.423,5.268-75.177,15.655l6.638,15.181c21.648-9.467,44.708-14.267,68.538-14.267 c94.432,0,171.258,76.826,171.258,171.258c0,9.59-0.8,19.192-2.375,28.54l16.337,2.754c1.729-10.256,2.606-20.784,2.606-31.294 C443.828,84.258,359.569,0,256.002,0z"
        />{" "}
        <path
          fill={color}
          d="M324.085,344.123H187.933c-62.734-27.196-103.19-88.355-103.19-156.296c0-30.595,8.166-60.62,23.614-86.826 c15.004-25.453,36.451-46.727,62.022-61.52l-8.297-14.341c-28.035,16.22-51.547,39.544-67.997,67.448 c-16.95,28.754-25.911,61.688-25.911,95.241c0,73.312,42.884,139.441,109.721,169.986v77.687h24.936v44.886h44.886v31.614h16.568 v-31.614h44.886v-44.886h24.936v-77.69c24.313-11.133,46.285-27.485,63.813-47.531c18.96-21.685,32.776-47.785,39.956-75.479 l-16.039-4.158C408.812,280.893,372.325,323.193,324.085,344.123z M292.603,463.817H219.4V435.5h73.203V463.817z M317.539,418.932 H194.463V400.59h123.076v18.342H317.539z M194.463,384.021v-23.33h123.076v23.33H194.463z"
        />{" "}
        <path
          style={{ fill: "#FFFFFF" }}
          d="M113.061,187.827h16.568c0-69.683,56.691-126.373,126.373-126.373V44.886 C177.183,44.886,113.061,109.008,113.061,187.827z"
        />{" "}
        <rect x="345.77" y="239.389" width="24.936" height="16.568" />{" "}
        <rect x="370.71" y="219.441" width="24.936" height="16.568" />{" "}
        <rect x="270.958" y="44.886" width="24.936" height="16.568" />{" "}
        <polygon
          style={{ fill: "#FFFFFF" }}
          points="226.949,117.133 215.233,128.849 247.718,161.334 247.718,327.47 264.286,327.47 264.286,161.334 296.77,128.849 285.055,117.133 256.002,146.186 "
        />{" "}
      </g>
    </svg>
  );
}
