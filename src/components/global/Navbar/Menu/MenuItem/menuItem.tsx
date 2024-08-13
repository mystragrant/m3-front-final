import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

interface IMenuItem {
  icon?: React.ReactNode;
  content: string;
  href?: string | null;
  onClick?: () => void;
  disabled?: boolean;
  contentHidden?: boolean;
}

const MenuItemBlock: FC<IMenuItem> = ({
  icon,
  content,
  onClick,
  href = null,
  disabled = false,
  contentHidden = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPageSelected = useMemo(
    () => "/" + location.pathname.split("/")[1] === href,
    [location, href],
  );

  return (
    <Flex
      gridGap="16px"
      opacity={disabled ? "0.5" : "1"}
      fontSize="14px"
      h="40px"
      onClick={href && !disabled ? () => navigate(href) : onClick}
      cursor={disabled ? "default" : "pointer"}
      align="center"
    >
      {isPageSelected && (
        <Box pos="absolute" h="30px" w="2px" bg="white" left="0"></Box>
      )}
      <Flex ml="22px">
        <Flex justify="center" w="22px">
          {icon}
        </Flex>
      </Flex>

      {!contentHidden && (
        <Box
          fontFamily="Inter"
          fontWeight={isPageSelected ? "500" : "auto"}
          display={{ base: "none", md: "block" }}
          fontSize="14px"
          color="white"
        >
          {content}
        </Box>
      )}
    </Flex>
  );
};

export const MenuItem = ({
  icon,
  content,
  items = [],
  href = null,
  disabled = false,
  menuOpen,
}: {
  icon: React.ReactNode;
  content: string;
  items?: IMenuItem[];
  href?: string | null;
  disabled?: boolean;
  menuOpen: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (menuOpen === false) onClose();
  }, [menuOpen, onClose]);

  const { textPrimary, textSecondary, borderPrimary } = useThemeProvider();

  return (
    <Flex
      flexDir="column"
      borderColor={borderPrimary}
      userSelect="none"
      position="relative"
      onClick={isOpen ? onClose : onOpen}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <MenuItemBlock
        onClick={isOpen ? onClose : onOpen}
        icon={icon}
        content={content}
        disabled={disabled}
        href={href}
        contentHidden={!menuOpen}
      />
      {items.length > 0 && menuOpen && (
        <Flex
          align="center"
          justify="center"
          position="absolute"
          cursor={!disabled ? "pointer" : "default"}
          top="22px"
          boxSize="20px"
          right="20px"
          opacity={isOpen && !disabled ? "1" : "0.5"}
        >
          <Grid
            padding="0px 10px"
            transform={`rotate(${isOpen && !disabled ? "180" : "0"}deg)`}
          >
            <ChevronDownIcon boxSize="20px" />
          </Grid>
        </Flex>
      )}

      {items.length > 0 && !disabled && menuOpen && (
        <Flex
          flexDir="column"
          ml="14px"
          gap="10px"
          onClick={(e) => e.stopPropagation()}
          color="#545F7C"
          padding="20px"
          pt="0px"
          display={isOpen ? "flex" : "none"}
        >
          {items.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Box
                onClick={() => navigate(item.href ? item.href : "/")}
                cursor="pointer"
                key={item.href}
                fontSize="14px"
                color={active ? textPrimary : textSecondary}
                _hover={{ color: textPrimary }}
                fontWeight={active ? "500" : "auto"}
              >
                {item.content}
              </Box>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};
