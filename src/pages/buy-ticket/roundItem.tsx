import { Box, Flex, Image } from "@chakra-ui/react";
import { useMemo } from "react";

export const RoundItem = ({
  index,
  price,
  percent,
  max,
  currentSold,
  previousMax,
}: {
  index: number;
  price: number;
  percent: number;
  max: number;
  currentSold: number;
  previousMax: number;
}) => {
  const amountCompleted = useMemo(() => {
    if (currentSold > previousMax + max) {
      return max;
    } else if (currentSold - previousMax >= 0) {
      return currentSold - previousMax;
    } else {
      return 0;
    }
  }, [currentSold]);

  const percentCompleted = useMemo(() => {
    if (currentSold > previousMax + max) {
      return 1;
    } else if (currentSold - previousMax >= 0) {
      return (currentSold - previousMax) / max;
    } else {
      return 0;
    }
  }, [currentSold]);

  const isStarted = useMemo(() => currentSold >= previousMax, [currentSold]);

  const isEnded = useMemo(
    () => (max == 0 ? false : currentSold >= previousMax + max),
    [currentSold],
  );

  return (
    <Flex
      flexDir="column"
      display={{ base: !isEnded && isStarted ? "flex" : "none", lg: "flex" }}
      position="relative"
      opacity={isStarted ? "1" : "0.5"}
    >
      <Flex
        align="center"
        justify="space-between"
        h="16px"
        fontFamily="Sora"
        mb="4px"
      >
        <Box
          fontSize={isStarted && !isEnded ? "16px" : "12px"}
          fontFamily="Sora"
          fontWeight="400"
        >
          <Box display="inline-block" color="#04D7B1">
            $
          </Box>
          {price}
        </Box>
      </Flex>

      <Flex flexDir="column" gap="4px">
        {
          <Box
            pos="relative"
            w={{ base: "auto", md: "auto" }}
            h="7px"
            bg="#4B4B4B"
            borderRadius="2px"
          >
            <Box
              bg="#04D7B1"
              w={`${max != 0 ? percentCompleted * 100 : 0}%`}
              borderRadius="2px"
              h="7px"
            ></Box>
            {isEnded && (
              <Box
                position="absolute"
                left="50%"
                margin="-10px auto"
                transform="rotate(10deg) translateX(-50%)"
                letterSpacing="0.2em"
                fontSize="12px"
                padding="4px 8px"
                bg="#FF0202"
                color="white"
              >
                SOLD
              </Box>
            )}
          </Box>
        }
        {max != 0 ? (
          <Box
            fontFamily="Inter"
            opacity="0.5"
            fontSize="12px"
            transform={"translateX(-0px)"}
          >
            {previousMax}
          </Box>
        ) : (
          <Box fontSize="10px">Limited by DAO</Box>
        )}
      </Flex>
    </Flex>
  );
};
