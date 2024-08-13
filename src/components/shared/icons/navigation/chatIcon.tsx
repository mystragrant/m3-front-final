import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const ChatIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 11.3333C16 11.7459 15.8361 12.1416 15.5444 12.4333C15.2527 12.725 14.857 12.8889 14.4444 12.8889H5.11111L2 16V3.55556C2 3.143 2.16389 2.74733 2.45561 2.45561C2.74733 2.16389 3.143 2 3.55556 2H14.4444C14.857 2 15.2527 2.16389 15.5444 2.45561C15.8361 2.74733 16 3.143 16 3.55556V11.3333Z"
        stroke={customColor ?? color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
