import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

export const TabSelect = ({
  options,
  onChange,
}: {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(options[0].value);

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    onChange(value);
  };

  const { textSecondary, textPrimary } = useThemeProvider();

  return (
    <Flex mb="6px" gap="28px" fontSize="16px" fontFamily="Inter">
      {options.map(({ value, label }) => (
        <Box
          key={value}
          cursor="pointer"
          textTransform={"capitalize"}
          onClick={() => handleFilterClick(value)}
          color={value == activeFilter ? textPrimary : textSecondary}
          pos="relative"
          _before={
            value == activeFilter
              ? {
                  content: "''",
                  pos: "absolute",
                  w: "100%",
                  maxW: "40px",
                  h: "2px",
                  bottom: "-6px",
                  bg: textPrimary,
                }
              : {}
          }
        >
          {label}
        </Box>
      ))}
    </Flex>
  );
};
