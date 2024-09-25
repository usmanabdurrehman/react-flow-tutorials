import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import React, { useEffect, useRef } from "react";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { css } from "@emotion/css";

export default function Rotator({
  id,
  selected,
}: {
  id: string;
  selected: boolean | undefined;
}) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const { setNodes } = useReactFlow();

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);

      let degs = [0, 90, 180, 270, 360];
      const rotation = 180 - deg;
      const newRotation = degs?.find((deg) => {
        if (Math.abs(deg - rotation) <= 45 || Math.abs(deg + rotation) <= 4)
          return true;
      });
      if (newRotation) {
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node?.data, rotation: newRotation } }
              : node
          )
        );
      }
      updateNodeInternals(id);
    });

    selection.call(dragHandler as any);
  }, [id, updateNodeInternals, selected]);

  if (!selected) return null;

  return (
    <div
      ref={rotateControlRef}
      className={css({
        position: "absolute",
        width: 10,
        height: 10,
        background: "#3367d9",
        left: "50%",
        top: -30,
        borderRadius: "100%",
        transform: "translate(-50%, 120%)",
        cursor: "pointer",
      })}
    />
  );
}
