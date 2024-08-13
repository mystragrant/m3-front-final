import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

export const LevelList = ({
  level,
  maxPoints,
  currentPoints,
  children,
  itemsLength,
  itemsVerified,
}: {
  level: number;
  maxPoints: number;
  currentPoints: number;
  children: React.ReactNode;
  itemsLength: number;
  itemsVerified: number;
}) => {
  const { borderPrimary } = useThemeProvider();

  return (
    <Grid flexDir="column" gap="21px">
      <Grid templateColumns="auto auto 1fr" gap="26px" alignItems="center">
        <Box fontSize="20px">Level {level}</Box>

        <Flex></Flex>
        <Grid templateColumns={`repeat( ${itemsLength}, 1fr)`} gap="6px">
          {Array(itemsLength)
            .fill(0)
            .map((item, index) => (
              <Box
                h="4px"
                borderRadius="1px"
                bg={
                  index > itemsVerified - 1
                    ? borderPrimary
                    : "brandSecondary.500"
                }
              />
            ))}
        </Grid>
      </Grid>
      <Flex gap="14px" flexDir="column" w="100%">
        {children}
      </Flex>
    </Grid>
  );
};
