import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";

export const EthereumIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="#ECEFF0" />
      <g clipPath="url(#clip0_2088_2862)">
        <path
          d="M8.24213 1.93933L8.16797 2.19346V9.56701L8.24213 9.64165L11.635 7.61849L8.24213 1.93933Z"
          fill="#343434"
        />
        <path
          d="M8.24207 1.93933L4.84912 7.61849L8.24207 9.64165V6.06273V1.93933Z"
          fill="#8C8C8C"
        />
        <path
          d="M8.24199 10.2897L8.2002 10.3411V12.9677L8.24199 13.0908L11.6369 8.26758L8.24199 10.2897Z"
          fill="#3C3C3B"
        />
        <path
          d="M8.24207 13.0908V10.2897L4.84912 8.26758L8.24207 13.0908Z"
          fill="#8C8C8C"
        />
        <path
          d="M8.24219 9.64166L11.635 7.6185L8.24219 6.06274V9.64166Z"
          fill="#141414"
        />
        <path
          d="M4.84912 7.6185L8.24207 9.64166V6.06274L4.84912 7.6185Z"
          fill="#393939"
        />
      </g>
      <defs>
        <clipPath id="clip0_2088_2862">
          <rect
            width="6.78788"
            height="11.1515"
            fill="white"
            transform="translate(4.84912 1.93933)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
