import { Flex, useColorModeValue } from "@chakra-ui/react";

export const ModalInfoItem = ({
  label,
  item,
}: {
  label: string;
  item: React.ReactNode;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  return (
    <Flex
      padding="16px 20px"
      borderRadius="8px"
      border="1px solid"
      borderColor={borderColor}
      flexDir="column"
      gap="7px"
    >
      <Flex lineHeight="100%">{label}</Flex>
      <Flex pos="relative">{item}</Flex>
    </Flex>
  );
};
