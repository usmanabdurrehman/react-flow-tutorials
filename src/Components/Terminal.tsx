import React from "react";
import { Handle, HandleProps } from "reactflow";

export default function Terminal(props: HandleProps) {
  return (
    <Handle
      style={{
        width: 8,
        height: 8,
        background: "white",
        border: "2px solid black",
      }}
      {...props}
    />
  );
}
