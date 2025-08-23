import {
  Handle,
  Node,
  Position,
  useReactFlow,
  type NodeProps,
} from "@xyflow/react";

type HandleNodeType = Node<
  {
    label?: string;
    handles: { id: string; label: string }[];
  },
  "custom"
>;

export function HandleNode({ data, id }: NodeProps<HandleNodeType>) {
  const { updateNodeData } = useReactFlow();

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <Handle type="target" position={Position.Left} />
      <Handle
        id={"1"}
        type="target"
        position={Position.Left}
        style={{ top: 12 }}
      />
      <Handle
        id={"2"}
        type="target"
        position={Position.Left}
        style={{ top: 24 }}
      />

      {data.handles.map(({ id: handleId, label }, index) => {
        return (
          <div
            style={{
              position: "relative",
              display: "flex",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 4,
            }}
            key={handleId}
          >
            {label}
            <button
              onClick={() => {
                const handlesCopy = [...data.handles];
                handlesCopy.splice(index, 1);
                updateNodeData(id, {
                  handles: handlesCopy,
                });
              }}
            >
              X
            </button>
            <Handle
              type="source"
              id={handleId}
              position={Position.Right}
              style={{ top: 12, right: -10 }}
            />
          </div>
        );
      })}
      <button
        style={{ marginTop: 12 }}
        onClick={() => {
          updateNodeData(id, {
            handles: [
              ...data.handles,
              {
                id: window.crypto.randomUUID(),
                label: `Handle ${data.handles.length + 1}`,
              },
            ],
          });
        }}
      >
        Add Handle
      </button>
    </div>
  );
}
