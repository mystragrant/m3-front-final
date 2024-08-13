/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { toast } from "react-toastify";
import { toHex } from "web3-utils";
import ToastMessage from "../../../shared/ToastMessage";
import { useAllTransactions } from "../../../../hooks/bridge/useAllTransactions";
import {
  useNetworkInfo,
  useAllNetworks,
} from "../../../../hooks/bridge/useNetwork";
import { parseResponseToTransactions } from "../../../../utils";
import Transaction from "../../../../type/Transaction";
import Network from "../../../../type/Network";
import ClaimCountdown from "./ClaimCountdown";
import { Wrapper, CollapseWrap, Row, StyledClaimButton } from "./styled";
import NetworkInfo from "./NetworkInfo";
import { NATIVE_TOKEN_ADDRESS, isTestnet } from "../../../../constants";
import { useBridgeAddress } from "../../../../hooks/bridge/useBridgeAddress";
import { useBridgeContract } from "../../../../hooks/useContract";
import {
  Box,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Link,
  Th,
  Tbody,
  Select,
  useColorModeValue,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  formatTransferFormattedAmount,
  timeDifference,
  trimHash,
} from "../../../../utils/utils";
import { DefaultInput } from "../../../shared/inputs/defaultInput";
import { TransactionTableConfig } from "./config";
import { DefaultSelect } from "../../../shared/inputs/defaultSelect";
import { LoginBlockOverlay } from "../../../shared/LoginBlockOverlay/loginBlockOverlay";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { useMultiWalletProvider } from "../../../../providers/MultiWalletProvider/multiWalletProvider";

function TransactionsTable({
  onlyMyTxn = false,
}: {
  onlyMyTxn: boolean;
}): JSX.Element {
  const { evm_wallet: account } = useUserProvider();

  const [ethereum, setEthereum] = useState<any | null>(null);
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  useMemo(async () => {
    if ((window as any).ethereum) {
      setEthereum((window as any).ethereum);
      setChainId(
        Number(
          await (window as any).ethereum.request({ method: "eth_chainId" }),
        ),
      );
      (window as any).ethereum.on("chainChanged", (_chainId: string) => {
        setChainId(Number(_chainId));
      });
    }
  }, []);

  const currentNetwork = useNetworkInfo(chainId);

  const bridgeAddress = useBridgeAddress(chainId);
  const bridgeContract = useBridgeContract(bridgeAddress);

  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [claimTokenSymbol, setClaimTokenSymbol] = useState("");
  const [toNetwork, setToNetwork] = useState<Network>();
  const [transactions, setTranstractions] = useState<Transaction[]>([]);
  const [filteredTxns, setFilteredTxns] = useState<Transaction[]>([]);
  const { data: response, error: srwError } = useAllTransactions(
    account,
    currentNetwork,
    200,
    onlyMyTxn,
  );

  const [query, setQuery] = useState<any>("");
  const [error, setError] = useState<any | null>(null);
  const [hash, setHash] = useState<string>("");
  const [fromChain, setFromChain] = useState<any>([]);
  const [toChain, setToChain] = useState<any>([]);

  const onHashChange = (e: any) => {
    setHash(e);
  };
  const onFromChange = (val: any) => {
    setFromChain(val);
  };
  const onToChange = (val: any) => {
    setToChain(val);
  };

  const toggleDetails = (item: Transaction) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

    if (itemIdToExpandedRowMapValues[item._id]) {
      delete itemIdToExpandedRowMapValues[item._id];
    } else {
      itemIdToExpandedRowMapValues[item._id] = (
        <CollapseWrap>
          <Row>
            <div>
              <span>Transfer</span>
              {item.originNetwork ? (
                <>
                  {item.originToken === NATIVE_TOKEN_ADDRESS ? (
                    <span>{item.amountFormated}</span>
                  ) : (
                    <Wrapper>
                      <a
                        href={`${item.originNetwork.explorer}/token/${item.originToken}`}
                        target="__blank"
                        rel="noopener noreferrer nofollow"
                      >
                        {item.amountFormated}
                      </a>
                    </Wrapper>
                  )}
                </>
              ) : (
                <span>{item.amountFormated}</span>
              )}
            </div>
            <div>
              <span>From</span>
              <NetworkInfo network={item.fromNetwork} />
            </div>
            <div>
              <span>To</span>
              <NetworkInfo network={item.toNetwork} />
            </div>
          </Row>
          {item.account !== item.txCreator && (
            <Row>
              {item.toNetwork?.notEVM
                ? "Your recipient account hash:"
                : "Your recipient account address:"}
              &nbsp;
              <a href={`${item.accountUrl}`} target="__blank">
                {item.account}
              </a>
            </Row>
          )}
          {item.originNetwork && item.originToken !== NATIVE_TOKEN_ADDRESS && (
            <>
              <Row>
                This token was deployed on{" "}
                <NetworkInfo network={item.originNetwork} />
              </Row>
              {(item.fromNetwork?.notEVM || item.toNetwork?.notEVM) &&
                item.account !== item.txCreator &&
                item.contractHash && (
                  <Row>
                    Contrach hash on &nbsp;
                    <NetworkInfo
                      network={
                        item.fromNetwork?.notEVM
                          ? item.fromNetwork
                          : item.toNetwork
                      }
                    />
                    {` ${item.contractHash}`}
                  </Row>
                )}
            </>
          )}
        </CollapseWrap>
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  // Sorting
  const [sortField, setSortField] = useState("requestTime");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const filtered = transactions.filter((txn) =>
      onlyMyTxn ? txn.account === account : true,
    );

    const queried = filtered.filter((txn: any, index: any) => {
      const from = Number(fromChain);
      const to = Number(toChain);
      return (
        JSON.stringify(txn).indexOf(hash) >= 0 &&
        (from ? from === txn.fromChainId : true) &&
        (to ? to === txn.toChainId : true)
      );
    });

    setFilteredTxns(queried);
  }, [
    transactions,
    account,
    onlyMyTxn,

    query,
    sortDirection,
    sortField,
    hash,
    fromChain,
    toChain,
  ]);

  // Search
  const networks = useAllNetworks(isTestnet);

  const { evm_wallet } = useUserProvider();

  const onLoadTransactions = async () => {
    try {
      setIsLoading(true);
      const _txns = await parseResponseToTransactions(response, chainId);
      setTranstractions(_txns);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      onLoadTransactions();
    };

    fetchTransactions();
  }, [account, chainId, response]);

  const changeButtonText = (button: HTMLElement, text: string) => {
    const textTag = button.getElementsByClassName("euiButtonEmpty__text")[0];
    textTag.textContent = text;
  };

  const addLoadingState = (button: HTMLElement) => {};

  const removeLoadingState = (button: HTMLElement) => {};

  const onClaimToken = async (e: any, item: Transaction) => {
    const button = e.currentTarget;
    addLoadingState(button);
    try {
      setIsDisabled(true);
      setClaimTokenSymbol(item.originSymbol);
      const res = await changeNetwork(item.toChainId);

      if (res == false) return;

      setToNetwork(item.toNetwork);

      const {
        requestHash,
        originChainId,
        fromChainId,
        toChainId,
        index,
        originToken,
        amount,
      } = item;

      console.log(item);

      // Ask user if the chainId is different than the toChainId
      if (false) {
        // @TODO
        setShowNetworkModal(true);
      } else {
        try {
          const chainIdData = [originChainId, fromChainId, toChainId, index];
          const _response = await axios.post(
            `https://bridge-mainnet.dotoracle.network/request-withdraw`,
            {
              requestHash,
              fromChainId,
              toChainId,
              index: index,
            },
          );

          if (_response.status === 200 && _response.data) {
            const sign = _response.data;
            const { name, symbol, decimals, r, s, v } = sign;

            if (bridgeContract) {
              const receipt = await bridgeContract.methods
                .claimToken(
                  originToken,
                  item.account,
                  amount,
                  chainIdData,
                  requestHash,
                  r,
                  s,
                  v,
                  name,
                  symbol,
                  decimals,
                )
                .send({
                  chainId: item.toChainId.toString(16),
                  from: item.account,
                });

              if (receipt && currentNetwork) {
              }
            }
          } else {
            const signError = new Error(
              "Could not sign the withdrawal request",
            );
            signError.name = "SignError";
            throw signError;
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error: any) {
      // we only care if the error is something _other_ than the user rejected the tx
      if (error?.code !== 4001) {
        let message = `Could not claim ${item.originSymbol}`;

        if (error.name === "SignError") {
          // eslint-disable-next-line prefer-destructuring
          message = error.message;
        }

        // toast.error(
        //   <ToastMessage
        //     color="danger"
        //     headerText="Error!"
        //     bodyText={message}
        //   />,
        //   {
        //     toastId: "claimToken",
        //   }
        // );
      }
      console.error(error);
    } finally {
      removeLoadingState(button);
      setIsDisabled(false);
    }
  };

  const changeNetwork = async (changeTo: number) => {
    try {
      // check if the chain to connect to is installed
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + changeTo.toString(16) }], // chainId must be in hexadecimal numbers
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          const netInfo = networks.find(
            (n) => n.chainId === changeTo,
          ) as Network;
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + changeTo.toString(16),
                rpcUrls: [netInfo?.rpcURL],
                chainName: netInfo?.name,
                nativeCurrency: netInfo?.nativeCurrency,
                blockExplorerUrls: [netInfo?.explorer],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }

    if (
      Number(await ethereum.request({ method: "eth_chainId" })) !== changeTo
    ) {
      return false;
    }
    return true;
  };

  const onSetupNetwork = async () => {
    try {
      let hasSetup = false;

      if (toNetwork) {
        if (currentNetwork?.notEVM) {
          // window.localStorage.removeItem(connectorLocalStorageKey);
          // deactivate();
          // window.localStorage.setItem(
          //   connectorLocalStorageKey,
          //   ConnectorNames.Injected
          // );
          // await activate(injected, async (error: Error) => {
          //   console.error(error);
          // });
          // window.location.reload();
        }
        // hasSetup = await setupNetwork(toNetwork);
        hasSetup = await changeNetwork(toNetwork?.chainId);

        if (!toNetwork || !hasSetup) {
          console.error("Could not setup network");
        }
      }
    } catch (error: any) {
      // we only care if the error is something _other_ than the user rejected the tx
      if (error?.code !== 4001) {
        console.error(error);
      }
    } finally {
      setShowNetworkModal(false);
    }
  };

  function CustomTable({ columns, data }: { columns: any; data: any }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        },
        useSortBy,
      );

    const borderColor = useColorModeValue(
      "borderColor.light",
      "borderColor.dark",
    );

    const [rowLimit, setRowLimit] = useState<number>(10);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
      setCurrentPage(1);
    }, [rows, rowLimit]);

    return (
      <Box>
        <Table {...getTableProps()} fontSize="12px">
          <Thead>
            {headerGroups.map((headerGroup: any) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <Th
                    userSelect="none"
                    key={column.accessor}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    paddingLeft="10px"
                    paddingRight="0px"
                    fontSize="14px"
                    fontFamily="Inter"
                    fontWeight="300"
                    color="#73767D"
                    textTransform="capitalize"
                    borderColor={borderColor}
                  >
                    <Flex alignItems="center">
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownIcon ml={1} w={4} h={4} />
                        ) : (
                          <ArrowUpIcon ml={1} w={4} h={4} />
                        )
                      ) : (
                        <ChevronDownIcon opacity="0" ml={1} w={4} h={4} />
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.slice(
              (currentPage - 1) * rowLimit,
              Number(rowLimit) + Number((currentPage - 1) * rowLimit),
            ).length > 0 ? (
              rows
                .slice(
                  (currentPage - 1) * rowLimit,
                  Number(rowLimit) + Number((currentPage - 1) * rowLimit),
                )
                .map((row: any, i: number) => {
                  prepareRow(row);
                  return (
                    <>
                      <Tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <>
                              <Td
                                key={cell.accessor}
                                paddingRight="0px"
                                borderColor={borderColor}
                                paddingLeft="10px"
                                verticalAlign="middle"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </Td>
                            </>
                          );
                        })}
                      </Tr>
                    </>
                  );
                })
            ) : (
              <Tr>
                <>
                  <Flex padding="20px 10px">No results found</Flex>
                </>
              </Tr>
            )}
          </Tbody>
        </Table>
        <br />
        <Flex align="center" justifyContent="space-between" pb="30px" gap="0px">
          <Flex align="center">
            {/* <>Rows per page</>{" "}
            <Select
              border="none"
              onChange={(e: any) => {
                setRowLimit(e.target.value);
              }}
              _focus={{ outline: "none", boxShadow: "none" }}
              _active={{ outline: "none", boxShadow: "none" }}
              padding="0px"
              margin="0px"
              w="65px"
              cursor="pointer"
            >
              {TransactionTableConfig.availableRowsPerPage.map(
                (rowsPerPage) => {
                  return (
                    <option key={rowsPerPage} value={rowsPerPage}>
                      {rowsPerPage}
                    </option>
                  );
                }
              )}
            </Select> */}
          </Flex>

          {Math.floor(rows.length / rowLimit) - 1 > 0 ? (
            <Flex gap="10px" align="center">
              <ChevronLeftIcon
                boxSize="20px"
                cursor="pointer"
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              />
              {currentPage > 3 && (
                <Flex gap="10px">
                  <Box cursor="pointer" onClick={() => setCurrentPage(1)}>
                    1
                  </Box>
                  <Box opacity="0.7" cursor="default">
                    ...
                  </Box>
                </Flex>
              )}
              {Array.from(
                Array(Math.floor(rows.length / rowLimit) + 1).keys(),
              ).map((item) => {
                return Math.abs(currentPage - (item + 1)) < 3 ? (
                  <Box
                    key={item}
                    cursor="pointer"
                    color={
                      currentPage == item + 1 ? "brandSecondary.500" : "auto"
                    }
                    onClick={() => setCurrentPage(item + 1)}
                    fontWeight={currentPage == item + 1 ? "bold" : "normal"}
                  >
                    {item + 1}
                  </Box>
                ) : null;
              })}
              {currentPage < Math.floor(rows.length / rowLimit) - 1 && (
                <Flex gap="10px">
                  <Box opacity="0.7" cursor="default">
                    ...
                  </Box>
                  <Box
                    cursor="pointer"
                    onClick={() =>
                      setCurrentPage(Math.floor(rows.length / rowLimit) + 1)
                    }
                  >
                    {Math.floor(rows.length / rowLimit) + 1}
                  </Box>
                </Flex>
              )}
              <ChevronRightIcon
                boxSize="20px"
                cursor="pointer"
                onClick={() =>
                  currentPage < Math.floor(rows.length / rowLimit) - 1 &&
                  setCurrentPage(currentPage + 1)
                }
              />
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    );
  }

  return (
    <>
      {/*
      {showNetworkModal && toNetwork && (
        <EuiConfirmModal
          title="Important!"
          onCancel={() => setShowNetworkModal(false)}
          onConfirm={onSetupNetwork}
          cancelButtonText="Cancel"
          confirmButtonText="Change network"
          defaultFocusedButton="confirm"
        >
          <ConfirmMessage>
            You&rsquo;re connected to{" "}
            <NetworkInfo network={currentNetwork}></NetworkInfo>
          </ConfirmMessage>
          <ConfirmMessage>
            Please change the network to{" "}
            <NetworkInfo network={toNetwork}></NetworkInfo> to claim{" "}
            {claimTokenSymbol}.
          </ConfirmMessage>
        </EuiConfirmModal>
      )*/}
      <Grid templateColumns="1fr 0.7fr 0.7fr" mb="20px" gap="10px">
        <DefaultInput
          onChange={(val: any) => {
            onHashChange(val);
          }}
          value={hash}
          placeholder="Tx Hash"
          icon={<SearchIcon color="#73767D" />}
        />
        <DefaultSelect
          placeholder="From network"
          onChange={(val: any) => {
            onFromChange(val);
          }}
          items={networks
            .filter((network) =>
              network.isTestnet == isTestnet ? true : false,
            )
            .map((network: Network) => ({
              value: network.chainId.toString(),
              label: network.name,
              icon: network.logoURI,
            }))}
          value={fromChain}
        />
        <DefaultSelect
          placeholder="To network"
          onChange={(val: any) => {
            onToChange(val);
          }}
          value={toChain}
          items={networks
            .filter((network) =>
              network.isTestnet == isTestnet ? true : false,
            )
            .map((network: Network) => ({
              value: network.chainId.toString(),
              label: network.name,
              icon: network.logoURI,
            }))}
        />
      </Grid>
      <Box>
        <CustomTable
          columns={[
            {
              Header: "Time",
              accessor: "requestTime",
              Cell: (props: any) => {
                return (
                  <Flex align="center" h="20px">
                    <Box lineHeight="20px">
                      {timeDifference(props.data[props.row.id].requestTime)}
                    </Box>
                  </Flex>
                );
              },
            },
            {
              Header: "Request Tx",
              disableSortBy: true,
              accessor: "requestHashLink",
              Cell: (props: any) => {
                return (
                  <Tooltip
                    label={
                      props.data[props.row.id].requestHashLink.networkName ??
                      "Unknown network"
                    }
                  >
                    <Link
                      href={
                        props.data[props.row.id].requestHashLink.requestHashUrl
                      }
                      target="__blank"
                      rel="noopener nofollow noreferrer"
                    >
                      <Flex align="center" gap="10px">
                        <Box
                          boxSize="20px"
                          bgPos="center"
                          borderRadius="50%"
                          bgSize="cover"
                          bgImage={
                            props.data[props.row.id].requestHashLink
                              .explorerLogo ?? ""
                          }
                        />
                        {trimHash(props.data[props.row.id].requestHash)}
                      </Flex>
                    </Link>
                  </Tooltip>
                );
              },
            },
            {
              Header: "Amount",
              accessor: "amountFormated",
              Cell: (props: any) => {
                return (
                  <Tooltip label={props.data[props.row.id].amountFormated}>
                    <Box>
                      {formatTransferFormattedAmount(
                        props.data[props.row.id].amountFormated,
                      )}
                    </Box>
                  </Tooltip>
                );
              },
            },
            {
              disableSortBy: true,
              Header: "Claim Tx",
              accessor: "claimHashLink",
              Cell: (props: any) => {
                return props.data[props.row.id].claimHash ? (
                  <Tooltip
                    label={
                      props.data[props.row.id].claimHashLink.networkName ??
                      "Unknown network"
                    }
                  >
                    <Link
                      href={props.data[props.row.id].claimHashLink.claimHashUrl}
                      target="__blank"
                      rel="noopener nofollow noreferrer"
                    >
                      <Flex align="center" gap="10px">
                        {props.data[props.row.id].claimHash && (
                          <Box
                            boxSize="20px"
                            bgPos="center"
                            borderRadius="50%"
                            bgSize="cover"
                            bgImage={
                              props.data[props.row.id].claimHashLink
                                .explorerLogo ?? ""
                            }
                          />
                        )}
                        <Box>
                          {trimHash(props.data[props.row.id].claimHash)}
                        </Box>
                      </Flex>
                    </Link>
                  </Tooltip>
                ) : (
                  "-"
                );
              },
            },
            {
              disableSortBy: true,
              Header: "Action",
              Cell: (props: any) => {
                const item = props.data[props.row.id];

                return (
                  <>
                    {!item.claimed ? (
                      <>
                        {item.index ? (
                          <>
                            {item.toNetwork?.notEVM ? (
                              <>
                                <span>Processing</span>
                              </>
                            ) : item.account.toLowerCase() ==
                              evm_wallet.toLowerCase() ? (
                              <>
                                <Flex
                                  align="center"
                                  bg="#EFEFEF"
                                  color="black"
                                  justify="center"
                                  cursor={"pointer"}
                                  borderRadius="4px"
                                  _hover={{ textDecor: "underline" }}
                                  onClick={(e: any) => onClaimToken(e, item)}
                                >
                                  Claim
                                </Flex>
                              </>
                            ) : (
                              <Box opacity={"0.75"}>Claimable</Box>
                            )}
                          </>
                        ) : (
                          <>
                            {item.fromNetwork && (
                              <ClaimCountdown
                                transaction={item}
                                network={item.fromNetwork}
                                isDisabled={isDisabled}
                                onClick={(e: any) => onClaimToken(e, item)}
                              />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <span style={{ opacity: 0.5 }}>Complete</span>
                    )}
                  </>
                );
              },
            },
          ]}
          data={filteredTxns}
        />
      </Box>
    </>
  );
}

export default TransactionsTable;
