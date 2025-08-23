import React from "react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { Box } from "@chakra-ui/react";
import { UtilityNode as UtilityNodeType } from "../types";

const UtilityNode = React.memo(function UtilityNode({
  id,
}: NodeProps<UtilityNodeType>) {
  const { updateNodeData } = useReactFlow();

  return (
    <Box
      p={2}
      border="1px solid black"
      width="200px"
      height="200px"
      overflow={"auto"}
      className="nowheel"
    >
      {/* <Textarea
        className="nodrag nopan"
        value={text}
        onChange={(e) => updateNodeData(id, { text: e.target.value })}
        placeholder="Enter Text"
        mt={4}
      /> */}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illum libero
      aperiam iste, fuga dolores perferendis natus sapiente at impedit aliquid
      quibusdam adipisci optio illo eum tenetur recusandae omnis alias.
    </Box>
  );
});

export default UtilityNode;
