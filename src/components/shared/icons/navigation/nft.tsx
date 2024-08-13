import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const NFTIcon = ({
  customColor,
  customSize,
}: {
  customColor?: string;
  customSize?: number;
}) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width={customSize ?? 18}
      height={customSize ?? 18}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3340_3734)">
        <path
          d="M21.9375 4.21875H8.4375C7.97151 4.21875 7.59375 4.59651 7.59375 5.0625V18.5625C7.59375 19.0285 7.97151 19.4062 8.4375 19.4062H21.9375C22.4035 19.4062 22.7812 19.0285 22.7812 18.5625V5.0625C22.7812 4.59651 22.4035 4.21875 21.9375 4.21875Z"
          stroke={customColor ?? color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6562 10.9688C13.5882 10.9688 14.3438 10.2132 14.3438 9.28125C14.3438 8.34927 13.5882 7.59375 12.6562 7.59375C11.7243 7.59375 10.9688 8.34927 10.9688 9.28125C10.9688 10.2132 11.7243 10.9688 12.6562 10.9688Z"
          stroke={customColor ?? color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4062 19.4062V21.9375C19.4062 22.1613 19.3174 22.3759 19.1591 22.5341C19.0009 22.6924 18.7863 22.7812 18.5625 22.7812H5.0625C4.83872 22.7812 4.62411 22.6924 4.46588 22.5341C4.30764 22.3759 4.21875 22.1613 4.21875 21.9375V8.4375C4.21875 8.21372 4.30764 7.99911 4.46588 7.84088C4.62411 7.68264 4.83872 7.59375 5.0625 7.59375H7.59375"
          stroke={customColor ?? color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.1982 19.4062L18.3879 11.2155C18.4663 11.137 18.5593 11.0748 18.6617 11.0323C18.7642 10.9899 18.874 10.968 18.9848 10.968C19.0957 10.968 19.2055 10.9899 19.3079 11.0323C19.4104 11.0748 19.5034 11.137 19.5818 11.2155L22.7817 14.4165"
          stroke={customColor ?? color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3340_3734">
          <rect width={27} height={27} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
