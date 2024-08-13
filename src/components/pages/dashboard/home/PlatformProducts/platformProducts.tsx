import { Flex, Grid, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { PLATFORM_PRODUCTS } from "./products";

export interface PlatformProductItem {
  name: string;
  description: string;
  iconUrl: string;
  link: string;
  inProgress: boolean;
  comingSoon: boolean;
  new: boolean;
}

const ProductItem = ({ item }: { item: PlatformProductItem }) => {
  const { borderPrimary, textSecondary, textPrimary } = useThemeProvider();

  const navigate = useNavigate();

  return (
    <Flex
      border="1px solid"
      padding="10px"
      flexDir="column"
      borderRadius="8px"
      onClick={
        item.inProgress || item.comingSoon
          ? () => {}
          : () => navigate(item.link)
      }
      bg="#131313"
      justify="center"
      _hover={{
        bg:
          item.inProgress || item.comingSoon
            ? "#131313"
            : "rgba(255,255,255,0.03)",
      }}
      cursor={item.inProgress || item.comingSoon ? "default" : "pointer"}
      align="center"
      pos="relative"
      h="142px"
      borderColor={borderPrimary}
      opacity={item.inProgress || item.comingSoon ? "0.4" : "1"}
    >
      <Flex overflow="hidden" boxSize="48px" borderRadius="50%">
        <Image
          filter={item.inProgress || item.comingSoon ? "grayscale(1)" : "none"}
          boxSize="48px"
          src={`/assets/icons/dashboard/${item.iconUrl}`}
        />
      </Flex>
      <Flex
        mt="10px"
        justify="center"
        fontSize="12px"
        fontFamily="Inter"
        color={textSecondary}
      >
        {item.description}
      </Flex>
      <Flex
        justify="center"
        fontSize="14px"
        fontFamily="Inter"
        fontWeight="400"
        color={textPrimary}
      >
        {item.name}
      </Flex>
      {(item.comingSoon || item.inProgress || item.new) && (
        <Flex
          pos="absolute"
          w="100%"
          h="15px"
          bottom="-8px"
          justifyContent={"center"}
        >
          <Flex
            h="15px"
            color={item.inProgress ? "black" : "white"}
            bg={
              item.inProgress
                ? "white"
                : item.new
                  ? "brandSecondary.500"
                  : "#302F2F"
            }
            paddingX="6px"
            fontWeight={600}
            fontFamily="Inter"
            textTransform="uppercase"
            fontSize="9px"
            align="center"
            justify="center"
            borderRadius="4px"
          >
            {item.inProgress ? "In progress" : item.new ? "new" : "soon"}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export const PlatformProducts = () => {
  return (
    <Flex flexDir="column" mt="0px">
      {/* <Flex fontSize="20px" mb="14px" fontFamily="Inter" fontWeight="400">
        Platform products
      </Flex> */}
      <Grid templateColumns={"repeat(9, 1fr)"} gap="12px">
        {PLATFORM_PRODUCTS.map((item) => (
          <ProductItem item={item} />
        ))}
      </Grid>
    </Flex>
  );
};
