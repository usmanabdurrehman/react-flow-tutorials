import React, { useEffect, useRef } from "react";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";

export default function Rotation({
  selected,
  id,
}: {
  selected: boolean | undefined;
  id: string;
}) {
  const rotatorRef = useRef(null);

  const { updateNodeData } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (!rotatorRef.current) {
      return;
    }
    const selection = select(rotatorRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;

      const radians = Math.atan2(dx, dy);
      const deg = radians * (180 / Math.PI);
      const rotation = 180 - deg;

      const perpendicularAngles = [0, 90, 180, 270, 360];

      const perpendicularRotation = perpendicularAngles.find((deg) => {
        if (Math.abs(deg - rotation) <= 45 || Math.abs(deg + rotation) <= 45)
          return true;
      });

      if (perpendicularRotation)
        updateNodeData(id, { rotation: perpendicularRotation });
      updateNodeInternals(id);
    });

    selection.call(dragHandler as any);
  }, [selected, id, updateNodeData, updateNodeInternals]);

  if (!selected) return null;

  return (
    <div
      ref={rotatorRef}
      style={{
        position: "absolute",
        width: 10,
        height: 10,
        background: "#3376d9",
        left: "50%",
        top: -30,
        borderRadius: "100%",
        transform: "translate(-50%, 120%)",
        cursor: "pointer",
      }}
    />
  );
}
