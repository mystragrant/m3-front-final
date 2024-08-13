import { Box, Button, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../../providers/Theme/useThemeProvider";

export const PromoItem = ({
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText,
  header,
  description,
  image,
  color = "white",
}: {
  primaryAction: () => void;
  primaryActionText: React.ReactNode;
  secondaryAction: () => void;
  secondaryActionText: string;
  header: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
  color?: string;
}) => {
  const { borderPrimary } = useThemeProvider();

  return (
    <Flex
      padding="26px"
      borderRadius="8px"
      alignItems="flex-end"
      justify="flex-start"
      overflow="hidden"
      border="1px solid"
      borderColor={borderPrimary}
      pos="relative"
      bg={"#111111"}
    >
      <Box
        pos="absolute"
        left="-50px"
        filter="blur(70px)"
        bg={color}
        opacity="1"
        top="-100px"
        zIndex="0"
        boxSize="270px"
      ></Box>

      {image}

      <Flex flexDir="column" zIndex="1">
        <Box fontSize="26px" fontWeight="600" fontFamily="Inter">
          {header}
        </Box>
        <Box
          mt="4px"
          maxW="220px"
          fontSize="14px"
          fontWeight="300"
          fontFamily="Inter"
          lineHeight="160%"
          color="#EFEFEF"
        >
          {description}
        </Box>
        <Flex gap="8px" mt="30px">
          <Button
            fontFamily="Inter"
            h="32px"
            fontWeight="normal"
            color="black"
            fontSize="13px"
            bg="white"
            onClick={primaryAction}
            padding="0px 16px"
          >
            {primaryActionText}
          </Button>
          {secondaryActionText !== "" && (
            <Button
              fontFamily="Inter"
              fontWeight="normal"
              h="32px"
              fontSize="13px"
              color="white"
              border="1px solid rgba(255,255,255,0.4)"
              bg="none"
              onClick={secondaryAction}
              padding="0px 16px"
            >
              {secondaryActionText}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
