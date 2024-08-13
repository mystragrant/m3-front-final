import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const BigGridIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="9.09091"
        height="9.09091"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="11.8164"
        width="9.09091"
        height="9.09091"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        y="10.9092"
        width="9.09091"
        height="9.09091"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="11.8164"
        y="10.9092"
        width="9.09091"
        height="9.09091"
        rx="2"
        fill={customColor ?? color}
      />
    </svg>
  );
};
