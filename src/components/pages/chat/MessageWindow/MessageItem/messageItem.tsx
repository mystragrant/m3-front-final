import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";
import {
  deployFromJson,
  deployToJson,
} from "casper-js-sdk/dist/lib/DeployUtil";
import { NETWORK_NAME } from "../../../../../constants";
import { toMotes } from "../../../../../helpers/misc";
import { useMultiWalletProvider } from "../../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../../providers/User/userProvider";
import { buildTransferDeploy } from "../../../../../services/casper";
import { trimHash } from "../../../../../utils/utils";

export const MessageItem = ({
  time,
  username,
  avatar = "/assets/brand/default-avatar.jpg",
  content,
  active,
  color = "#96ADC1",
  senderAddress,
}: {
  time: string;
  username: string;
  avatar?: string;
  content: any;
  active: boolean;
  color?: string;
  senderAddress: string;
}) => {
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const contentColor = useColorModeValue("#5D6169", "#AFB4C0");

  const { casper_public_key_wallet } = useUserProvider();
  const { putDeployUniversal, signCasper } = useMultiWalletProvider();

  const { backgroundSecondary, borderPrimary } = useThemeProvider();

  return (
    <Grid templateColumns="32px 1fr auto" gap="16px">
      <Box
        bgImage={avatar}
        bgSize="cover"
        bgPos="center"
        borderRadius="50%"
        boxSize="32px"
        pos="relative"
      >
        {active && (
          <Box
            pos="absolute"
            right="1px"
            bottom="1px"
            boxSize="7px"
            bg="#19B300"
            border="1px solid"
            borderRadius="50%"
            borderColor="white"
          />
        )}
      </Box>
      <Flex flexDir="column">
        <Flex
          fontWeight="500"
          align="center"
          color={color}
          fontSize="14px"
          gap="8px"
        >
          {username}{" "}
          <Menu>
            <MenuButton
              border="1px solid"
              borderColor={borderPrimary}
              paddingX="4px"
              color="rgba(255,255,255,0.5)"
              borderRadius="4px"
              bg={backgroundSecondary}
              height="20px"
              paddingBottom="0px"
              fontSize="12px"
              maxW="140px"
            >
              {trimHash(senderAddress)}{" "}
              <ChevronDownIcon boxSize="14px" mb="2px" />
            </MenuButton>

            <MenuList
              role="group"
              color="white"
              padding="0px"
              bg={backgroundSecondary}
            >
              <MenuItem
                role="group"
                cursor="default"
                display="flex"
                justifyContent="space-between"
              >
                {trimHash(senderAddress)}{" "}
                <Flex align="center" gap="10px">
                  <CopyIcon
                    onClick={() => {
                      navigator.clipboard.writeText(senderAddress);
                    }}
                    cursor="pointer"
                    _groupHover={{ display: "block" }}
                  />
                  <ArrowForwardIcon
                    onClick={() => {
                      try {
                        const deploy = buildTransferDeploy(
                          CLPublicKey.fromHex(casper_public_key_wallet),
                          CLPublicKey.fromHex(senderAddress),
                          100,
                          0,
                          2.5,
                          NETWORK_NAME,
                        );
                        const jsonDeploy = DeployUtil.deployToJson(deploy);

                        signCasper(jsonDeploy).then((signature: any) => {
                          console.log(signature);
                          putDeployUniversal(
                            signature,
                            deploy,
                            casper_public_key_wallet,
                          );
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    cursor="pointer"
                  />
                </Flex>
              </MenuItem>
              {/* <MenuItem
                cursor="default"
                display="flex"
                justifyContent="space-between"
              >
                {trimHash("0x9b0c5497a2c17B5892EACC81b62e83d7bce0a7fB")}{" "}
                <Flex align="center" gap="10px">
                  <CopyIcon
                    onClick={() => {
                      navigator.clipboard.writeText(senderAddress);
                    }}
                    cursor="pointer"
                    _groupHover={{ display: "block" }}
                  />
                  <ArrowForwardIcon
                    onClick={() => {
                      const deploy = buildTransferDeploy(
                        CLPublicKey.fromHex(casper_public_key_wallet),
                        CLPublicKey.fromHex(senderAddress),
                        1000,
                        0,
                        2.5,
                        NETWORK_NAME
                      );
                      const jsonDeploy = DeployUtil.deployToJson(deploy);

                      signCasper(jsonDeploy).then((signature: any) => {
                        putDeployUniversal(
                          signature,
                          deploy,
                          casper_public_key_wallet
                        );
                      });
                    }}
                    cursor="pointer"
                  />
                </Flex>
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
        <Box maxW="40vw" fontSize="12px" color={contentColor}>
          {content}
        </Box>
      </Flex>
      <Box fontSize="12px" color={textSecondary}>
        {time}
      </Box>
    </Grid>
  );
};
