import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useThemeProvider } from "../../../../../../../providers/Theme/useThemeProvider";

export const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  loading,
}: {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  loading?: boolean;
}) => {
  const { backgroundPrimary } = useThemeProvider();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="27px" pb="50px" bg={backgroundPrimary}>
        {!loading && (
          <ModalHeader mb="40px" fontWeight="normal" fontSize="20px">
            {title}
          </ModalHeader>
        )}
        {!loading && <ModalCloseButton top="42px" right="27px" />}
        <ModalBody>
          {loading ? (
            <Flex
              m="60px 0px 40px"
              flexDir="column"
              gap="20px"
              align="center"
              justify="center"
            >
              <Spinner />
              <Box>Processing...</Box>
            </Flex>
          ) : (
            children
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
