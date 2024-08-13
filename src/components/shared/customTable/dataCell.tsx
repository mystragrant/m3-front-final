import { Box, Flex, Td } from "@chakra-ui/react";
import React from "react";

export const DataCell = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) => {
  return (
    <Td>
      <Box display="inline">{children}</Box>{" "}
      {label && (
        <Box display="inline" color="#727683">
          {label}
        </Box>
      )}
    </Td>
  );
};
