import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { useNavigate } from "react-router";

export const DaoHeader = () => {
  const { textSecondary } = useThemeProvider();

  const navigate = useNavigate();

  return (
    <Flex justify="space-between" align="center" h="400px" zIndex="110">
      <Flex flexDir="column" justifyItems="center">
        <Box fontSize="56px" fontWeight="bold" fontFamily="Inter">
          Discover Projects
        </Box>
        <Box fontFamily="Inter" w="570px" fontSize="20px" color={textSecondary}>
          Vote in DAOs, support your favorite projects and invest in Launchpad
          Module - all in one place.{" "}
        </Box>
        <Flex mt="40px" align="center" zIndex="100" gap="12px">
          <Button fontWeight={"normal"} bg="white" color="black">
            Discover
          </Button>
          <Button
            fontWeight={"normal"}
            cursor="pointer"
            onClick={() => navigate("/dao/create")}
            color="white"
            bg="none"
            border="1px solid"
            borderColor="white"
          >
            Create own DAO
          </Button>
        </Flex>
      </Flex>
      <Flex
        h="400px"
        w="650px"
        overflowY="hidden"
        pos="relative"
        align="center"
        justify="center"
      >
        <Image
          pos="absolute"
          h="650px"
          w="650px"
          top="0"
          bottom="0"
          left="0"
          right="0"
          margin="auto"
          src="/assets/elements/dao/circle.png"
        />
        <Flex flexDir="column" align={"center"} boxSize="250px">
          <Image w="150px" src="/assets/brand/star-white.svg" />
          <Box mt="30px" fontWeight="bold" fontFamily="Inter" fontSize="30px">
            MYSTRA DAO
          </Box>
          <Box fontFamily={"Space Mono"}>5432 ACTIVE USERS</Box>
        </Flex>
      </Flex>
      <Grid
        overflowX="hidden"
        w="100%"
        pos="absolute"
        h="400px"
        alignItems="flex-end"
        bottom={0}
        left="0"
      >
        <Box
          bg="brandSecondary.500"
          h="20px"
          filter="blur(80px)"
          opacity={"1"}
        />
      </Grid>
    </Flex>
  );
};
