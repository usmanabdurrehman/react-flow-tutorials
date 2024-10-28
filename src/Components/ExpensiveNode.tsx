import {
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Position } from "@xyflow/react";
import CustomHandle from "./CustomHandle";
import { PencilSquare } from "react-bootstrap-icons";

const FIELDS = Array.from({ length: 300 }, (_, i) => i);

export default function ExpensiveNode() {
  const onChange = () => {};

  return (
    <Flex
      alignItems={"center"}
      borderRadius="8px"
      bg="#e2e8f0"
      border="2px solid #bbbdbf"
      p={2}
      gap={2}
    >
      <Popover placement="top">
        <PopoverTrigger>
          <Flex alignItems="center" justifyContent="space-between" gap={4}>
            <Text>Expensive Node</Text>
            <IconButton
              aria-label="Edit Payment Provider"
              pointerEvents="all"
              icon={<PencilSquare />}
              bg="transparent"
              size="small"
              color="gray"
              onClick={() => {}}
            />
          </Flex>
        </PopoverTrigger>
        <PopoverContent width="150px" height="300px" overflowY="auto">
          <PopoverArrow />
          <PopoverBody>
            <Flex flexWrap="wrap" gap={2}>
              {FIELDS.map((field) => (
                <Input
                  type="text"
                  placeholder={`Field ${field}`}
                  onChange={(e) => onChange()}
                />
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </Flex>
  );
}
