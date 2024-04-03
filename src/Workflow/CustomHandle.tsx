import React from "react";
import { Handle, HandleProps } from "reactflow";

export default function CustomHandle(props: HandleProps) {
  return (
    <Handle
      style={{
        height: 8,
        width: 8,
        background: "white",
        border: "2px solid black",
      }}
      {...props}
    />
  );
}
