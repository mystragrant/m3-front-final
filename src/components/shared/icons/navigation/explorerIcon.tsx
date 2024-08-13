import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const ExplorerIcon = ({
  customColor,
  customSize,
}: {
  customColor?: string;
  customSize?: number;
}) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width={customSize ?? "25"}
      height={customSize ?? "25"}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3212_13595)">
        <path
          d="M10.1562 8.59375H14.8438"
          stroke={customColor ?? "white"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.4209 15.0702L18.1582 5.37098C17.7187 4.93148 17.1226 4.68457 16.501 4.68457C15.8794 4.68457 15.2833 4.93148 14.8438 5.37098V16.4061"
          stroke={customColor ?? "white"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.1562 16.4061V5.37098C9.71672 4.93148 9.1206 4.68457 8.49902 4.68457C7.87745 4.68457 7.28133 4.93148 6.8418 5.37098L2.5791 15.0702"
          stroke={customColor ?? "white"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.25 20.3125C8.40736 20.3125 10.1562 18.5636 10.1562 16.4062C10.1562 14.2489 8.40736 12.5 6.25 12.5C4.09264 12.5 2.34375 14.2489 2.34375 16.4062C2.34375 18.5636 4.09264 20.3125 6.25 20.3125Z"
          stroke={customColor ?? "white"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.75 20.3125C20.9074 20.3125 22.6562 18.5636 22.6562 16.4062C22.6562 14.2489 20.9074 12.5 18.75 12.5C16.5926 12.5 14.8438 14.2489 14.8438 16.4062C14.8438 18.5636 16.5926 20.3125 18.75 20.3125Z"
          stroke={customColor ?? "white"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3212_13595">
          <rect
            width={customSize ?? "25"}
            height={customSize ?? "25"}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
