import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const WalletIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="18"
      height="18"
      viewBox="-1 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7702 11.5347H12.495C11.3338 11.5347 10.3926 10.571 10.3926 9.38211C10.3926 8.19324 11.3338 7.22949 12.495 7.22949H16.7702V11.5362V11.5347Z"
        stroke={customColor ?? color}
        strokeWidth="1.6"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M16.7701 11.5349V15.7646H3.10239C1.94126 15.7646 1 14.8008 1 13.612V5C1 3.89543 1.89543 3 3 3H16.7701V7.22967"
        stroke={customColor ?? color}
        strokeWidth="1.6"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  );
};
