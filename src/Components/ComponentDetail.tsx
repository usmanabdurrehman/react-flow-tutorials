import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useReactFlow, type Node } from "@xyflow/react";
import { useState } from "react";
import { getUnit } from "../utils";
import { ElectricalComponentType } from "../types";

export default function ComponentDetail({ node }: { node: Node }) {
  const nodeType = (node?.data?.type as string) || node?.type;
  const [value, setValue] = useState(`${node?.data?.value || 0}`);
  const { updateNodeData } = useReactFlow();

  const unit = getUnit(nodeType as ElectricalComponentType);
  return (
    <Box>
      <Heading fontSize="xs">{nodeType?.toUpperCase()}</Heading>

      <InputGroup size="sm" mt={2}>
        <Input
          placeholder="Value"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value ? parseFloat(e.target.value) : 0;
            updateNodeData(node.id, { value: newValue });
            setValue(newValue.toString());
          }}
        />
        <InputRightAddon>{unit}</InputRightAddon>
      </InputGroup>
    </Box>
  );
}