import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const ProjectsIcon = ({
  customColor,
  customSize,
}: {
  customColor?: string;
  customSize?: number;
}) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width={customSize ?? 19}
      height={customSize ?? 19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3376_13745)">
        <path
          d="M5.9375 8.3125C7.24918 8.3125 8.3125 7.24918 8.3125 5.9375C8.3125 4.62582 7.24918 3.5625 5.9375 3.5625C4.62582 3.5625 3.5625 4.62582 3.5625 5.9375C3.5625 7.24918 4.62582 8.3125 5.9375 8.3125Z"
          stroke={customColor ?? color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0625 8.3125C14.3742 8.3125 15.4375 7.24918 15.4375 5.9375C15.4375 4.62582 14.3742 3.5625 13.0625 3.5625C11.7508 3.5625 10.6875 4.62582 10.6875 5.9375C10.6875 7.24918 11.7508 8.3125 13.0625 8.3125Z"
          stroke={customColor ?? color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.9375 15.4375C7.24918 15.4375 8.3125 14.3742 8.3125 13.0625C8.3125 11.7508 7.24918 10.6875 5.9375 10.6875C4.62582 10.6875 3.5625 11.7508 3.5625 13.0625C3.5625 14.3742 4.62582 15.4375 5.9375 15.4375Z"
          stroke={customColor ?? color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0625 15.4375C14.3742 15.4375 15.4375 14.3742 15.4375 13.0625C15.4375 11.7508 14.3742 10.6875 13.0625 10.6875C11.7508 10.6875 10.6875 11.7508 10.6875 13.0625C10.6875 14.3742 11.7508 15.4375 13.0625 15.4375Z"
          stroke={customColor ?? color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3376_13745">
          <rect
            width={customSize ?? 19}
            height={customSize ?? 19}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
