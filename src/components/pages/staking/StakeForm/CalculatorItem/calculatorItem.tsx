import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { abbrNum } from "../../../../../utils";
import { PointsDisplay } from "../../../../shared/display/PointsDisplay/pointsDisplay";

export const CalculatorItem = ({
  stakingMode,
  csprStaked,
  balance,
  label,
  divide,
  stakeAmount,
  apy,
}: {
  stakingMode: string;
  csprStaked: number;
  label: string;
  balance: number;
  divide: number;
  apy: number;
  stakeAmount: number;
}) => {
  const { textSecondary, borderPrimary: borderColor } = useThemeProvider();

  return (
    <Flex
      border="1px solid"
      borderColor={borderColor}
      fontSize="14px"
      fontFamily="Inter"
      borderBottom="none"
      justify="space-between"
      padding="8px 20px"
    >
      <Flex align="center" w="50px" color="white">
        {label}
      </Flex>
      <Flex align="center" fontFamily="Space Mono" color="white" w="200px">
        {abbrNum(
          ((csprStaked +
            (stakingMode == "staking" ? stakeAmount : -stakeAmount)) *
            apy) /
            100 /
            divide,
        )}{" "}
        CSPR
        {stakeAmount > 0 && (
          <Box
            ml="10px"
            fontSize="12px"
            color={
              stakingMode == "staking" ? "brandSecondary.500" : "error.500"
            }
          >
            ({stakingMode == "staking" ? "+" : "-"}
            {abbrNum((stakeAmount * apy) / 100 / divide)})
          </Box>
        )}
      </Flex>
      <Flex align="center" w="170px" color={textSecondary}>
        <PointsDisplay
          amount={
            ((csprStaked +
              (stakingMode == "staking" ? stakeAmount : -stakeAmount)) *
              apy) /
            100 /
            divide
          }
        />

        {stakeAmount > 0 && (
          <Box
            ml="10px"
            fontSize="12px"
            fontFamily="Space Mono"
            color={
              stakingMode == "staking" ? "brandSecondary.500" : "error.500"
            }
          >
            ({stakingMode == "staking" ? "+" : "-"}
            {abbrNum((stakeAmount * apy) / 100 / divide)})
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
