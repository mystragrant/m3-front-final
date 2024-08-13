import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { abbrNum } from "../../../../../utils";
import { MultichainIcon } from "../../../../shared/display/MultichainIcon/multichainIcon";

const CsprValueItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <Flex flexDir="column" gap="0px">
      <Box fontSize="12px" color="#DBDCE1" fontFamily="Inter" fontWeight="300">
        {label}:
      </Box>
      <Flex fontFamily="Space Mono" align="center" gap="10px">
        {" "}
        {abbrNum(value)} <MultichainIcon chain="casper" size={20} />
      </Flex>
    </Flex>
  );
};

export const CollectionItem = ({
  creatorName,
  creatorAvatar,
  creatorVerified,
  title,
  coverImage,
  floor,
  volume,
  address,
}: {
  creatorName: string;
  creatorAvatar: string;
  creatorVerified: boolean;
  title: string;
  coverImage: string;
  floor: number;
  volume: number;
  address: string;
}) => {
  const navigate = useNavigate();

  return (
    <Flex
      padding="22px 22px 28px"
      pos="relative"
      flexDir="column"
      borderRadius="8px"
      align="flex-start"
      textDecoration="none"
      bg="#222"
      cursor="pointer"
      justify="space-between"
      bgPos="center"
      onClick={() => navigate("/marketplace/casper-test/" + address)}
      bgSize="cover"
      bgImage={coverImage}
    >
      <Box></Box>
      <Flex pos="absolute" top="24px" right="20px">
        <MultichainIcon chain="casper" size={30} />
      </Flex>
      <Flex flexDir="column" fontFamily="Inter" zIndex="1">
        <Box fontWeight="300" fontSize="12px" lineHeight="100%">
          Collections
        </Box>
        <Box fontSize="20px" lineHeight="150%">
          {title}
        </Box>
        {/* <Flex gap="28px" mt="8px">
          <CsprValueItem label="Volume" value={volume} />
          <CsprValueItem label="Floor" value={floor} />
        </Flex> */}
      </Flex>
      <Flex
        pos="absolute"
        zIndex="0"
        bottom="0"
        w="100%"
        h="60%"
        bg="linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)"
        left="0"
        borderBottomRadius="inherit"
      ></Flex>
    </Flex>
  );
};
