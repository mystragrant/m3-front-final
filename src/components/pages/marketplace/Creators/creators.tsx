import { Grid, Button } from "@chakra-ui/react";
import { CenterSectionHeader } from "../../../shared/typography/CenterSectionHeader";
import { Creator } from "./creator";

export const Creators = () => {
  return (
    <Grid>
      <CenterSectionHeader
        heading={"Featured Creators"}
        description={"Introducing the best digital creators"}
      />
      <Grid gap="8px" position="relative" templateColumns="1fr 1fr 1fr 1fr">
        <Creator
          background="/assets/images/login-art.png"
          avatar="/assets/images/sample-avatar.png"
          collections={34}
          nftAmount={1442}
          verified={true}
          name="Minister"
        />
        <Creator
          background="/assets/images/login-art.png"
          avatar="/assets/images/sample-avatar.png"
          collections={34}
          nftAmount={1442}
          verified={true}
          name="Minister"
        />
        <Creator
          background="/assets/images/login-art.png"
          avatar="/assets/images/sample-avatar.png"
          collections={34}
          nftAmount={1442}
          verified={true}
          name="Minister"
        />
        <Creator
          background="/assets/images/login-art.png"
          avatar="/assets/images/sample-avatar.png"
          collections={34}
          nftAmount={1442}
          verified={false}
          name="Ministrant"
        />
      </Grid>
      <Button
        justifySelf="center"
        fontSize="18px"
        lineHeight="120%"
        padding="20px 34px"
        bg="white"
        mt="50px"
        color="black"
        border="1px solid black"
      >
        See our Creators
      </Button>
    </Grid>
  );
};
