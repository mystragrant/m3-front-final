import {
  border,
  Box,
  Flex,
  Grid,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { CasperArmyNodeAPI } from "../../../../services/casperarmy-api/node";
import { MystraAPI } from "../../../../services/mystra-api";
import { CardContainer } from "../../../shared/containers/cardContainer";
import { IconWithValue } from "../../../shared/display/IconWithValue/iconWithValue";
import { CsprIcon } from "../../../shared/icons/CsprIcon";
import { HardDriveIcon } from "../../../shared/icons/HardDriveIcon";
import { TwoUsersIcon } from "../../../shared/icons/TwoUsersIcon";
import { LoadingOverlay } from "../../../shared/LoadingOverlay/loginBlockOverlay";
import { TraitItem } from "../../../shared/TraitItem/traitItem";
import { SectionHeader } from "../../../shared/typography/sectionHeader";
import CountUp from "react-countup";

const ActiveIndicator = ({ active }: { active: boolean }) => {
  return (
    <Flex align="center" gap="8px">
      <Box
        borderRadius="50%"
        boxSize="14px"
        bg={active ? "#54E2B766" : "error.500"}
        border="1px solid"
        borderColor={active ? "#54E2B7" : "red"}
      />
      <Box
        color={active ? "brandSecondary.500" : "error.500"}
        fontFamily={"Inter"}
        fontSize="14px"
      >
        {active ? "Active" : "Error"}
      </Box>
    </Flex>
  );
};

export const NodeDetails = () => {
  const [active, setActive] = useState<boolean>(true);
  const [performance, setPerformance] = useState<number>(100);
  const [delegatorsAmount, setDelegatorsAmount] = useState<number>(118);
  const [totalStake, setTotalStake] = useState<number>(0);
  const [validatorRewards, setValidatorRewards] = useState<number>(0);
  const [delegatorRewards, setDelegatorRewards] = useState<number>(0);
  const [selfStake, setSelfStake] = useState<number>(0);
  const [apy, setApy] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const secondaryColor = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const fetchAndUpdateData = () => {
    setLoading(true);
    MystraAPI.getCasperNodeInfo()
      .then((res) => {
        console.log("node", res);
        const nodeDetails = res.data.node_details[0];
        setActive(nodeDetails.node_active ?? false);
        setPerformance(nodeDetails.node_active_percentage ?? false);
        setDelegatorsAmount(nodeDetails.total_delegators ?? 0);
        setTotalStake(nodeDetails.total_stake ?? 0);
        setValidatorRewards(nodeDetails.validator_rewards ?? 0);
        setDelegatorRewards(nodeDetails.delegator_rewards ?? 0);
        setSelfStake(nodeDetails.self_stake ?? 0);
        setValidatorRewards(nodeDetails.validator_rewards ?? 0);
        setApy(nodeDetails.node_apy ?? 0);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  const { textSecondary } = useThemeProvider();

  return (
    <Flex flexDir="column" pl="60px">
      <Flex justify="space-between" align="flex-start" mb="24px">
        <Box fontFamily="Inter" fontSize="24px">
          Node details
        </Box>
        {/* <Flex>
          <Image
            transform="translateY(-5px)"
            src="/assets/images/eco-friendly.svg"
          />
        </Flex> */}
      </Flex>
      <Grid templateColumns="auto auto 1fr" gap="19px">
        <Image boxSize="62px" src={"/assets/brand/mystra-validator.png"} />
        <Flex flexDir="column" justify="center" gap="5px">
          <Flex fontSize="16px" fontWeight="400" fontFamily="Inter">
            Mystra
          </Flex>
          <Flex gap="25px">
            <ActiveIndicator active={active} />
            <IconWithValue icon={<HardDriveIcon />} value={performance + "%"} />
            <IconWithValue icon={<TwoUsersIcon />} value={delegatorsAmount} />
          </Flex>
        </Flex>
        <Flex flexDir="column" justify="center" gap="5px" alignItems="flex-end">
          <Flex
            fontSize="14px"
            fontWeight="400"
            fontFamily="Inter"
            color={textSecondary}
          >
            Total Stake
          </Flex>
          <Flex gap="5px" align="center" fontFamily="Space Mono">
            <Box fontSize="14px">
              <CountUp start={0} end={totalStake} duration={0.5} />{" "}
            </Box>
            CSPR
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};
