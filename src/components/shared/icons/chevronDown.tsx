import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "./iconColors";

export const ChevronDownIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0001 0.999977L7.02339 7.02316L1.00021 1.04643"
        stroke={customColor ? customColor : color}
        strokeWidth="2"
      />
    </svg>
  );
};
