import { Box } from "@chakra-ui/react";
import { Node, NodeProps, NodeResizer, useStore } from "@xyflow/react";
import { useDarkMode } from "../store";
import Placeholder from "./Placeholder";
import { zoomSelector } from "../utils";

type BoardNode = Node<{ isOver: boolean }, "string">;

export default function Board({
  selected,
  data: { isOver },
}: NodeProps<BoardNode>) {
  const showContent = useStore(zoomSelector);

  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  console.log({ isOver });

  return (
    <Box
      height="100%"
      width="100%"
      borderRadius="8px"
      border={`2px solid ${color}`}
      {...(isOver && { bg: `#eaeaff` })}
      {...(selected && { boxShadow: `${color} 0px 0px 4px` })}
    >
      {!showContent && <Placeholder />}
      {selected && <NodeResizer minWidth={200} minHeight={200} />}
    </Box>
  );
}
