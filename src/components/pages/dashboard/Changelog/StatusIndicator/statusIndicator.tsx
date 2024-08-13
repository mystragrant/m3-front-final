import { Box } from "@chakra-ui/react";

export const StatusIndicator = ({ status }: { status: string }) => {
  return (
    <Box
      border="1px solid"
      borderRadius="2px"
      padding="3px 4px"
      fontSize="10px"
      lineHeight="100%"
      textTransform="uppercase"
      borderColor={
        status === "bug"
          ? "error.500"
          : status === "new"
            ? "brandSecondary.500"
            : "rgba(255,255,255,0.8)"
      }
      color={
        status === "bug"
          ? "error.500"
          : status === "new"
            ? "brandSecondary.500"
            : "rgba(255,255,255,0.7)"
      }
    >
      {status === "improvement"
        ? "IMPROVED"
        : status === "bug"
          ? "BUGFIX"
          : status}
    </Box>
  );
};
