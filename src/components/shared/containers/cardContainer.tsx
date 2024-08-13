import { Grid, useColorModeValue } from "@chakra-ui/react";

export const CardContainer = ({
  children,
  paddingSize = 6,
  bg = "white",
}: {
  children: React.ReactNode;
  paddingSize?: number;
  bg?: string;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const cardBg = useColorModeValue(
    "inputBackground.light",
    "inputBackground.dark",
  );

  return (
    <Grid
      padding={paddingSize}
      bg={cardBg}
      border="1px solid"
      pos="relative"
      borderColor={borderColor}
      borderRadius="8px"
      fontFamily="Sora, sans-serif"
    >
      {children}
    </Grid>
  );
};
