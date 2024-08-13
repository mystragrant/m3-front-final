import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { useThemeProvider } from "../../../../../../../providers/Theme/useThemeProvider";

export const FormGroup = ({
  title,
  children,
  addon,
}: {
  title: string;
  children: React.ReactNode;
  addon?: React.ReactNode;
}) => {
  const { textPrimary } = useThemeProvider();

  return (
    <Grid templateColumns="1fr">
      <Flex flexDir="column" gap="6px">
        <Flex
          justifyContent="space-between"
          align="center"
          fontWeight="400"
          fontFamily="Inter"
          fontSize="12px"
          color={textPrimary}
        >
          <Box>{title}</Box> {addon ? addon : <Box />}
        </Flex>
        <Flex flexDir="column" gap="9px">
          {children}
        </Flex>
      </Flex>
    </Grid>
  );
};
