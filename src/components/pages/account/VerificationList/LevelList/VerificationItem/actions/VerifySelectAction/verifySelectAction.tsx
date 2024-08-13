import { Button, Grid } from "@chakra-ui/react";

export const VerifySelectAction = ({
  primaryText,
  primaryAction,
  secondaryText,
  secondaryAction,
}: {
  primaryText: string;
  primaryAction: () => any;
  secondaryText: string;
  secondaryAction: () => any;
}) => {
  return (
    <Grid templateColumns="1fr 1fr" gap="20px">
      <Button
        onClick={primaryAction}
        bg="#EFEFEF"
        color="black"
        fontWeight="400"
        fontSize="14px"
      >
        {primaryText}
      </Button>
      <Button
        bg="none"
        _hover={{ bg: "#EFEFEF", color: "black" }}
        color="#EFEFEF"
        border="1px solid #EFEFEF"
        fontWeight="400"
        fontSize="14px"
        onClick={secondaryAction}
      >
        {secondaryText}
      </Button>
    </Grid>
  );
};
