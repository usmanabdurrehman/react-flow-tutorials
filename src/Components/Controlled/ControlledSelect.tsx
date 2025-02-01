import { ControllerProps, useController } from "react-hook-form";
import { Select, SelectProps } from "@chakra-ui/react";

type ControlledSelectProps = Omit<ControllerProps<any>, "render"> & SelectProps;

const ControlledSelect = function ControlledSelect({
  name,
  control,
  ...props
}: ControlledSelectProps) {
  const { field } = useController({
    control: control,
    name: name,
  });

  return <Select {...field} {...props} />;
};

export default ControlledSelect;
