import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Image } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { useDashboardProvider } from "../../../../providers/Dashboard/useDashboard";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

export const TokenPriceBar = () => {
  const { tokens } = useDashboardProvider();
  const { borderPrimary, textSecondary } = useThemeProvider();

  return (
    <Flex
      borderBottom="1px solid"
      borderColor={borderPrimary}
      w="100%"
      bg={"none"}
      borderRadius="4px"
      h="30px"
      align="center"
      overflowX="hidden"
      mb="20px"
    >
      <Marquee>
        {tokens.map((token) => {
          return (
            <Flex
              fontSize="12px"
              fontFamily="Inter"
              align="center"
              gap="6px"
              color={textSecondary}
            >
              <Image borderRadius={"3px"} h="14px" w="14px" src={token.image} />
              {token.name}
              <Box fontFamily="Space Mono" color="white">
                ${Number(token.current_price.replaceAll(",", "."))}
              </Box>
              <>
                <Flex
                  color={
                    token.price_change_percentage_24h >= 0
                      ? "#54E2B7"
                      : "#e74c3c"
                  }
                  align="center"
                  gap="4px"
                  fontFamily="Space Mono"
                  fontSize="10px"
                  fontWeight="700"
                >
                  {Number(
                    token.price_change_percentage_24h.replaceAll(",", "."),
                  ).toFixed(2)}
                  %
                  {token.price_change_percentage_24h >= 0 ? (
                    <TriangleUpIcon color="#54E2B7" />
                  ) : (
                    <TriangleDownIcon color="#e74c3c" />
                  )}
                </Flex>
              </>
              <Box
                h="12px"
                w="1px"
                margin="0px 7px"
                bg="#73767D"
                mr="14px"
              ></Box>
            </Flex>
          );
        })}
      </Marquee>
    </Flex>
  );
};
