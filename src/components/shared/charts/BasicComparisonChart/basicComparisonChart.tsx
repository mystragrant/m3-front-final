import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

export const BasicComparisonChart = ({
  start,
  end,
  current,
  showIndicator = true,
  showEndpoints = true,
}: {
  start: number;
  end: number;
  current: number;
  showIndicator?: boolean;
  showEndpoints?: boolean;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <Flex padding="12px 0px" pos="relative">
      <Flex pos="relative" w="100%">
        <Flex
          minW="100px"
          w="100%"
          h="4px"
          bg={textSecondary}
          borderRadius="2px"
          pos="relative"
          overflow="hidden"
        >
          <Box
            pos="absolute"
            top="0"
            h="100%"
            left="0"
            w={`${(current / end) * 100}%`}
            bg={"brandSecondary.500"}
          />
        </Flex>
        <Box
          pos="absolute"
          top="-1px"
          h="6px"
          borderRadius="1px"
          left={`${(current / end) * 100}%`}
          w={"2px"}
          bg={"brandSecondary.500"}
        />
        {showIndicator && (
          <Box
            pos="absolute"
            top="-16px"
            borderRadius="1px"
            left={`${(current / end) * 100}%`}
          >
            <Box
              fontSize="10px"
              transform={"translateX(-50%)"}
              left="50%"
              pos="absolute"
              textAlign="center"
              color="brandSecondary.500"
            >
              {Math.floor(current)}
            </Box>
          </Box>
        )}
      </Flex>
      {showEndpoints && (
        <Box
          color={textSecondary}
          pos="absolute"
          left="0"
          bottom="-6px"
          fontSize="10px"
        >
          {start}
        </Box>
      )}
      {showEndpoints && (
        <Box
          color={textSecondary}
          pos="absolute"
          right="0"
          bottom="-6px"
          fontSize="10px"
        >
          {end}
        </Box>
      )}
    </Flex>
  );
};
