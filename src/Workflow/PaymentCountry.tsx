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
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import CustomHandle from "./CustomHandle";
import { PencilSquare, X } from "react-bootstrap-icons";
import { PAYMENT_COUNTRIES } from "../constants";

type PaymentCountryNode = Node<
  { currency: string; country: string; countryCode: string },
  string
>;

export default function PaymentCountry({
  data: { currency, country, countryCode },
  id,
  selected,
}: NodeProps<PaymentCountryNode>) {
  const { setNodes, updateNodeData } = useReactFlow();

  return (
    <Flex
      alignItems={"center"}
      borderRadius="8px"
      bg="#e2e8f0"
      border="2px solid #bbbdbf"
      p={2}
      gap={2}
    >
      <Box>
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          aria-label={country}
          style={{ fontSize: "2em", lineHeight: "2em" }}
        />
      </Box>
      <Flex grow="1">
        <Box>
          <Text>{country}</Text>
          <Text fontSize="x-small">{currency}</Text>
        </Box>
      </Flex>
      {selected && (
        <>
          {" "}
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
                  {PAYMENT_COUNTRIES.map(({ code, name, currency }) => (
                    <ReactCountryFlag
                      countryCode={code}
                      svg
                      aria-label={name}
                      style={{
                        fontSize: "2em",
                        lineHeight: "2em",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        updateNodeData(id, {
                          countryCode: code,
                          country: name,
                          currency,
                        })
                      }
                    />
                  ))}
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <IconButton
            aria-label="Delete Payment Provider"
            pointerEvents="all"
            borderRadius="50%"
            icon={<X />}
            color="red"
            bg="transparent"
            size="small"
            onClick={() => {
              setNodes((prevNodes) =>
                prevNodes.filter((node) => node.id !== id)
              );
            }}
          />{" "}
        </>
      )}
      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </Flex>
  );
}
