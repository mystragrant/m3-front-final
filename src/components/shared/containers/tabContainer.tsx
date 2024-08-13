import { Box, Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export interface ITabItem {
  label: string;
  content: React.ReactNode;
  amount?: number;
}

enum ViewModes {
  BIG,
  MEDIUM,
  MINIMAL,
}

export const TabContainer = ({
  openedTab = 0,
  items,
  addon,
}: {
  items: ITabItem[];
  openedTab?: number;
  addon?: React.ReactNode;
}) => {
  const [selectedTab, selectTab] = useState<ITabItem>(items[openedTab]);

  const [mode, setMode] = useState<ViewModes>(ViewModes.BIG);

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const colorSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const colorPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  const {
    backgroundTertiary,
    textPrimary,
    borderPrimary,
    backgroundSecondary,
    textSecondary,
  } = useThemeProvider();

  useEffect(() => {
    selectTab(items[openedTab]);
  }, [items]);

  return (
    <Grid gap="28px" templateRows="45px 50px auto" w="100%">
      <Flex
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderColor={borderPrimary}
      >
        <Flex>
          {items.map((tab) => {
            const selected = tab.label == selectedTab.label;

            return (
              <Flex
                mr="20px"
                position="relative"
                justify="center"
                align="center"
                gap="10px"
                color={selected ? colorPrimary : colorSecondary}
                cursor="pointer"
                onClick={() => selectTab(tab)}
                fontSize="14px"
                _after={
                  selected
                    ? {
                        content: "''",
                        height: "2px",
                        background: "white",
                        position: "absolute",
                        width: "100%",
                        bottom: "-13px",
                      }
                    : {}
                }
              >
                {tab.label}
                {tab.amount != null && (
                  <Flex
                    align="center"
                    lineHeight="100%"
                    fontSize="10px"
                    borderRadius="8px"
                    h="16px"
                    minW="16px"
                    paddingX="4px"
                    justify="center"
                    color={selected ? "black" : textPrimary}
                    bg={selected ? "#EFEFEF" : backgroundSecondary}
                  >
                    <Box mb="-1px">{tab.amount}</Box>
                  </Flex>
                )}
              </Flex>
            );
          })}
        </Flex>
        {addon && <Flex>{addon}</Flex>}
      </Flex>
      {/*} <Grid templateColumns="1fr auto auto auto" gap="8px">
        <SearchTokens />
        <Flex
          fontSize="24px"
          alignItems="center"
          justifyContent="center"
          onClick={() => setMode(ViewModes.BIG)}
          cursor="pointer"
          bg={mode == ViewModes.BIG ? backgroundTertiary : "initial"}
          borderRadius="8px"
          boxSize="50px"
          border="1px solid"
          borderColor={borderColor}
        >
          I
        </Flex>
        <Flex
          fontSize="24px"
          alignItems="center"
          justifyContent="center"
          onClick={() => setMode(ViewModes.MEDIUM)}
          cursor="pointer"
          bg={mode == ViewModes.MEDIUM ? backgroundTertiary : "initial"}
          borderRadius="8px"
          boxSize="50px"
          border="1px solid"
          borderColor={borderColor}
        >
          II
        </Flex>
        <Flex
          fontSize="24px"
          alignItems="center"
          justifyContent="center"
          onClick={() => setMode(ViewModes.MINIMAL)}
          cursor="pointer"
          bg={mode == ViewModes.MINIMAL ? backgroundTertiary : "initial"}
          borderRadius="8px"
          boxSize="50px"
          border="1px solid"
          borderColor={borderColor}
        >
          III
        </Flex>
        </Grid>*/}

      <Box>
        {selectedTab.content}
        <Box bg="none" padding="40px"></Box>
      </Box>
    </Grid>
  );
};
