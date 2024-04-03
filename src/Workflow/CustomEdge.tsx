import { IconButton } from "@chakra-ui/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  useReactFlow,
} from "reactflow";
import { X } from "react-bootstrap-icons";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <IconButton
          aria-label="Delete Button"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onClick={() => {
            console.log("yo");
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
          icon={<X />}
          color="red"
          bg="transparent"
          size="small"
        />
      </EdgeLabelRenderer>
    </>
  );
}
