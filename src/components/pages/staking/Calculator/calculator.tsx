import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { MystraAPI } from "../../../../services/mystra-api";
import { CardContainer } from "../../../shared/containers/cardContainer";
import { CustomCheckbox } from "../../../shared/inputs/CustomCheckbox/customCheckbox";
import { TraitItem } from "../../../shared/TraitItem/traitItem";

const DEFAULT_CSPR_AMOUNT = 4000;

export const Calculator = () => {
  const [csprAmount, setCsprAmount] = useState<number>(DEFAULT_CSPR_AMOUNT);
  const [APY, setAPY] = useState<number>(0);
  const [validatorFee, setValidatorFee] = useState<number>(
    process.env.REACT_APP_ENVIRONMENT == "testnet" ? 10 : 4,
  );
  const [actualApy, setActualApy] = useState<number>(10.24);
  const [speculatedPrice, setSpeculatedPrice] = useState<number>(0.5);
  const [speculation, setSpeculation] = useState<boolean>(false);
  const [casperPrice, setCasperPrice] = useState<number>(0.03797115);

  const { borderPrimary, textSecondary, textPrimary } = useThemeProvider();

  const fetchAndUpdateData = () => {
    MystraAPI.getCasperNodeInfo()
      .then((res) => {
        const nodeDetails = res.data.node_details[0];

        setAPY(Math.floor(nodeDetails.node_apy * 100) / 100 ?? 0);
        setActualApy(Math.floor(nodeDetails.node_apy * 100 * 0.96) / 100 ?? 0);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  return (
    <CardContainer>
      <Box fontSize="14px">Enter CSPR Amount</Box>
      <Flex mt="16px" gap="50px" align="center">
        <Input
          value={csprAmount}
          fontSize="16px"
          borderColor={borderPrimary}
          w="340px"
          h="50px"
          type="number"
          onChange={(e: any) => setCsprAmount(e.target.value)}
        />
        {[
          {
            label: "APY",
            value: APY + "%",
          },
          {
            label: "Validator Fee",
            value: validatorFee + "%",
          },
          {
            label: "Actual APY",
            value: actualApy + "%",
          },
        ].map((item) => {
          return (
            <Flex fontSize="12px" fontWeight="300" flexDir="column">
              <Box color={textSecondary}>{item.label}</Box>
              <Box>{item.value}</Box>
            </Flex>
          );
        })}
      </Flex>
      <Box mt="30px" fontSize="14px">
        Today at the actual CSPR price
      </Box>
      <Grid
        mt="24px"
        templateColumns="1fr 1fr"
        templateRows="1fr 1fr"
        gap="16px"
      >
        <TraitItem
          label={"Stake amount"}
          value={csprAmount + " CSPR"}
          description={
            "$ " + csprAmount * (speculation ? speculatedPrice : casperPrice)
          }
        />
        <TraitItem
          label={"Daily Earning"}
          value={
            Math.floor(((csprAmount * (actualApy / 100)) / 365) * 100) / 100 +
            " CSPR"
          }
          description={
            "$ " +
            Math.floor(
              csprAmount *
                (actualApy / 100 / 365) *
                (speculation ? speculatedPrice : casperPrice) *
                100,
            ) /
              100
          }
        />
        <TraitItem
          label={"Monthly earning"}
          value={
            Math.floor(((csprAmount * (actualApy / 100)) / 12) * 100) / 100 +
            " CSPR"
          }
          description={
            "$ " +
            Math.floor(
              csprAmount *
                (actualApy / 100 / 12) *
                (speculation ? speculatedPrice : casperPrice) *
                100,
            ) /
              100
          }
        />
        <TraitItem
          label={"Yearly earning"}
          value={
            Math.floor(csprAmount * (actualApy / 100) * 100) / 100 + " CSPR"
          }
          description={
            "$ " +
            Math.floor(
              csprAmount *
                (actualApy / 100) *
                (speculation ? speculatedPrice : casperPrice) *
                100,
            ) /
              100
          }
        />
      </Grid>
      <Box m="24px 0" h="1px" bg={borderPrimary} />
      <Flex align="center" gap="20px" fontSize="14px">
        <Box>CSPR price speculation</Box>
        <CustomCheckbox onChange={(e) => setSpeculation(e)}>
          <Box></Box>
        </CustomCheckbox>
      </Flex>
      <Flex align="center" gap="20px" mt="16px" justifyItems="flex-start">
        <InputGroup justifySelf="flex-start">
          <InputLeftElement
            h="50px"
            pointerEvents="none"
            children={<Box color={textSecondary}>$</Box>}
          />
          <Input
            h="50px"
            w="400px"
            type="number"
            onChange={(e: any) => setSpeculatedPrice(e.target.value)}
            disabled={!speculation}
            value={speculatedPrice}
          />
        </InputGroup>

        {[0.5, 1, 10].map((value) => {
          return (
            <Button
              h="50px"
              w="94px"
              border="1px solid"
              borderColor={
                speculatedPrice == value ? textPrimary : borderPrimary
              }
              fontSize="14px"
              disabled={!speculation}
              onClick={() => {
                setSpeculatedPrice(value);
              }}
              fontWeight="400"
              color={"white"}
            >
              {value} $
            </Button>
          );
        })}
      </Flex>
    </CardContainer>
  );
};
