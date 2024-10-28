import React from "react";
import { Handle, HandleProps } from "@xyflow/react";

export default function CustomHandle(props: HandleProps) {
  return <Handle className="handle" {...props} />;
}
