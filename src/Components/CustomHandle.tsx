import { Handle, HandleProps } from "@xyflow/react";

export const Port = (props: HandleProps) => {
  return (
    <Handle
      {...props}
      style={{
        height: 8,
        width: 8,
        borderRadius: "8px",
        border: "1px solid black",
      }}
    />
  );
};
