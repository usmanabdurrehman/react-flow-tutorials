import { ControllerProps, useController } from "react-hook-form";
import { Input, InputProps, Textarea, TextareaProps } from "@chakra-ui/react";

type ControlledTextAreaProps = Omit<ControllerProps<any>, "render"> &
  TextareaProps;

const ControlledTextArea = function ControlledTextArea({
  name,
  control,
  ...props
}: ControlledTextAreaProps) {
  const { field } = useController({
    control: control,
    name: name,
  });

  return <Textarea {...field} {...props} />;
};

export default ControlledTextArea;
