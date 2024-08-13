import { Box, Flex, Image } from "@chakra-ui/react";
import { ShareIcon } from "../../../shared/icons/ShareIcon";
import { ShareButton } from "./ShareButton/shareButton";
import { TransferButton } from "./TransferButton/transferButton";
import { ViewsCount } from "./ViewsCount/viewsCount";

export const NFTHeader = ({
  name,
  collection,
  verified,
  address,
  chainId,
  viewCount,
  collectionImageUrl = "/assets/brand/default-avatar.jpg",
  tokenId,
}: {
  name: string;
  collection: string;
  verified: boolean;
  viewCount: number;
  address: string;
  chainId: string;
  collectionImageUrl?: string;
  tokenId: string;
}) => {
  return (
    <Flex flexDir="column">
      <Flex justifyContent="space-between" align="center">
        <Flex gap="10px" align="center">
          <Box
            bgImage={collectionImageUrl}
            borderRadius="50%"
            boxSize="24px"
            bgSize="cover"
            bgPos="center"
          />
          <Box fontSize="14px">{collection}</Box>
          <Image src="/assets/icons/verified.svg" />
        </Flex>
        <Flex gap="24px">
          <ViewsCount amount={viewCount} />
          <TransferButton />
          <ShareButton />
        </Flex>
      </Flex>
      <Flex mt="10px" fontSize="28px">
        {name} #{tokenId}
      </Flex>
    </Flex>
  );
};
