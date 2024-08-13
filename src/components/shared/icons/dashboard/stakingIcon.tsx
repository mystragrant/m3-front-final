import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const StakingIconDashboard = ({
  customColor,
  customSize = 14,
}: {
  customColor?: string;
  customSize?: number;
}) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width={customSize}
      height={customSize}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1343_17182)">
        <path
          d="M17.25 4.5L10.125 11.625L6.375 7.875L0.75 13.5"
          stroke={customColor ?? color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 4.5H17.25V9"
          stroke={customColor ?? color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1343_17182">
          <rect width={customSize} height={customSize} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
