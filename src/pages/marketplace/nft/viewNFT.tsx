import { Box, Flex, Grid } from "@chakra-ui/react";
import { DropdownItem } from "../../../components/pages/viewNFT/DropdownItem/dropdownItem";
import { NFTDetailsList } from "../../../components/pages/viewNFT/NFTDetailsList/nftDetailsList";
import { NFTHeader } from "../../../components/pages/viewNFT/NFTHeader/nftHeader";
import { NFTImageZoomable } from "../../../components/pages/viewNFT/NFTImageZoomable/nftImageZoomable";
import { PageContainer } from "../../../components/shared/containers/pageContainer";
import { TraitItem } from "../../../components/shared/TraitItem/traitItem";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export const ViewNFTPage = () => {
  const { textSecondary } = useThemeProvider();

  return (
    <>
      <Grid templateColumns="1fr 1.4fr" gap="70px">
        <Flex flexDir="column" gap="44px" pos="relative">
          <NFTImageZoomable url={"/assets/images/nft-mocks/ticket.png"} />
        </Flex>
        <Flex flexDir="column" gap="40px">
          <NFTHeader
            name="Mystra Ticket"
            tokenId="1054"
            collection="Mystra Tickets"
            viewCount={0}
            verified={false}
            chainId="casper"
            address="0x9b0c5497a2c17B5892EACC81b62e83d7bce0a7fB"
          />
          <Flex flexDir="column" gap="24px">
            <DropdownItem header={"Description"}>
              <Box lineHeight="22px" fontSize="14px" color={textSecondary}>
                Gain access to the mystra.io platform, earn points, and receive
                allocations in incubated projects. Ticket holders have full
                access to platform functionalities and the right to vote in DAO
                decisions regarding the development of the platform and
                incubated projects. Tickets can optionally be burned to exchange
                them for MYSTRA platform tokens.
              </Box>
            </DropdownItem>
            <DropdownItem header={"Details"}>
              <NFTDetailsList
                network={"Casper"}
                tokenId="1054"
                contractAddress="0x9b0c5497a2c17B5892EACC81b62e83d7bce0a7fB"
              />
            </DropdownItem>
            <DropdownItem header={"Attributes"}>
              <Grid
                templateColumns="1fr 1fr 1fr"
                w="100%"
                gap="16px"
                templateRows="1fr 1fr"
              >
                <TraitItem
                  label="Platform Access"
                  value="Full"
                  description="100% of items"
                />
                <TraitItem
                  label="Voting rights"
                  value="True"
                  description="100% of items"
                />
                <TraitItem
                  label="Burnable"
                  value="True"
                  description="100% of items"
                />
                <TraitItem
                  label="Transferable"
                  value="True"
                  description="100% of items"
                />
                <TraitItem
                  label="Resalable"
                  value="True"
                  description="100% of items"
                />
              </Grid>
            </DropdownItem>
          </Flex>
          <DropdownItem header={"About Mystra Tickets collection"}>
            <Box lineHeight="22px" fontSize="14px" color={textSecondary}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              cursus porttitor feugiat. In semper, ligula a maximus maximus,
              ante quam tempor massa, ut sodales ante diam vel justo. Nunc non
              tempor est. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Sed vehicula varius
              diam, et iaculis sapien imperdiet non. Phasellus porttitor, lacus
              nec commodo tincidunt, ex velit sollicitudin leo, ullamcorper
              facilisis mi odio vel felis. Etiam eget dapibus libero. Nulla sit
              amet tellus ac tellus dignissim imperdiet.
            </Box>
          </DropdownItem>
        </Flex>
      </Grid>
    </>
  );
};
