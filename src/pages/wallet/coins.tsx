import { PageContainer } from "../../components/shared/containers/pageContainer";
import { useUserProvider } from "../../providers/User/userProvider";
import { usePrivatePage } from "../../hooks/usePrivatePage";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { CoinTransferModal } from "../../components/pages/wallet/coins/CoinTransferModal/coinTransferModal";
import { ethers } from "ethers";
import { ReceiveCoinsModal } from "../../components/pages/wallet/coins/ReceiveCoinsModal/receiveCoinsModal";
import { TabSelect } from "../../components/shared/inputs/TabSelect/tabSelect";
import { useChainFilter } from "../../providers/ChainFilter/useChainFilter";

export interface ICoinData {
  native: boolean;
  address?: string;
  symbol: string;
  name: string;
  network: string;
  balance: number;
  decimals: number;
  ratioToUSD: number;
  iconUrl?: string;
}

const CoinItem = ({
  data,
  handleHide,
}: {
  data: ICoinData;
  handleHide: (coinData: ICoinData) => void;
}) => {
  const {
    borderPrimary,
    backgroundSecondary,
    backgroundTertiary,
    textSecondary,
  } = useThemeProvider();

  const {
    isOpen: isTransferOpen,
    onOpen: onTransferOpen,
    onClose: onTransferClose,
  } = useDisclosure();
  const {
    isOpen: isReceiveOpen,
    onOpen: onReceiveOpen,
    onClose: onReceiveClose,
  } = useDisclosure();

  return (
    <>
      <CoinTransferModal
        coinData={data}
        onClose={onTransferClose}
        onOpen={onTransferOpen}
        isOpen={isTransferOpen}
      />
      <ReceiveCoinsModal
        coinData={data}
        onClose={onReceiveClose}
        onOpen={onReceiveOpen}
        isOpen={isReceiveOpen}
      />

      <Flex
        fontFamily="Inter"
        role="group"
        justify="space-between"
        bg={backgroundTertiary}
        _hover={{ bg: backgroundSecondary }}
        align="center"
        border="1px solid"
        borderColor={borderPrimary}
        borderRadius="4px"
        p="8px 24px"
      >
        <Grid
          alignItems="center"
          fontSize="14px"
          templateColumns="repeat(4,170px)"
        >
          <Flex gap="7px" align="center">
            <Image
              src={`/assets/icons/coins/${data.iconUrl ?? "unknown.svg"}`}
              fallbackSrc={"/assets/icons/coins/unknown.svg"}
            />
            <Flex flexDir="column">
              <Box fontWeight="bold" fontSize="14px" fontFamily="Inter">
                {data.symbol}
              </Box>
              <Box fontSize="10px" fontFamily="Inter" color={textSecondary}>
                {data.name}
              </Box>
            </Flex>
          </Flex>
          <Box textTransform="capitalize">{data.network}</Box>
          <Box>{data.balance}</Box>
          <Box>${data.balance * data.ratioToUSD}</Box>
        </Grid>
        <Flex></Flex>
        <Menu>
          <MenuList>
            <MenuItem onClick={onTransferOpen}>Transfer</MenuItem>
            <MenuItem onClick={() => handleHide(data)}>Hide</MenuItem>
            <MenuItem onClick={onReceiveOpen}>Receive</MenuItem>
          </MenuList>
          <MenuButton>
            <Flex
              fontSize="14px"
              display="none"
              _groupHover={{ display: "flex" }}
            >
              Manage
            </Flex>
          </MenuButton>
        </Menu>
      </Flex>
    </>
  );
};

const getTokens = async (
  id: number,
  searchstring: string,
  chains: [],
  tab: string,
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        totalItems: 500,
        items: [
          {
            native: true,
            symbol: "CSPR",
            name: "Casper",
            network: "casper",
            decimals: 18,
            ratioToUSD: 1432.54,
            balance: 1000,
          },
          {
            native: true,
            symbol: "ETH",
            name: "Ethereum",
            network: "ethereum",
            decimals: 18,
            ratioToUSD: 1432.54,
            balance: 1000,
          },
          {
            native: true,
            symbol: "BNB",
            name: "BNB Coin",
            network: "bsc",
            decimals: 18,
            ratioToUSD: 1432.54,
            balance: 1500,
          },
          {
            native: true,
            symbol: "ANV",
            name: "Anvil Testnet",
            network: "anvil",
            decimals: 18,
            ratioToUSD: 1432.54,
            balance: 1500,
          },
          {
            native: false,
            address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
            symbol: "TST",
            name: "Test Token",
            network: "anvil",
            decimals: 18,
            ratioToUSD: 0.153,
            balance: 1500,
          },
        ],
      });
    }, 500);
  });
};

export const CoinPage = () => {
  const { id } = useUserProvider();

  const [searchString, setSearchString] = useState<string>("");
  const [coinsData, setCoinsData] = useState<ICoinData[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [filter, setFilter] = useState<string>("all");

  const { availableChains } = useChainFilter();

  useEffect(() => {
    setLoading(true);
    setError(false);
    setCoinsData(null);

    getTokens(id, "", [], "all")
      .then((res: any) => {
        setCoinsData(res.items);
      })
      .catch((e) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchString, filter, availableChains]);

  const handleSearchStringChange = (value: string) => {
    setSearchString(value);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleHideToggle = (coin: ICoinData) => {
    if (coinsData) {
      setCoinsData((current) =>
        current!.filter(
          (item) =>
            item.network !== coin.network || item.address !== coin.address,
        ),
      );
    }
  };

  usePrivatePage();

  return (
    <PageContainer gap="24px">
      <Grid templateColumns="1fr auto" gap="24px">
        <TabSelect
          onChange={handleFilterChange}
          options={[
            { value: "all", label: "All Items" },
            { value: "hidden", label: "Hidden" },
          ]}
        />
      </Grid>
      {coinsData ? (
        coinsData.length > 0 ? (
          <Flex flexDir="column" gap="8px">
            {coinsData.map((coin) => {
              return <CoinItem handleHide={handleHideToggle} data={coin} />;
            })}
          </Flex>
        ) : (
          <Box>No items found</Box>
        )
      ) : null}
      {error && <Box>Error</Box>}
      {loading && (
        <Box>
          <Spinner />
        </Box>
      )}
    </PageContainer>
  );
};
