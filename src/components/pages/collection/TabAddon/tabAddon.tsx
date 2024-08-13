import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";

interface InfoItem {
  value: any;
  label: string;
}

export const TabAddon = () => {
  const [volume, setVolume] = useState<number>(0);
  const [bestOffer, setBestOffer] = useState<number>(0);
  const [floorPrice, setFloorPrice] = useState<number>(0);

  const { collectionAddress } = useParams();

  useEffect(() => {
    axios
      .get(
        "https://api.testnet.mystra.io/marketplace_stats?collection_contract_hash=" +
          collectionAddress,
      )
      .then((res) => {
        console.log(res.data);

        setBestOffer(res.data.best_offer / 100000000);
        setVolume(res.data.volume_in_cspr / 100000000);
        setFloorPrice(res.data.floor_price / 100000000);
      })
      .catch((e) => {});
  }, []);

  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <Flex gap="25px" align="center">
      {[
        {
          value: (
            <Flex align="center" gap="8px">
              <MultichainIcon size={20} chain="casper" />
              {volume}
            </Flex>
          ),
          label: "Volume",
        },
        {
          value: (
            <Flex align="center" gap="8px">
              <MultichainIcon size={20} chain="casper" />
              {floorPrice}
            </Flex>
          ),
          label: "Floor price",
        },
        {
          value: (
            <Flex align="center" gap="8px">
              <MultichainIcon size={20} chain="casper" />
              {bestOffer}
            </Flex>
          ),
          label: "Best offer",
        },
      ].map((item) => {
        return (
          <Flex fontFamily="Inter" gap="6px" fontSize="14px">
            <Box fontWeight="400" color={textPrimary}>
              {item.value}
            </Box>
            <Box fontWeight="300" color={textSecondary}>
              {item.label}
            </Box>
          </Flex>
        );
      })}
    </Flex>
  );
};
