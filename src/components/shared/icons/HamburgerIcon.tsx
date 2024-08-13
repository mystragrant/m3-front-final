import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "./iconColors";

export const HamburgerIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.896484"
        y="0.118652"
        width="18"
        height="2"
        fill={customColor ?? color}
      />
      <rect
        x="0.896484"
        y="6.11865"
        width="18"
        height="2"
        fill={customColor ?? color}
      />
      <rect
        x="0.896484"
        y="12.1187"
        width="18"
        height="2"
        fill={customColor ?? color}
      />
    </svg>
  );
};
