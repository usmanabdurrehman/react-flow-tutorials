import { css } from "@emotion/css";
import { Handle, HandleProps } from "@xyflow/react";
import React from "react";

export default function Terminal(props: HandleProps) {
  return (
    <Handle
      className={css({
        width: 8,
        height: 8,
        background: "white",
        border: "1px solid black",
      })}
      {...props}
    />
  );
}
