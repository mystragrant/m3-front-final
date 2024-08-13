import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const DashboardIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 2.25H2.25V7.5H7.5V2.25Z"
        stroke={customColor ?? color}
        strokeWidth="1.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 2.25H10.5V7.5H15.75V2.25Z"
        stroke={customColor ?? color}
        strokeWidth="1.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 10.5H10.5V15.75H15.75V10.5Z"
        stroke={customColor ?? color}
        strokeWidth="1.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.5H2.25V15.75H7.5V10.5Z"
        stroke={customColor ?? color}
        strokeWidth="1.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
