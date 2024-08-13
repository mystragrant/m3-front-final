import { Flex, Box, Grid, Heading, Text } from "@chakra-ui/react";

export const CenterSectionHeader = ({
  heading,
  description,
}: {
  heading: string | React.ReactNode;
  description?: string | React.ReactNode;
}) => {
  return (
    <Grid mb="60px" color="black" textAlign="center" gap="15px">
      <Heading as="h3" fontSize="38px">
        {heading}
      </Heading>
      {description && (
        <Text color="#515151" fontSize="20px">
          {description}
        </Text>
      )}
    </Grid>
  );
};
