import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import useFetch from "../../../../hooks/useFetch";
import { ARI10_GATEWAY_URL, ARI10_WIDGET_ID } from "../../../../constants";
import { useEffect, useState } from "react";
import { SmallSelect } from "../../../shared/inputs/SmallSelect/smallSelect";
import axios from "axios";

export const GatewayForm = () => {
  const { borderPrimary } = useThemeProvider();

  const [selectedFiat, selectFiat] = useState(null);
  const [selectedCrypto, selectCrypto] = useState(null);

  const [fiatAmount, setFiatAmount] = useState<number>(0);
  const [cryptoAmount, setCryptoAmount] = useState<number>(25);

  const { data: cryptoData, isLoading: currenciesLoading } = useFetch(
    `${ARI10_GATEWAY_URL}/currencies`,
    {
      "Content-type": "application/json",
      "Ari10-Widget-Id": ARI10_WIDGET_ID,
    },
  );

  const { data: fiatData, isLoading: fiatCurrenciesLoading } = useFetch(
    `${ARI10_GATEWAY_URL}/fiat-currencies`,
    {
      "Content-type": "application/json",
      "Ari10-Widget-Id": ARI10_WIDGET_ID,
    },
  );

  const [tooLow, setTooLow] = useState<string>("");

  useEffect(() => console.log("data", fiatData), [fiatData]);

  useEffect(() => {
    if (selectedFiat === "USD" || selectedFiat === "EUR") {
      setFiatAmount(100);
    } else if (selectedFiat === "PLN") {
      setFiatAmount(400);
    }
  }, [selectedFiat]);

  useEffect(() => {
    const timeout: any = setTimeout(() => {
      setTooLow("");

      axios
        .post(
          `${ARI10_GATEWAY_URL}/currencies/${selectedCrypto}/calculate`,
          {
            offeredAmount: fiatAmount,
            offeredCurrencyCode: selectedFiat,
          },
          {
            headers: {
              "Content-type": "application/json",
              "Ari10-Widget-Id": ARI10_WIDGET_ID,
            },
          },
        )
        .then((res: any) => {
          setCryptoAmount(res.data.amount);
        })
        .catch((e) => {
          setTooLow("Amount too high");
        });
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedCrypto, fiatAmount, selectedFiat]);

  useEffect(() => {
    if (
      fiatAmount < 100 &&
      (selectedFiat === "EUR" || selectedFiat === "USD")
    ) {
      setTooLow("Minimal amount in " + selectedFiat + " is 100");
    } else if (fiatAmount < 400 && selectedFiat === "PLN") {
      setTooLow("Minimal amount in " + selectedFiat + " is 400");
    } else {
      setTooLow("");
    }
  }, [fiatAmount, selectedFiat, selectedCrypto]);

  useEffect(() => {
    if (
      currenciesLoading === false &&
      fiatCurrenciesLoading === false &&
      cryptoData &&
      fiatData
    ) {
      selectCrypto(cryptoData.currencies[0].code);
      selectFiat(fiatData.fiatCurrencies[0].code);
    }
  }, [currenciesLoading, fiatCurrenciesLoading, fiatData, cryptoData]);

  return (
    <Flex flexDir={"column"} gap="14px">
      <Flex align="center" justifyContent={"space-between"}>
        <Box fontSize="30px" fontFamily="Inter">
          Buy Crypto
        </Box>
        {/* <Flex align="center" gap="12px">
          <Image h="14px" src="/assets/logos/visa.png" />
          <Image h="20px" src="/assets/logos/mastercard.svg" />
          <Image h="16px" src="/assets/logos/blik.svg" />
        </Flex> */}
      </Flex>
      <Flex flexDir="column" gap="8px">
        <Box fontSize={"14px"} mt="10px" fontFamily="Inter">
          I buy:
        </Box>
        <Flex
          border="1px solid"
          borderRadius={"8px"}
          justifyContent="space-between"
          borderColor={borderPrimary}
          align="center"
          bg={"#1C1C1C"}
          padding="4px 8px"
        >
          <Input
            type="number"
            disabled={true}
            pl="10px"
            cursor={"default"}
            fontSize="14px"
            bg="none"
            border="none"
            onChange={(e: any) => setCryptoAmount(e.target.value)}
            value={cryptoAmount}
            _focus={{ outline: "none", boxShadow: "none" }}
          />
          <SmallSelect
            items={
              cryptoData != null
                ? cryptoData.currencies.map((c: any) => {
                    return {
                      value: c.code,
                      label: c.code,
                      icon: c.imageUrl,
                    };
                  })
                : []
            }
            selectedValue={selectedCrypto}
            onChange={(v) => selectCrypto(v)}
            heading="Select Crypto currency"
          />
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8px">
        <Box fontSize={"14px"} fontFamily="Inter">
          For:
        </Box>
        <Flex
          border="1px solid"
          borderRadius={"8px"}
          justifyContent="space-between"
          bg="#1C1C1C"
          borderColor={borderPrimary}
          align="center"
          padding="4px 8px"
        >
          <Input
            type="number"
            pl="10px"
            border="none"
            bg="none"
            fontSize="14px"
            onChange={(e: any) => setFiatAmount(e.target.value)}
            value={fiatAmount}
            _focus={{ outline: "none", boxShadow: "none" }}
          />

          <SmallSelect
            items={
              fiatData != null
                ? fiatData.fiatCurrencies.map((c: any) => {
                    return {
                      value: c.code,
                      label: c.code,
                      icon: c.imageUrl,
                    };
                  })
                : []
            }
            selectedValue={selectedFiat}
            onChange={(v) => selectFiat(v)}
            heading="Select FIAT currency"
          />
        </Flex>
      </Flex>
      <Button
        mt="20px"
        bg="white"
        fontFamily="Inter"
        fontWeight={"normal"}
        color="black"
        fontSize={"14px"}
        disabled={tooLow !== ""}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent("ari10-widget-start-transaction-request", {
              detail: {
                buyCurrencyCode: selectedCrypto,
                offerMoney: {
                  amount: fiatAmount,
                  currencyCode: selectedFiat,
                },
              },
            }),
          );
        }}
      >
        {tooLow === "" ? "Checkout" : tooLow}
      </Button>
    </Flex>
  );
};
