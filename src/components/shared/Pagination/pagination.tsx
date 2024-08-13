import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";

export const Pagination = ({
  onNext,
  onPrev,
  maxPages = 1,
  page,
  onClick,
}: {
  onNext: () => void;
  maxPages?: number;
  onPrev: () => void;
  page: number;
  onClick: (item: number) => void;
}) => {
  return (
    <Flex gap="10px" align="center">
      <ChevronLeftIcon boxSize="20px" cursor="pointer" onClick={onPrev} />
      {page}
      <ChevronRightIcon boxSize="20px" cursor="pointer" onClick={onNext} />
    </Flex>
  );
};
