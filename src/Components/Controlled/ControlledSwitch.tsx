import { ControllerProps, useController } from "react-hook-form";
import { Switch, SwitchProps } from "@chakra-ui/react";

type ControlledSwitchProps = Omit<ControllerProps<any>, "render"> & SwitchProps;

const ControlledSwitch = function ControlledSwitch({
  name,
  control,
  ...props
}: ControlledSwitchProps) {
  const { field } = useController({
    control: control,
    name: name,
  });

  return (
    <Switch
      isChecked={field.value}
      onChange={(e) => field.onChange(e.target.checked)}
      {...props}
    />
  );
};

export default ControlledSwitch;
