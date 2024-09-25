import React from "react";
import { Handle, HandleProps, useHandleConnections } from "@xyflow/react";
import { css } from "@emotion/css";

export default function Terminal(props: HandleProps) {

  return (
    <div
      className={css({
        background: "white",
        ".react-flow__handle.connectingto": {
          background: "#ff6060",
        },
        ".react-flow__handle.valid": {
          background: "#55dd99",
        },
      })}
    >
      <Handle
        className={css({
          width: 8,
          height: 8,
          background: "white",
          border: "1px solid black",
        })}
        {...props}
      />
    </div>
  );
}
