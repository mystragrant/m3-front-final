import { Flex } from "@chakra-ui/react";

export const CenterContainer = ({
  children,
  noRelative = false,
  gap = "0px",
}: {
  children: React.ReactNode;
  noRelative?: boolean;
  gap?: string;
}) => {
  return (
    <Flex
      position={noRelative ? "initial" : "relative"}
      flexDir="column"
      gap={gap}
      paddingX={{ base: "40px", md: "60px" }}
      margin="0 auto"
      w="100%"
      maxW="1440px"
    >
      {children}
    </Flex>
  );
};
