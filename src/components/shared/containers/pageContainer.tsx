import { Grid } from "@chakra-ui/react";
import { CenterContainer } from "./CenterContainer/centerContainter";

export const PageContainer = ({
  children,
  noBottomMargin = false,
  noTopMargin = false,
  gap = "0px",
}: {
  children: React.ReactNode;
  noBottomMargin?: boolean;
  noTopMargin?: boolean;
  gap?: string;
}) => {
  return (
    <Grid
      my="42px"
      mt={noTopMargin ? "0px" : "42px"}
      mb={noBottomMargin ? "0px" : "42px"}
      pos="relative"
    >
      <CenterContainer gap={gap}>{children}</CenterContainer>
    </Grid>
  );
};
