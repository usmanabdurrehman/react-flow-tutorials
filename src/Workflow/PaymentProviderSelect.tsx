import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronBarDown } from "react-bootstrap-icons";
import { useReactFlow } from "reactflow";

const PAYMENT_PROVIDERS = [
  { code: "St", name: "Stripe" },
  { code: "Gp", name: "Google Pay" },
  { code: "Ap", name: "Apple Pay" },
  { code: "Pp", name: "Paypal" },
  { code: "Am", name: "Amazon Pay" },
];

export default function PaymentProviderSelect() {
  const { setNodes } = useReactFlow();
  const onPaymentProviderClick = ({
    code,
    name,
  }: {
    code: string;
    name: string;
  }) => {
    const location = Math.random() * 500;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length + 1}`,
        data: { code, name },
        position: { x: location, y: location },
        type: "paymentProvider",
      },
    ]);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronBarDown />}>
        Add Payment Provider
      </MenuButton>
      <MenuList>
        {PAYMENT_PROVIDERS.map((provider) => (
          <MenuItem onClick={() => onPaymentProviderClick(provider)}>
            {provider.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
