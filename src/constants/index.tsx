import { IconButton } from "@chakra-ui/react";
import { Edge, MarkerType, Node } from "@xyflow/react";
import { Bank, CreditCard, Flag, X } from "react-bootstrap-icons";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "paymentInit",
    position: {
      x: 20,
      y: 67,
    },
    data: {
      amount: 100,
    },
  },
  {
    id: "2",
    type: "paymentCountry",
    position: {
      x: 300,
      y: 225,
    },
    data: {
      currency: "$",
      country: "United States",
      countryCode: "US",
    },
  },
  {
    id: "3",
    type: "expensiveNode",
    position: {
      x: 300,
      y: 67,
    },
    data: {},
  },
];

export const initialEdges: Edge[] = [
  {
    source: "1",
    target: "2",
    animated: true,
    id: "1-2",
  },
];

export enum NodeType {
  PaymentInit = "paymentInit",
  PaymentCountry = "paymentCountry",
  PaymentProvider = "paymentProvider",
}

export const NODES = [
  {
    label: "Payment Init",
    type: NodeType.PaymentInit,
    icon: <CreditCard />,
  },
  {
    label: "Payment Country",
    type: NodeType.PaymentCountry,
    icon: <Flag />,
  },
  {
    label: "Payment Provider",
    type: NodeType.PaymentProvider,
    icon: <Bank />,
  },
];

export const COMPONENTS = new Array(1000)
  .fill(null)
  .map((_, i) => NODES[i % 3]);

export const PAYMENT_PROVIDER_IMAGE_MAP: { [code: string]: string } = {
  St: "https://cdn.worldvectorlogo.com/logos/stripe-2.svg",
  Ap: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
  Gp: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
  Pp: "https://avatars.githubusercontent.com/u/476675?s=280&v=4",
  Am: "https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png",
};

export const PAYMENT_PROVIDERS = [
  { code: "St", name: "Stripe" },
  { code: "Gp", name: "Google Pay" },
  { code: "Ap", name: "Apple Pay" },
  { code: "Pp", name: "Paypal" },
  { code: "Am", name: "Amazon Pay" },
];

export const PAYMENT_COUNTRIES = [
  { code: "US", name: "United States", currency: "$" },
  { code: "GB", name: "England", currency: "£" },
];
