import { Edge, Node } from "reactflow";

// export const initialEdges: Edge[] = [
//   {
//     id: "1-2",
//     source: "1",
//     target: "2",
//     type: "customEdge",
//     animated: true,
//   },
// ];

// export const initialNodes: Node[] = [
//   {
//     id: "1",
//     data: { label: "Hello" },
//     position: { x: 100, y: 100 },
//     type: "customNode",
//   },
//   {
//     id: "2",
//     data: { label: "World" },
//     position: { x: 300, y: 300 },
//     type: "customNode",
//   },
// ];

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "1",
    data: { amount: 300 },
    position: { x: 100, y: 100 },
    type: "paymentInit",
  },
  {
    id: "2",
    data: { currency: "$", country: "United States", countryCode: "US" },
    position: { x: 300, y: 20 },
    type: "paymentCountry",
  },
  {
    id: "3",
    data: { currency: "£", country: "England", countryCode: "GB" },
    position: { x: 300, y: 200 },
    type: "paymentCountry",
  },
  {
    id: "4",
    data: { name: "Stripe", code: "St" },
    position: { x: 550, y: 100 },
    type: "paymentProvider",
  },
  {
    id: "5",
    data: { name: "Apple Pay", code: "Ap" },
    position: { x: 550, y: 300 },
    type: "paymentProvider",
  },
  {
    id: "6",
    data: { name: "Google Pay", code: "Gp" },
    position: { x: 550, y: -100 },
    type: "paymentProvider",
  },
];
