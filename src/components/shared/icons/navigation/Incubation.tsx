import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";

export const IncubationIcon = ({
  customColor,
  customSize,
}: {
  customColor?: string;
  customSize?: number;
}) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width={customSize ?? 24}
      height={customSize ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 20.25V3.00004C12.7499 2.8643 12.713 2.73114 12.6432 2.61473C12.5734 2.49833 12.4733 2.40305 12.3536 2.33906C12.2339 2.27507 12.099 2.24477 11.9635 2.25138C11.8279 2.25799 11.6967 2.30127 11.5838 2.3766L4.08375 7.37629C3.98088 7.44492 3.89658 7.53793 3.83835 7.64703C3.78012 7.75613 3.74977 7.87793 3.75 8.0016V20.25"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 8.25H19.5C19.6989 8.25 19.8897 8.32902 20.0303 8.46967C20.171 8.61032 20.25 8.80109 20.25 9V20.25"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 20.25H22.5"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 10.5V12"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 10.5V12"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 15.75V17.25"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 15.75V17.25"
        stroke={customColor ?? color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
