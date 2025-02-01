import { ControllerProps, useController } from "react-hook-form";
import { Input, InputProps } from "@chakra-ui/react";

type ControlledInputProps = Omit<ControllerProps<any>, "render"> & InputProps;

const ControlledInput = function ControlledInput({
  name,
  control,
  ...props
}: ControlledInputProps) {
  const { field } = useController({
    control: control,
    name: name,
  });

  return <Input {...field} {...props} />;
};

export default ControlledInput;
