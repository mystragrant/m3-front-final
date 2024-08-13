import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "../iconColors";
import { size } from "@elastic/eui/src/themes/amsterdam/global_styling/variables/_size";

export const WrenchIcon = ({
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
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3376_13736)">
        <path
          d="M7.71891 9.42137C7.24426 8.5624 7.04732 7.57749 7.15517 6.60205C7.26301 5.62661 7.67034 4.70851 8.32117 3.97397C8.972 3.23943 9.83436 2.72451 10.7897 2.5C11.7451 2.27548 12.7465 2.35239 13.6564 2.72016L10.6877 5.93754L11.1077 7.89246L13.0627 8.31254L16.28 5.34379C16.6478 6.25366 16.7247 7.25511 16.5002 8.21047C16.2757 9.16584 15.7608 10.0282 15.0262 10.679C14.2917 11.3299 13.3736 11.7372 12.3981 11.845C11.4227 11.9529 10.4378 11.7559 9.57883 11.2813L5.41813 16.1055C5.0835 16.4401 4.62965 16.6281 4.15641 16.6281C3.68317 16.6281 3.22932 16.4401 2.89469 16.1055C2.56006 15.7709 2.37207 15.317 2.37207 14.8438C2.37207 14.3706 2.56006 13.9167 2.89469 13.5821L7.71891 9.42137Z"
          stroke={customColor ?? color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3376_13736">
          <rect
            width={customSize ?? 18}
            height={customSize ?? 18}
            fill={customColor ?? color}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
