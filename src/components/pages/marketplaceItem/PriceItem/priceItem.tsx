import { Flex } from "@chakra-ui/react";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";

export const PriceItem = ({
  chain,
  price,
}: {
  chain: string;
  price: string;
}) => {
  return (
    <Flex align="center" gap="8px" fontWeight="medium" fontSize="14px">
      <MultichainIcon chain={chain} />
      {price}
    </Flex>
  );
};
