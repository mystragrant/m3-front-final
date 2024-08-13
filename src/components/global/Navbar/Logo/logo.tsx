import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";

export const Logo = ({ isOpen }: { isOpen: boolean }) => {
  const logoUrl = useColorModeValue("mystra-black.svg", "mystra-white.svg");

  return (
    <>
      <Flex
        paddingLeft={isOpen ? "16px" : "18px"}
        align={"center"}
        position="relative"
      >
        <Flex h="35px" justify="space-between">
          <Image
            w={isOpen ? "auto" : "35px"}
            transform={{
              base: "none",
              md: isOpen ? "translateX(2px)" : "translateX(-3px)",
            }}
            src={
              isOpen
                ? `/assets/brand/${logoUrl}`
                : `/assets/brand/star-white.svg`
            }
          />
        </Flex>
        {isOpen && (
          <Flex
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="10px"
            align="flex-end"
            ml="55px"
            flexDir="column"
          >
            <Flex>
              Web{" "}
              <Box ml="4px" color="brandSecondary.500">
                3.0
              </Box>{" "}
            </Flex>

            <Box>platform</Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};
