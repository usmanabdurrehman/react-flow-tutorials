import {
  Box,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

import { Pencil, PencilSquare, Stripe, X } from "react-bootstrap-icons";
import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import CustomHandle from "./CustomHandle";
import { PAYMENT_PROVIDERS, PAYMENT_PROVIDER_IMAGE_MAP } from "../constants";

type PaymentProviderNode = Node<{ name: string; code: string }, string>;

export default function PaymentProvider({
  data: { name, code },
  id,
  selected,
}: NodeProps<PaymentProviderNode>) {
  const { setNodes, updateNodeData } = useReactFlow();

  return (
    <Flex
      borderRadius={"24px"}
      border="2px solid #5e5eff"
      alignItems={"center"}
      bg="white"
      p={1}
      pb={1}
      pl={"12px"}
      gap={1}
    >
      <Box h={4} w={4}>
        <Image
          height="100%"
          width="100%"
          src={PAYMENT_PROVIDER_IMAGE_MAP[code]}
        />
      </Box>
      <Flex grow="1">
        <Text fontSize="small" mt={"-2px"} marginRight={"10px"}>
          {name}
        </Text>
      </Flex>
      {selected && (
        <>
          <Popover placement="top">
            <PopoverTrigger>
              <IconButton
                aria-label="Edit Payment Provider"
                pointerEvents="all"
                icon={<PencilSquare />}
                bg="transparent"
                size="small"
                color="gray"
                onClick={() => {}}
              />
            </PopoverTrigger>
            <PopoverContent width="150px">
              <PopoverArrow />
              <PopoverBody>
                <Flex flexWrap="wrap" gap={2}>
                  {PAYMENT_PROVIDERS.map(({ code, name }) => (
                    <Image
                      height="24px"
                      width="24px"
                      cursor={"pointer"}
                      src={PAYMENT_PROVIDER_IMAGE_MAP[code]}
                      onClick={() => updateNodeData(id, { code, name })}
                    />
                  ))}
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <IconButton
            aria-label="Delete Payment Provider"
            pointerEvents="all"
            icon={<X />}
            color="red"
            bg="transparent"
            size="small"
            onClick={() => {
              setNodes((prevNodes) =>
                prevNodes.filter((node) => node.id !== id)
              );
            }}
          />
        </>
      )}

      <CustomHandle type="target" position={Position.Left} />
    </Flex>
  );
}
