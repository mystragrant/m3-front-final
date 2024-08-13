import {
  Box,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useTxQueue } from "../../../../providers/useTxQueue/useTxQueue";
import { useMemo } from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../../utils/utils";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";

export const TxLoader = () => {
  const { txQueue } = useTxQueue();

  const queue = useMemo(() => {
    return txQueue.filter((tx) => tx.finished === false);
  }, [txQueue]);

  const { borderPrimary, textSecondary, backgroundPrimary } =
    useThemeProvider();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {queue.length > 0 && (
        <Flex pos="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
          <Menu isOpen={isOpen}>
            <MenuButton>
              <Flex
                pos="relative"
                border="1px solid"
                borderRadius="8px"
                borderColor={borderPrimary}
                h="46px"
                px="12px"
                display="flex"
                flexDir="row"
                alignItems="center"
                gap="12px"
              >
                <Flex align="center" pos="relative" boxSize="27px">
                  <Spinner
                    position="absolute"
                    top="0"
                    speed={"1s"}
                    boxSize="28px"
                    bottom="0"
                    margin="auto"
                    color="brandSecondary.500"
                    emptyColor={borderPrimary}
                  />
                  <Flex
                    w="28px"
                    top="0"
                    h="10px"
                    bottom="0"
                    marginY="auto"
                    align="center"
                    fontSize="14px"
                    fontFamily="Space Mono"
                    justify="center"
                    pos="absolute"
                  >
                    {queue.length}
                  </Flex>
                </Flex>
                <Box fontFamily="Inter" fontSize="12px">
                  TX Pending
                </Box>
              </Flex>
            </MenuButton>
            <MenuList
              p="0"
              minW="0"
              border="1px solid"
              borderColor={borderPrimary}
              bg={backgroundPrimary}
              gap="10px"
            >
              {queue.map((item, index) => {
                return (
                  <Grid
                    templateColumns="auto 1fr 40px"
                    gap="12px"
                    alignItems="center"
                    minW="200px"
                    px="8px"
                    py="8px"
                    borderBottom={
                      index !== queue.length - 1 ? "1px solid" : "none"
                    }
                    borderColor={borderPrimary}
                  >
                    <MultichainIcon size={30} chain={item.chain} />
                    <Flex flexDir="column" justify="center">
                      <Box
                        fontSize="12px"
                        fontFamily="Inter"
                        color={textSecondary}
                      >
                        {item.name}
                      </Box>
                      <Box fontFamily="Space Mono" fontSize="10px">
                        {trimHash(item.hash)}
                      </Box>
                    </Flex>
                    <Flex align="center" justify="center">
                      <Spinner boxSize="14px" />
                    </Flex>
                  </Grid>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
      )}
    </>
  );
};
