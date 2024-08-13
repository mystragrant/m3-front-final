import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useEffectOnce } from "../../../../hooks/useEffectOnce";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { MystraAPI } from "../../../../services/mystra-api";
import { formatDateToMonthName } from "../../../../utils/format";
import { StatusIndicator } from "./StatusIndicator/statusIndicator";

export const Changelog = () => {
  const { textSecondary, borderPrimary, backgroundPrimary } =
    useThemeProvider();

  const [changelogItems, setChangelogItems] = useState<any>();

  useEffectOnce(() => {
    MystraAPI.getChangelog()
      .then((res: any) => {
        const data = res.data;

        const groups = data.reduce((groups: any, game: any) => {
          const date = game.implementation_date.split("T")[0];
          try {
            if (!groups[date]) {
              groups[date] = [];
            }
          } catch (e) {
            groups[date] = [];
          }

          groups[date].push(game);

          return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            games: groups[date],
          };
        });

        setChangelogItems(groupArrays);
        console.log(groupArrays);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <Flex flexDir="column" borderColor={borderPrimary}>
      <Flex flexDir="column" pl="8px">
        {changelogItems ? (
          changelogItems.map((item: any, index: number) => {
            return (
              <Flex
                borderLeft="1px solid"
                borderColor={borderPrimary}
                paddingLeft="20px"
              >
                <Flex padding="00px 0px 20px" gap="60px" pb="40px">
                  <Box
                    pos="relative"
                    fontSize="16px"
                    fontFamily="Inter"
                    fontWeight="400"
                  >
                    <Flex
                      align="center"
                      borderRadius="50%"
                      justify="center"
                      boxSize="24px"
                      pos="absolute"
                      border="1px solid"
                      bg={backgroundPrimary}
                      borderColor={borderPrimary}
                      left="-33px"
                      top="-1px"
                    >
                      <Flex
                        boxSize="10px"
                        borderRadius="50%"
                        bg={
                          index === 0
                            ? "brandSecondary.500"
                            : "rgba(255,255,255,0.2)"
                        }
                      ></Flex>
                    </Flex>
                    {index === 0 && (
                      <Box
                        w="2px"
                        h="41px"
                        bg={backgroundPrimary}
                        pos="absolute"
                        left="-23px"
                        top="-40px"
                      ></Box>
                    )}
                    <Box ml="10px" minW="200px">
                      {formatDateToMonthName(item.date)}
                    </Box>
                  </Box>
                  <Flex
                    flexDir="column"
                    gap="10px"
                    mt="2px"
                    fontFamily="Inter"
                    fontSize="14px"
                    color={textSecondary}
                  >
                    {item.games.map((value: any) => {
                      return (
                        <Flex align="center" gap="14px">
                          <StatusIndicator status={value.status} />
                          <Box fontFamily="Inter">{value.full_description}</Box>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            );
          })
        ) : (
          <Flex h="400px" align="center" justify="center">
            <Spinner />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
