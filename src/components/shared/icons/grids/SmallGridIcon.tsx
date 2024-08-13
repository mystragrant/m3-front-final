import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const SmallGridIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="7.38281"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="14.7695"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        y="7.38477"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        y="14.7695"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="7.38281"
        y="7.38477"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="7.38281"
        y="14.7695"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="14.7695"
        y="7.38477"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
      <rect
        x="14.7695"
        y="14.7695"
        width="5.23072"
        height="5.23072"
        rx="2"
        fill={customColor ?? color}
      />
    </svg>
  );
};
