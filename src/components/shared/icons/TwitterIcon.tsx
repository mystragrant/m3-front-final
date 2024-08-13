import { useColorMode } from "@chakra-ui/core";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { IconColors } from "./iconColors";

export const TwitterIcon = ({ customColor }: { customColor?: string }) => {
  const color = useColorModeValue(IconColors.LIGHT, IconColors.DARK);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.66262 16.1255C12.4534 16.1255 16.1687 10.4981 16.1687 5.61944C16.1687 5.46124 16.1652 5.29952 16.1582 5.14132C16.8809 4.61865 17.5046 3.97124 18 3.22952C17.3269 3.529 16.6122 3.72459 15.8804 3.8096C16.651 3.34773 17.2279 2.62215 17.5043 1.76737C16.7794 2.19697 15.9867 2.50001 15.1601 2.66351C14.6031 2.07172 13.8667 1.67989 13.0648 1.54859C12.2628 1.41729 11.4399 1.55384 10.7233 1.93712C10.0067 2.32041 9.43635 2.92908 9.10039 3.66903C8.76442 4.40899 8.68157 5.23901 8.86465 6.03077C7.39687 5.95712 5.96095 5.57583 4.64999 4.91162C3.33902 4.24742 2.18227 3.31513 1.25473 2.17519C0.7833 2.98798 0.639042 3.94978 0.851273 4.86512C1.0635 5.78045 1.6163 6.58064 2.3973 7.10304C1.81097 7.08442 1.23748 6.92656 0.724219 6.64249V6.68819C0.723693 7.54116 1.01857 8.36799 1.55873 9.02813C2.09889 9.68826 2.85099 10.141 3.68719 10.3093C3.14404 10.4579 2.57399 10.4795 2.02113 10.3726C2.25709 11.1061 2.71618 11.7477 3.33433 12.2078C3.95248 12.6679 4.69884 12.9235 5.46926 12.939C4.16132 13.9664 2.54563 14.5236 0.882422 14.521C0.587465 14.5206 0.292799 14.5025 0 14.4669C1.68964 15.5509 3.65515 16.1266 5.66262 16.1255Z"
        fill={customColor ?? color}
      />
    </svg>
  );
};
