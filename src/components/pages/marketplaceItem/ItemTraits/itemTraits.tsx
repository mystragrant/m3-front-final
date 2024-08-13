import { Box, Flex, Grid } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { DropdownContainer } from "../../../shared/containers/dropdownContainer";

const SingleTrait = ({ header, value }: { header: string; value: string }) => {
  const { borderPrimary, textSecondary, textPrimary } = useThemeProvider();
  return (
    <Flex
      fontFamily="Inter"
      flexDir="column"
      padding="10px"
      border="1px solid"
      px="14px"
      borderRadius="8px"
      borderColor={borderPrimary}
    >
      <Box
        textTransform="uppercase"
        fontSize="10px"
        fontWeight="400"
        color={textSecondary}
      >
        {header}
      </Box>
      <Box fontSize="14px" color={textPrimary}>
        {value}
      </Box>
    </Flex>
  );
};

export const ItemTraits = ({
  header = "Traits",
  items = [],
}: {
  header?: string;
  items?: { attribute_type: string; attribute_value: string }[];
}) => {
  return (
    <DropdownContainer label={header}>
      <Grid templateRows="1fr 1fr" gap="8px" templateColumns="1fr 1fr 1fr">
        {items.map((item) => {
          return (
            <SingleTrait
              value={item.attribute_value}
              header={item.attribute_type}
            />
          );
        })}
      </Grid>
    </DropdownContainer>
  );
};
