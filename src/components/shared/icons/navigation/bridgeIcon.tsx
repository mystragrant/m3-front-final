import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const BridgeIcon = ({
  customColor,
  customSize,
}: {
  customColor?: string;
  customSize?: number;
}) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width={customSize ?? "18"}
      height={customSize ?? "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 10.5V3.5H13V10"
        stroke={customColor ?? color}
        strokeWidth="1.6"
      />
      <circle cx="13.5" cy="13.5" r="1.5" fill={customColor ?? color} />
      <circle cx="2.5" cy="13.5" r="1.5" fill={customColor ?? color} />
      <path
        d="M16.364 7.18164L13.182 10.3636L10.0001 7.18164"
        stroke="black"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};
