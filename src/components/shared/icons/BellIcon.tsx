import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "./iconColors";

export const BellIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4138 6.53583C13.4138 5.21889 12.8906 3.95589 11.9594 3.02468C11.0282 2.09346 9.76521 1.57031 8.44828 1.57031C7.13134 1.57031 5.86834 2.09346 4.93713 3.02468C4.00591 3.95589 3.48276 5.21889 3.48276 6.53583C3.48276 12.3289 1 13.9841 1 13.9841H15.8966C15.8966 13.9841 13.4138 12.3289 13.4138 6.53583Z"
        stroke={customColor ?? color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.87907 17.2939C9.73357 17.5448 9.52474 17.753 9.27347 17.8977C9.0222 18.0424 8.73732 18.1186 8.44735 18.1186C8.15738 18.1186 7.8725 18.0424 7.62123 17.8977C7.36996 17.753 7.16112 17.5448 7.01562 17.2939"
        stroke={customColor ?? color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
