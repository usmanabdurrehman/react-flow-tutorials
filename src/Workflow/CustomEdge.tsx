import { IconButton } from "@chakra-ui/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  Position,
  getSmoothStepPath,
  getStraightPath,
} from "@xyflow/react";
import { Trash } from "react-bootstrap-icons";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data: { isHovered } = {},
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  console.log({ edgePath });

  return (
    <>
      <g
        onClick={(e) => {
          console.log("edge got clicked");
        }}
      >
        <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      </g>
      {isHovered && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan"
            style={{
              position: "absolute",
              transformOrigin: "center",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
          >
            <IconButton
              aria-label="Delete Edge"
              colorScheme="red"
              size="xs"
              icon={<Trash />}
              onClick={() => {
                console.log("I have been clicked");
              }}
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
