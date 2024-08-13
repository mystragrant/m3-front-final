import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const CreatorIcon = ({
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
      <g clipPath="url(#clip0_3376_13722)">
        <path
          d="M9.5 16.625C13.435 16.625 16.625 13.435 16.625 9.5C16.625 5.56497 13.435 2.375 9.5 2.375C5.56497 2.375 2.375 5.56497 2.375 9.5C2.375 13.435 5.56497 16.625 9.5 16.625Z"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0625 15.672V13.0625C13.0625 12.905 12.9999 12.754 12.8886 12.6427C12.7772 12.5313 12.6262 12.4688 12.4688 12.4688H6.53125C6.37378 12.4688 6.22276 12.5313 6.11141 12.6427C6.00006 12.754 5.9375 12.905 5.9375 13.0625V15.672"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.125 12.4688V10.6875C7.125 10.53 7.18756 10.379 7.29891 10.2677C7.41026 10.1563 7.56128 10.0938 7.71875 10.0938H11.2812C11.4387 10.0938 11.5897 10.1563 11.7011 10.2677C11.8124 10.379 11.875 10.53 11.875 10.6875V12.4688"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.9728 10.0938L10.0822 5.81658C9.95082 5.18646 9.05129 5.18646 8.91992 5.81658L8.0293 10.0938"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3376_13722">
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
