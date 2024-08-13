import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useThemeProvider } from "../../../../../../providers/Theme/useThemeProvider";
import { PointsDisplay } from "../../../../../shared/display/PointsDisplay/pointsDisplay";

export const VerificationItem = ({
  heading,
  active,
  icon,
  description,
  value,
  action,
  disabled = false,
  completed,
  points,
  actionText,
  showAction = true,
  claimAction,
  pointsClaimable,
}: {
  heading: string;
  icon: string;
  claimAction: () => void;
  pointsClaimable: boolean;
  disabled?: boolean;
  description: string;
  active: boolean;
  value: any;
  action: () => void;
  points: number;
  completed: boolean;
  actionText: string;
  showAction?: boolean;
}) => {
  const {
    borderPrimary,
    backgroundSecondary,
    textPrimary,
    backgroundTertiary,
    textSecondary,
  } = useThemeProvider();

  const bg = useColorModeValue("#F9F9F9", "#171717");

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!copied) {
      window.navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  return (
    <Flex
      h="50px"
      border="1px solid"
      paddingX="20px"
      align="center"
      borderRadius="8px"
      pr="8px"
      bg={showAction ? "auto" : backgroundTertiary}
      justify="space-between"
      borderColor={active ? "brandSecondary.500" : borderPrimary}
      role="group"
    >
      <Flex
        align="center"
        gap="16px"
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
      >
        <Flex boxSize="18px" align="center" justify="center">
          <Image src={icon} />
        </Flex>
        <Box color={showAction ? "auto" : textSecondary}>{heading}</Box>
        {showAction && points > 0 && (
          <Box boxSize="4px" borderRadius="50%" bg="white">
            {" "}
          </Box>
        )}
        {showAction && points > 0 && <PointsDisplay amount={points} />}
      </Flex>
      {showAction ? (
        <Button
          fontFamily="Space Mono"
          fontSize="12px"
          fontWeight="400"
          bg={active ? "#EFEFEF" : "none"}
          border="1px solid"
          borderColor="#EFEFEF"
          _hover={{ bg: "#EFEFEF", color: "black" }}
          color={active ? "black" : "#EFEFEF"}
          borderRadius="4px"
          transition="0s"
          h="30px"
          px="0px"
          alignItems="center"
          w="80px"
          onClick={action}
        >
          <Box fontFamily="Inter">Verify&nbsp; </Box>
        </Button>
      ) : (
        <Flex gap="10px" mr="10px" align="center">
          <Box fontFamily="Inter" fontSize="14px" fontWeight="400">
            {value}
          </Box>
          <Box
            onClick={handleCopy}
            display="none"
            _groupHover={{ display: "block" }}
            cursor="pointer"
          >
            {!copied ? (
              <Image src="/assets/icons/copy.svg" />
            ) : (
              <CheckCircleIcon w="14px" />
            )}
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

{
  /*<Grid
      templateRows="55px 150px 4px"
      bg={bg}
      borderRadius="8px 8px 0px 0px"
      border="1px solid"
      borderBottom="none"
      borderColor={borderPrimary}
    >
      <Flex
        align="center"
        borderBottom="1px solid"
        borderColor={borderPrimary}
        padding="0px 27px"
        justifyContent="space-between"
      >
        <Box>{heading}</Box>
        {completed ? (
          <Image src="/assets/icons/verification/check-circle.svg" />
        ) : (
          points > 0 && <Box
            fontSize="12px"
            borderRadius="4px"
            lineHeight="100%"
            padding="3px 6px"
            bg="brandSecondary.500"
          >
            + {points} SP
          </Box>
        )}
      </Flex>
      <Grid templateColumns="1fr auto" padding="23px 27px" gap="40px">
        <Flex flexDir="column" gap="22px">
          <Box fontSize="14px" color={textSecondary}>
            {description}
          </Box>
          <Flex gap="10px" align="center">
            <Flex boxSize="18px" align="center" justify="center">
              <Image src={icon} />
            </Flex>
			<Box>{value}</Box>
          </Flex>
        </Flex>
        <Flex align="center">
          {showAction && <Button
            fontSize="14px"
            fontWeight="normal"
            padding="8px 16px"
            lineHeight="100%"
            disabled={disabled}
            h="40px"
            bg={"brand.500"}
            color="white"
            onClick={action}
          >
            {actionText}
          </Button>}
        </Flex>
      </Grid>
      <Box
        bg={
          completed
            ? "linear-gradient(90deg, #964BF7 6.93%, #2FB88E 100%)"
            : "#424242"
        }
      />
      </Grid>*/
}
