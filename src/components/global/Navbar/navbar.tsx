import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Menu } from "./Menu/menu";
import { useDisclosure } from "@chakra-ui/core";
import { Logo } from "./Logo/logo";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const navBgColor = useColorModeValue(
    "navbarBackground.light",
    "navbarBackground.dark",
  );

  const { textPrimary, borderPrimary } = useThemeProvider();

  return (
    <Flex
      bg={navBgColor}
      color={textPrimary}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)"
      h="100vh"
      justifyContent="flex-start"
      flexDir="column"
      onMouseOver={isOpen ? () => {} : onOpen}
      onMouseLeave={onClose}
      borderRight="0.5px solid"
      borderColor={borderPrimary}
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      maxW="250px"
      width={isOpen ? "250px" : "66px"}
      position="fixed"
      zIndex="1001"
      onMouseEnter={onOpen}
      transition="0.1s"
    >
      <Flex
        h="74px"
        align="center"
        borderBottom="1px solid"
        borderColor={borderPrimary}
      >
        <Logo isOpen={isOpen} />
      </Flex>

      <Menu menuOpen={isOpen} />
    </Flex>
  );
};
