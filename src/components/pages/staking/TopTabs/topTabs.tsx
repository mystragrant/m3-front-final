import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

const NetworkItem = ({
  name,
  soon,
  icon,
  selected,
}: {
  name: string;
  soon?: boolean;
  icon: string;

  selected?: boolean;
}) => {
  const { borderPrimary, backgroundSecondary, textSecondary } =
    useThemeProvider();

  return (
    <Flex
      padding="19px 25px"
      borderRadius="8px"
      border="1px solid"
      bg={soon ? backgroundSecondary : "transparent"}
      cursor={soon ? "default" : "pointer"}
      borderColor={selected ? "brand.500" : borderPrimary}
      align="center"
      color={soon ? textSecondary : "auto"}
    >
      <Image
        filter={soon ? "grayscale(1)" : "none"}
        boxSize="35px"
        borderRadius="50%"
        src={icon}
      />
      <Flex ml="12px" fontSize="14px">
        {name}
      </Flex>
      {soon && (
        <Box
          margin="auto"
          fontSize="12px"
          fontWeight="300"
          mr="0"
          justifySelf="flex-end"
        >
          Coming soon
        </Box>
      )}
      {selected && (
        <CheckIcon
          margin="auto"
          mr="0"
          justifySelf="flex-end"
          color="brand.500"
        />
      )}
    </Flex>
  );
};

export const TopTabs = () => {
  return (
    <Grid templateColumns="1fr 1fr 1fr 1fr" gap="8px">
      <NetworkItem
        name={"Casper Network"}
        icon={"/assets/icons/staking/casper.svg"}
        selected={true}
      />
      <NetworkItem
        name={"Ethereum"}
        icon={"/assets/icons/staking/ethereum.svg"}
        selected={false}
        soon={true}
      />
      <NetworkItem
        name={"BSC"}
        icon={"/assets/icons/staking/bnb.svg"}
        selected={false}
        soon={true}
      />
      <NetworkItem
        name={"Polygon"}
        icon={"/assets/icons/staking/polygon.svg"}
        selected={false}
        soon={true}
      />
    </Grid>
  );
};
