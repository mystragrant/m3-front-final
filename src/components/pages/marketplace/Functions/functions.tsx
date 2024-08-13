import { Grid, Flex, Box, Image } from "@chakra-ui/react";
import { CenterSectionHeader } from "../../../shared/typography/CenterSectionHeader";

const FunctionItem = ({
  label,
  description,
  icon,
}: {
  label: string;
  description: string;
  icon: string;
}) => {
  return (
    <Flex flexDir="column" gridGap="20px" alignItems="center" color="black">
      <Image maxW="80px" src={icon} />
      <Box fontSize="20px" lineHeight="110%" fontWeight="600">
        {label}
      </Box>
      <Box color="#515151" textAlign="center" fontSize="18px">
        {description}
      </Box>
    </Flex>
  );
};

interface FeatureItem {
  label: string;
  description: string;
  icon: string;
}

const items: FeatureItem[] = [
  {
    label: "Drops",
    description: "Purchase NFTs that are directly sold by top Creators",
    icon: "/assets/images/sample-avatar.png",
  },
  {
    label: "Marketplace",
    description: "Bid on and auction off rare digital collectibles",
    icon: "/assets/images/sample-avatar.png",
  },
  {
    label: "Create",
    description: "Mint your own creations into NFTs",
    icon: "/assets/images/sample-avatar.png",
  },
  {
    label: "My Galleries",
    description: "A digital gallery to showcase your collection",
    icon: "/assets/images/sample-avatar.png",
  },
];

export const Functions = () => {
  return (
    <Grid>
      <CenterSectionHeader heading="Featured functions" />
      <Grid
        templateColumns="1fr 1fr 1fr 1fr"
        gap="40px"
        justifyContent="center"
        alignItems="flex-start"
      >
        {items.map((item) => {
          return (
            <FunctionItem
              label={item.label}
              description={item.description}
              icon={item.icon}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};
