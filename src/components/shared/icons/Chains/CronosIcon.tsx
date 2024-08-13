import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";

export const CronosIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2729_20984)">
        <circle cx="9.5" cy="9.5" r="9.5" fill="#ECEFF0" />
        <path
          d="M9.50513 2L3.32352 5.75V13.25L9.50513 17L15.6765 13.25V5.75L9.50513 2ZM13.8456 12.1369L9.49484 14.7738L5.15434 12.1369V6.86311L9.50513 4.22622L13.8456 6.86311V12.1369Z"
          fill="#002D74"
        />
        <path
          d="M9.50513 17L15.6765 13.25V5.75L9.50513 2V4.22622L13.8456 6.86311V12.1477L9.49484 14.7846V17H9.50513Z"
          fill="url(#paint0_linear_2729_20984)"
        />
        <path
          d="M9.49485 2L3.32352 5.75V13.25L9.49485 17V14.7738L5.15434 12.1369V6.85231L9.49485 4.22622V2Z"
          fill="url(#paint1_linear_2729_20984)"
        />
        <path
          d="M12.3851 11.2507L9.50514 13.0014L6.6149 11.2507V7.74928L9.50514 5.99856L12.3851 7.74928L11.1817 8.48415L9.49485 7.45749L7.81831 8.48415V10.5267L9.50514 11.5533L11.192 10.5267L12.3851 11.2507Z"
          fill="#002D74"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2729_20984"
          x1="12.5925"
          y1="17.0003"
          x2="12.5925"
          y2="9.50015"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002D74" />
          <stop offset="1" stopColor="#002D74" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2729_20984"
          x1="6.41158"
          y1="2"
          x2="6.41158"
          y2="9.50015"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002D74" />
          <stop offset="1" stopColor="#002D74" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_2729_20984">
          <rect width="19" height="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
