import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const CustomTable = ({
  thead,
  children,
}: {
  thead: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <TableContainer>
      <Table
        overflow="hidden"
        borderRadius="8px"
        variant="unstyled"
        color="black"
        bg="#FAFAFA"
        boxShadow="0 1.08px 4.32px 0 rgba(0, 0, 0, 0.09)"
      >
        <Thead h="50px" bg="#E0E2E8" color="#727683" textTransform="capitalize">
          {thead}
        </Thead>
        <Tbody borderRadius="8px">{children}</Tbody>
      </Table>
    </TableContainer>
  );
};
