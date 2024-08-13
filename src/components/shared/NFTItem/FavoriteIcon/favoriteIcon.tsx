import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { HeartIcon } from "../../icons/HeartIcon";

export const FavoriteIcon = ({ favorited }: { favorited: boolean }) => {
  return (
    <Tooltip label={"Add to favorite"}>
      <Flex
        alignItems="center"
        justify="center"
        borderRadius="50%"
        bg="rgba(0,0,0,0.1)"
        backdropFilter="blur(12px)"
        boxSize="24px"
        right="10px"
        top="10px"
        pos="absolute"
        zIndex="1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Box color="white" fontWeight="bold" fontSize="16px">
          <HeartIcon on={favorited} />
        </Box>
      </Flex>
    </Tooltip>
  );
};
