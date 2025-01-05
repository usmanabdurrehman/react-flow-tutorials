import { IconButton } from "@chakra-ui/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
  type EdgeProps,
} from "@xyflow/react";
import { useCallback } from "react";
import { Trash } from "react-bootstrap-icons";

export default function CustomEdge({
  sourceX,
  sourceY,
  markerEnd,
  targetPosition,
  sourcePosition,
  targetX,
  targetY,
  data: { isHovered = false } = {},
  id,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const onDeleteEdge = useCallback(() => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
  });

  return (
    <>
      <g
        onClick={() => {
          console.log("ayo g");
        }}
      >
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          style={{ stroke: "#ff0073", strokeWidth: "2px" }}
        />
      </g>

      {isHovered && (
        <EdgeLabelRenderer>
          <div
            className="button-edge__label nodrag nopan"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              position: "absolute",
              pointerEvents: "all",
              transformOrigin: "center",
            }}
          >
            <IconButton
              aria-label="Delete Edge"
              icon={<Trash />}
              onClick={onDeleteEdge}
              size="xs"
              colorScheme="red"
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
