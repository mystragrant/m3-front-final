import {
  Box,
  Flex,
  Grid,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const FilterTab = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid pb="18px" borderBottom="1px solid" borderColor={borderColor}>
      <Flex
        align="center"
        fontFamily="Inter"
        fontWeight="400"
        justify="space-between"
        onClick={isOpen ? onClose : onOpen}
        cursor="pointer"
      >
        <Flex
          fontSize="14px"
          fontWeight={500}
          lineHeight="14px"
          color={textPrimary}
        >
          {label}
        </Flex>
        <Box mr="10px" fontSize="20px" lineHeight="14px">
          {isOpen ? "-" : "+"}
        </Box>
      </Flex>

      {isOpen && (
        <Flex flexDir="column" mt="18px">
          {children}
        </Flex>
      )}
    </Grid>
  );
};

export const Filters = () => {
  return (
    <Flex flexDir="column" gap="32px">
      {/* <DefaultSelect
        items={[
          { label: "Floor price ascending", value: "floor" },
          { label: "Floor price descending", value: "floor" },
        ]}
        placeholder="Sort by"
        value="5"
        onChange={() => {}}
      /> */}
      <Box>Filters</Box>
      <Flex flexDir="column" gap="18px">
        <FilterTab label="Status">x</FilterTab>
        <FilterTab label="Price">x</FilterTab>
      </Flex>
    </Flex>
  );
};
