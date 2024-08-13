import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Spinner,
  keyframes,
  useDisclosure,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { Calculator } from "../../components/pages/staking/Calculator/calculator";
import { Delegators } from "../../components/pages/staking/Delegators/delegators";
import { MyDelegations } from "../../components/pages/staking/MyDelegations/myDelegations";
import { NodeDetails } from "../../components/pages/staking/NodeDetails/nodeDetails";
import { StakeForm } from "../../components/pages/staking/StakeForm/stakeForm";
import { TopTabs } from "../../components/pages/staking/TopTabs/topTabs";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { TabContainer } from "../../components/shared/containers/tabContainer";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { CustomSelect } from "../../components/shared/inputs/CustomSelect/customSelect";
import { useEffect, useRef, useState } from "react";
import { ERC20_ABI, TICKET_ABI } from "./abis";
import { ethers } from "ethers";
import { TxType, useTxQueue } from "../../providers/useTxQueue/useTxQueue";
import { useScrollDirection } from "use-scroll-direction";
import ReactPageScroller from "react-page-scroller";
import { useDashboardProvider } from "../../providers/Dashboard/useDashboard";
import { DropdownContainer } from "../../components/shared/containers/dropdownContainer";
import axios from "axios";
import { MYSTRA_API_URL, NETWORK_NAME, isTestnet } from "../../constants";
import { RoundItem } from "./roundItem";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";
import { buildTransferDeploy } from "../../services/casper";
import { useMultiWalletProvider } from "../../providers/MultiWalletProvider/multiWalletProvider";
import { useUserProvider } from "../../providers/User/userProvider";
import { useNavigate } from "react-router";
import {
  NETWORK,
  WalletSelector,
} from "../../components/shared/WalletSelector/walletSelector";
import { NETWORK_TYPE } from "../profile/WalletItem/walletItem";
import { contractCallFn } from "casper-js-client-helper/dist/helpers/lib";
import CountUp from "react-countup";

const spinTwo = keyframes`
  0% { transform: scale(1.2); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1.2); }

`;

const spinOne = keyframes`
0% { transform: scale(0.9); }
50% { transform: scale(1.2); }
100% { transform: scale(0.9); }
`;

const NETWORK_DATA = {
  42161: {
    address: "0x18b9F2EBA21FD61902622d6883BC068385Fb551D",
    name: "ARBITRUM",
    icon: "/public/assets/icons/erc20/arbitrum.svg",
    currencies: [
      {
        symbol: "USDT",
        icon: "assets/icons/erc20/tether.svg",
        address: "0x18b9F2EBA21FD61902622d6883BC068385Fb551D",
      },
      {
        symbol: "USDC",
        icon: "/assets/icons/erc20/usdc.svg",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      },
    ],
  },
  25: {
    address: "0x18b9F2EBA21FD61902622d6883BC068385Fb551D",
    name: "CRONOS",
    icon: "/public/assets/icons/erc20/CRONOS.svg",

    currencies: [
      {
        symbol: "USDT",
        icon: "/assets/icons/erc20/tether.svg",
        address: "0x66e428c3f67a68878562e79A0234c1F83c208770",
      },
      {
        symbol: "USDC",
        icon: "/assets/icons/erc20/usdc.svg",
        address: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
      },
    ],
  },
  137: {
    address: "0x8b536DB22a546f1B07948A5C35c1688aB0f3eB9c",
    name: "POLYGON",
    icon: "/assets/icons/erc20/polygon.svg",

    currencies: [
      {
        symbol: "USDT",
        icon: "/assets/icons/erc20/tether.svg",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      },
      {
        symbol: "USDC",
        icon: "/assets/icons/erc20/usdc.svg",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      },
    ],
  },
  1: {
    address: "0x18b9F2EBA21FD61902622d6883BC068385Fb551D",
    icon: "/assets/icons/erc20/Ethereum.svg",

    name: "ETH",
    currencies: [
      {
        symbol: "USDT",
        icon: "/assets/icons/erc20/tether.svg",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      {
        symbol: "USDC",
        icon: "/assets/icons/erc20/usdc.svg",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
    ],
  },
  9999999666: {
    address: "casper-address",
    icon: "/assets/icons/erc20/casper.svg",

    name: "CASPER",
    currencies: [
      {
        symbol: "CSPR",
        address: "address",
        icon: "/assets/icons/erc20/casper.svg",
      },
    ],
  },
  56: {
    address: "0xc3e9D052720aEe3E0AcE5209F9d3BDACaDf30AbD",
    name: "BSC",
    icon: "/public/assets/icons/erc20/BNB.svg",
    currencies: [
      {
        symbol: "BUSD",
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        icon: "/assets/icons/erc20/busd.svg",
      },
      {
        symbol: "USDC",
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        icon: "/assets/icons/erc20/usdc.svg",
      },
      {
        symbol: "BSC-USD",
        address: "0x55d398326f99059fF775485246999027B3197955",
        icon: "/assets/icons/erc20/bnb.svg",
      },
    ],
  },
};

const ProfitItem = ({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <Flex
      h="40px"
      borderRadius="40px"
      bg={disabled ? "#222F2B11" : "#54E2B711"}
      align="center"
      color={disabled ? "#5E726C" : "brandSecondary.500"}
      fontFamily="Inter"
      fontSize="14px"
      textTransform="uppercase"
      border={disabled ? "1px solid" : "2px solid"}
      px="20px"
      borderColor={disabled ? "#222F2B" : "brandSecondary.500"}
    >
      {children}
    </Flex>
  );
};

export const BuyTicketPage = () => {
  const {
    backgroundPrimary,
    borderPrimary,
    textSecondary,
    backgroundTertiary,
    backgroundSecondary,
  } = useThemeProvider();

  const [selectedChainId, setSelectedChainId] = useState<number>(9999999666);

  const [selectedNetworkData, setSelectedNetworkData] = useState<any>(null);

  const [selectedCoinAddress, setSelectedCoinAddress] = useState<string>("");
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState<string>("");

  const [amount, setAmount] = useState<number>(1);

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spinOne} infinite 5s linear`;

  const animationTwo = prefersReducedMotion
    ? undefined
    : `${spinTwo} infinite 5s linear`;

  useEffect(() => {
    if (amount > 100) {
      setAmount(100);
    }
    if (amount < 0) {
      setAmount(1);
    }
  }, [amount]);

  useEffect(() => {
    setSelectedNetworkData((NETWORK_DATA as any)[selectedChainId]);
    setSelectedCoinAddress(
      (NETWORK_DATA as any)[selectedChainId].currencies[0].address,
    );
    setSelectedCoinSymbol(
      (NETWORK_DATA as any)[selectedChainId].currencies[0].symbol,
    );
  }, [selectedChainId]);

  const {
    signCasper,
    putDeployUniversal,
    requestConnection,
    getCasperKey,
    selectedCasperProvider,
  } = useMultiWalletProvider();
  const { isLogged, casper_public_key_wallet, evm_wallet } = useUserProvider();
  const { addToQueue, pushToDeleteQueue } = useTxQueue();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alreadyClicked, setAlreadyClicked] = useState<boolean>(false);

  const [processing, setProcessing] = useState<boolean>();

  const payWithEVM = async () => {
    if (true) {
      setProcessing(true);
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + selectedChainId.toString(16) }], // chainId must be in hexadecimal numbers
      });
      try {
        if (true) {
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum,
          );
          const ticketContract = new ethers.Contract(
            selectedNetworkData.address,
            TICKET_ABI,
            provider.getSigner(),
          );

          const paymentContract = new ethers.Contract(
            selectedCoinAddress,
            ERC20_ABI,
            provider.getSigner(),
          );

          const decimals = await paymentContract.decimals();
          const price = await ticketContract.currentPrice();

          const userAddress = await provider.getSigner().getAddress();
          // const userBalance = await paymentContract.balanceOf(userAddress);

          // const ticketsBoughtByUser = await ticketContract.ticketsBoughtByUser(
          //   await provider.getSigner().getAddress()
          // );

          // if (Number(ticketsBoughtByUser) + Number(amount) > 100) {
          //   throw Error();
          // }

          // if (
          //   Number(ethers.utils.formatUnits(userBalance.toString(), decimals)) <
          //   Number(amount) * Number(price)
          // ) {
          //   throw Error();
          // }

          const txOne = await paymentContract.approve(
            selectedNetworkData.address,
            ethers.utils.parseUnits(
              (Number(amount) * Number(price)).toString(),
              decimals,
            ),
          );

          addToQueue(
            txOne.hash,
            "Approve " + selectedCoinSymbol,
            "",
            selectedChainId.toString(),
            TxType.APPROVE,
            selectedNetworkData.address,
          );

          console.log(txOne);

          await txOne.wait();

          pushToDeleteQueue(txOne.hash);

          console.log(ticketContract);

          const txTwo = await ticketContract.buyTickets(
            amount,
            selectedCoinAddress,
          );
          await txTwo.wait();
        }
      } catch (e) {
        console.log(e);
        setProcessing(false);
      }
    }
  };

  const payWithCasper = async () => {
    if (selectedCasperProvider == null) {
      onOpen();
      setAlreadyClicked(true);
    }
    try {
      await getCasperKey();

      const deploy = buildTransferDeploy(
        CLPublicKey.fromHex(casper_public_key_wallet),
        CLPublicKey.fromHex(
          "020377bc3ad54b5505971e001044ea822a3f6f307f8dc93fa45a05b7463c0a053bed",
        ),
        Math.floor(currentPrice / cspr_price) * amount - 1450,
        0,
        2.5,
        NETWORK_NAME,
      );

      const jsonDeploy = DeployUtil.deployToJson(deploy);

      signCasper(jsonDeploy).then((signature: any) => {
        putDeployUniversal(signature, deploy, casper_public_key_wallet).then(
          (signed) => {
            addToQueue(
              signed,
              "Mint Ticket",
              amount.toString(),
              NETWORK_NAME,
              TxType.TRANSFER_ERC,
              "",
            );
          },
        );
      });
    } catch (e) {
      await requestConnection();
      onOpen();
    }
  };

  const [ticketCount, setTicketCount] = useState<number>(0);

  useEffect(() => {
    if (selectedCasperProvider != null && alreadyClicked) {
      payWithCasper();
    }
  }, [selectedCasperProvider, alreadyClicked]);

  useEffect(() => {
    axios.get(`${MYSTRA_API_URL}/getalltickets`).then((res) => {
      let sum = 0;
      sum += res.data.total_public_round1_tickets;
      sum += res.data.total_public_round2_tickets;
      sum += res.data.total_public_round3_tickets;
      sum += res.data.total_public_round4_tickets;
      setTicketCount(sum);
    });
  }, []);

  const [currentPrice, setCurrentPrice] = useState<number>(50);

  const elementRef = useRef(null);

  const { cspr_price } = useDashboardProvider();

  const [openedFaq, setOpenedFaq] = useState<number>();

  const navigate = useNavigate();

  const handleBuy = () => {
    if (selectedCoinSymbol == "CSPR") {
      payWithCasper();
    } else {
      payWithEVM();
    }
  };

  const [evmNetwork, setEvmNetwork] = useState<string>("");

  useEffect(() => {
    setEvmNetwork((window as any).ethereum.networkVersion);
  }, [(window as any).ethereum.networkVersion]);

  const containerRef = useRef(null);

  const [page, setPage] = useState<number>(1);

  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current != null && !hovering) {
        //alert((containerRef as any).current.scrollTop);
        if (
          (containerRef as any).current.scrollTop + window.innerHeight >
          (containerRef as any).current.scrollHeight
        ) {
          (containerRef as any).current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          (containerRef as any).current.scrollTo({
            top: (containerRef as any).current.scrollTop + window.innerHeight,
            behavior: "smooth",
          });
        }

        setPage((prev) => prev + 1);
        if (page > 1) {
          setPage(0);
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [containerRef, page, hovering]);

  return (
    <PageContainer noBottomMargin noTopMargin>
      <Grid templateColumns="450px 1fr" gap="60px">
        <Grid templateRows="1fr auto">
          <Flex flexDir="column" mt="40px" zIndex="1" pos="relative">
            <Flex
              justify="space-between"
              align="center"
              fontSize="24px"
              mb="10px"
              fontFamily="Inter"
            >
              Mint NFT Ticket
              <Box fontSize="12px" textTransform="uppercase" fontFamily="Inter">
                Round 1 left:{" "}
                <Box
                  fontFamily="Space Mono"
                  fontSize="20px"
                  display="inline"
                  color="brandSecondary.500"
                >
                  <CountUp start={2000} end={2000 - ticketCount}></CountUp>
                </Box>
              </Box>
            </Flex>
            <Flex flexDir="column" gap="20px ">
              <Flex flexDir="column">
                <Grid
                  templateColumns="3fr 4.5fr 8.5fr 10.5fr"
                  my="20px"
                  gap="6px"
                >
                  <RoundItem
                    index={1}
                    price={50}
                    percent={0}
                    max={2000}
                    currentSold={ticketCount}
                    previousMax={0}
                  />
                  <RoundItem
                    index={2}
                    price={80}
                    percent={0}
                    max={4500}
                    currentSold={ticketCount}
                    previousMax={2000}
                  />

                  <RoundItem
                    index={3}
                    price={130}
                    percent={0}
                    max={8500}
                    currentSold={ticketCount}
                    previousMax={6500}
                  />
                  <RoundItem
                    index={4}
                    price={230}
                    percent={0}
                    max={12500}
                    currentSold={ticketCount}
                    previousMax={15000}
                  />
                </Grid>
              </Flex>
              <Grid
                templateColumns={{ base: "1fr 1fr", "2xl": "1fr" }}
                gap="16px"
              >
                <Flex flexDir="column">
                  <Box fontSize="14px " fontFamily="Inter" mb="8px">
                    Select blockchain
                  </Box>
                  <CustomSelect
                    small
                    heading="Select chain"
                    selectedValue={selectedChainId}
                    onChange={(val: any) => {
                      setSelectedChainId(val);
                    }}
                    items={[
                      {
                        value: 9999999666,
                        icon: "/assets/icons/erc20/casper.svg",
                        label: "Casper",
                      },
                      {
                        value: 1,
                        icon: "/assets/icons/erc20/ethereum.svg",
                        label: "Ethereum",
                      },
                      {
                        value: 137,
                        icon: "/assets/icons/erc20/polygon.svg",
                        label: "Polygon",
                      },
                      {
                        value: 56,
                        icon: "/assets/icons/erc20/bnb.svg",
                        label: "Binance",
                      },
                      {
                        value: 25,
                        icon: "/assets/icons/erc20/cronos.svg",
                        label: "Cronos",
                      },
                      {
                        value: 42161,
                        icon: "/assets/icons/erc20/arbitrum.svg",
                        label: "Arbitrum",
                      },
                    ]}
                  />
                </Flex>
                <Flex flexDir="column">
                  <Box fontSize="14px " fontFamily="Inter" mb="8px">
                    Payment token
                  </Box>
                  <CustomSelect
                    small
                    heading="Select chain"
                    selectedValue={selectedCoinAddress}
                    onChange={(val: any) => setSelectedCoinAddress(val)}
                    items={(NETWORK_DATA as any)[
                      selectedChainId
                    ].currencies.map((item: any) => {
                      return {
                        label: item.symbol,
                        value: item.address,
                        icon: item.icon,
                      };
                    })}
                  />
                </Flex>
              </Grid>
            </Flex>

            <Flex flexDir="column" mt="16px">
              <Box fontSize="14px " fontFamily="Inter" mb="8px">
                Amount you want to mint
              </Box>
              <Grid templateColumns={"50px auto 50px"} gap="8px" h="50px">
                <Button
                  bg={backgroundTertiary}
                  border="1px solid"
                  borderColor={borderPrimary}
                  h="50px"
                  color="white"
                  fontSize="24px"
                  lineHeight="100%"
                  onClick={() =>
                    amount > 1 ? setAmount((prev) => prev - 1) : null
                  }
                  fontFamily="Inter"
                  fontWeight="300"
                >
                  <Box mb="3px">-</Box>
                </Button>
                <Input
                  textAlign="center"
                  h="50px"
                  value={amount.toString()}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  bg={backgroundTertiary}
                  borderColor={borderPrimary}
                />
                <Button
                  fontSize="24px"
                  lineHeight="100%"
                  fontFamily="Inter"
                  fontWeight="300"
                  bg={backgroundTertiary}
                  color="white"
                  h="50px"
                  border="1px solid"
                  onClick={() =>
                    amount < 100 ? setAmount((prev) => prev + 1) : null
                  }
                  borderColor={borderPrimary}
                >
                  <Box mb="3px" color="brandSecondary.500">
                    +
                  </Box>
                </Button>
              </Grid>
            </Flex>

            <Box
              boxSize="500px"
              pos="fixed"
              zIndex="-1"
              right="40%"
              top="100px"
              bottom="0"
              margin="auto"
              bg="white"
              pointerEvents="none"
              filter="blur(150px)"
              borderRadius="50%"
              opacity="0.03"
            ></Box>
          </Flex>
          <Flex flexDir="column" pb="40px">
            <Flex justifyContent="Space-between" mt="10px" align="center">
              <Box fontFamily="Inter" fontSize="14px">
                Total sum to pay
              </Box>
              <Flex flexDir="column" align="flex-end" justify="center">
                <Flex align="flex-end" gap="4px">
                  <Box fontSize="24px" fontFamily="Space Mono">
                    {selectedCoinSymbol == "CSPR"
                      ? Math.floor(currentPrice / cspr_price) * amount
                      : amount * currentPrice}
                  </Box>
                  <Box mb="2px" fontFamily="Inter" fontSize="18px">
                    {selectedCoinSymbol}
                  </Box>
                </Flex>
                <Flex
                  fontFamily="Space Mono"
                  fontSize="12px"
                  color={textSecondary}
                >
                  $ {amount * currentPrice}.00
                </Flex>
              </Flex>
            </Flex>
            {isLogged ? (
              <Button
                onClick={
                  (selectedCoinSymbol == "CSPR" &&
                    casper_public_key_wallet == "") ||
                  evm_wallet == ""
                    ? () => navigate("/account/verification")
                    : handleBuy
                }
                disabled={processing}
                mt="16px"
                bg="#EFEFEF"
                color="black"
                fontWeight="400"
              >
                {selectedCoinSymbol == "CSPR" &&
                casper_public_key_wallet == "" ? (
                  "Link Casper Account First"
                ) : evm_wallet == "" ? (
                  "Link Ethereum Wallet First"
                ) : processing ? (
                  <Spinner />
                ) : (
                  "Mint Tickets"
                )}
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/buy-ticket?login=true")}
                mt="16px"
                bg="#EFEFEF"
                color="black"
                fontWeight="400"
              >
                Log In first
              </Button>
            )}
          </Flex>
        </Grid>
        <Flex
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          flexDir="column"
          h="calc(100vh - 74px)"
          overflowY="scroll"
          ref={containerRef}
          minH="calc(100vh - 74px)"
          scrollSnapType={"y mandatory"}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
        >
          <Flex
            minH="calc(100vh - 74px)"
            maxH="calc(100vh - 74px)"
            scrollSnapAlign={"start"}
            align="center"
            justify="center"
            flexDir="column"
          >
            <Flex
              mt="40px"
              textTransform="uppercase"
              fontSize="12px"
              color="#666666"
              opacity="0.7"
              letterSpacing={"4px"}
            >
              EXPLORE MORE WITH
            </Flex>
            <Flex fontSize="40px" fontFamily="Inter">
              Mystra NFT Ticket
            </Flex>{" "}
            <Box pos="relative" w="100%" h="60vh" pb="10vh">
              <Box
                bg="white"
                boxSize="20vh"
                filter="blur(100px)"
                top="0"
                bottom="calc(0px + 70px)"
                margin="auto"
                left="30%"
                pos="absolute"
                animation={animation}
              ></Box>
              <Box
                bg="brandSecondary.500"
                boxSize="20vh"
                filter="blur(100px)"
                top="0"
                bottom="calc(0px - 70px)"
                margin="auto"
                right="30%"
                pos="absolute"
                animation={animationTwo}
              ></Box>

              <Image
                pos="absolute"
                left="0"
                right="0"
                h="55vh"
                zIndex="1"
                margin="auto"
                src="/assets/brand/ticket.png"
              />
            </Box>
            <Flex
              h="10vh"
              mt="-25px"
              flexDir="column"
              align="center"
              gap="20px"
              pos="relative"
            >
              <Box
                h="60px"
                w="2px"
                top="-70px"
                pos="absolute"
                opacity="0.2"
                bg="linear-gradient(0deg, #FFFFFF 77.84%, rgba(255, 255, 255, 0) 100%)"
              />
              <Box
                fontFamily="Space Mono"
                textTransform="uppercase"
                fontSize="12px"
                letterSpacing={"0.1em"}
              >
                Scroll down
              </Box>
              <Box
                h="60px"
                pos="absolute"
                w="2px"
                top="30px"
                bg="linear-gradient(180deg, #54E2B7 0%, rgba(84, 226, 183, 0) 100%)"
              />
            </Flex>
          </Flex>
          <Flex
            minH="calc(100vh - 74px)"
            maxH="calc(100vh - 74px)"
            scrollSnapAlign={"start"}
            flexDir="column"
            align="center"
            justify="center"
          >
            <Flex flexDir="column" gap="10px" align="center" maxW="600px">
              <Box fontSize="24px" fontFamily="Inter" mb="20px">
                The Mystra NFT Ticket is your key to
              </Box>
              <Flex flexDir="column" gap="4px" align="center" pos="relative">
                <Box
                  bg={`linear-gradient(90deg, #111111 0%, #111111 30%, rgba(0,212,255,0) 100%)`}
                  w="80px"
                  h="100%"
                  pos="absolute"
                  left="0px"
                />
                <Box
                  bg={`linear-gradient(270deg, #111111 0%, #111111 30%, rgba(0,212,255,0) 100%)`}
                  w="160px"
                  h="100%"
                  pos="absolute"
                  right="0px"
                />
                <Flex align="center" gap="4px">
                  <ProfitItem disabled>Something</ProfitItem>
                  <ProfitItem>
                    Participating in the&nbsp;
                    <Box fontWeight="bold" color="white">
                      DAO
                    </Box>
                  </ProfitItem>

                  <ProfitItem disabled>Something</ProfitItem>
                </Flex>
                <Flex align="center" gap="4px">
                  <ProfitItem disabled>Something</ProfitItem>

                  <ProfitItem>
                    <Box fontWeight="bold" color="white">
                      Venture capital
                    </Box>
                    &nbsp; investment
                  </ProfitItem>

                  <ProfitItem disabled>Something</ProfitItem>
                </Flex>
                <Flex align="center" gap="4px">
                  <ProfitItem disabled>Something</ProfitItem>

                  <ProfitItem>
                    <Box fontWeight="bold" color="white">
                      OTC
                    </Box>
                    &nbsp; and &nbsp;
                    <Box fontWeight="bold" color="white">
                      loans
                    </Box>
                  </ProfitItem>

                  <ProfitItem disabled>Something</ProfitItem>
                </Flex>
                <Flex align="center" gap="4px">
                  <ProfitItem disabled>Something</ProfitItem>

                  <ProfitItem>
                    <Box fontWeight="bold" display="inline" color="white">
                      Creator platform
                    </Box>
                  </ProfitItem>

                  <ProfitItem disabled>Something</ProfitItem>
                </Flex>
              </Flex>

              <Box
                fontFamily="Inter"
                mt="40px"
                color={"#B7B7B7"}
                fontSize="16px"
                textAlign="center"
                lineHeight={"180%"}
              >
                Each NFT Ticket{" "}
                <Box color="white" display="inline" fontWeight="bold">
                  can be burned in the future and exchanged for Mystra tokens
                </Box>
                , but you will always need at least one ticket to access the
                functions mentioned above. The Ticket's{" "}
                <Box color="white" display="inline" fontWeight="bold">
                  value on the platform increases
                </Box>{" "}
                as new rounds of acquisition open. The maximum amount of Tickets
                that count in the DAO and VC is limited to 100 per account.
                <br />
                <br />
                <Box color="white" display="inline" fontWeight="bold">
                  The quantity of available Tickets is limited in each round.
                </Box>
              </Box>
            </Flex>
          </Flex>
          {/* <Flex
            minH="calc(100vh - 74px)"
            maxH="calc(100vh - 74px)"
            scrollSnapAlign={"start"}
            align="center"
            justify="center"
          >
            <Flex flexDir="column" gap="10px" maxW="600px" align="center">
              <Flex mt="40px" flexDir="column" gap="6px" align="center">
                <Box
                  letterSpacing="4px"
                  fontWeight="Bold"
                  fontSize="14px"
                  fontFamily="Inter"
                >
                  FAQ
                </Box>
                <Flex fontSize="24px" fontFamily="Inter">
                  Find more about Mystra Ticket
                </Flex>
                <Flex
                  w="600px"
                  mt="40px"
                  flexDir="column"
                  fontFamily="Inter"
                  color={textSecondary}
                  fontSize="16px"
                >
                  <DropdownContainer label="xD">xD</DropdownContainer>
                  <DropdownContainer label="xD">xD</DropdownContainer>
                  <DropdownContainer label="xD">xD</DropdownContainer>
                  <DropdownContainer label="xD">xD</DropdownContainer>
                  <DropdownContainer label="xD">xD</DropdownContainer>
                  <DropdownContainer label="xD">xD</DropdownContainer>
                </Flex>
              </Flex>
            </Flex>
          </Flex> */}
        </Flex>
      </Grid>
      {selectedCasperProvider == null && (
        <WalletSelector
          isOpen={isOpen}
          network={NETWORK.CASPER}
          onClose={() => {
            onClose();
          }}
        />
      )}
    </PageContainer>
  );
};
