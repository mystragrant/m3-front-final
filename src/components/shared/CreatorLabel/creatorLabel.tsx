import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export const CreatorLabel = ({
  avatarUrl,
  name,
  verified,
}: {
  avatarUrl: string;
  name: string;
  verified: boolean;
}) => {
  const { borderPrimary } = useThemeProvider();

  return (
    <Flex
      alignItems="center"
      gap="8px"
      bg={"rgba(255,255,255,0.04)"}
      backdropFilter={"blur(20px)"}
      borderRadius="4px"
      padding="5px 8px"
      border="1px solid"
      pr="14px"
      borderColor={"rgba(255,255,255,0.16)"}
    >
      <Box
        bgImage={avatarUrl}
        bgSize="cover"
        bgPos="center"
        borderRadius="50%"
        boxSize="30px"
      />
      <Box fontWeight="300" fontSize="12px" color="white" fontFamily="Inter">
        {name}
      </Box>
      {verified && (
        <Flex borderRadius="50%" bg="white">
          <CheckCircleIcon boxSize="12px" color="brandSecondary.500" />
        </Flex>
      )}
    </Flex>
  );
};
