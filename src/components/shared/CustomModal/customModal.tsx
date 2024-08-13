import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";
import { CustomSelect } from "../inputs/CustomSelect/customSelect";

export const CustomModal = ({
  isOpen,
  onOpen,
  hideHeader = false,
  onClose,
  header,
  body,
  footer,
}: {
  isOpen: boolean;
  hideHeader?: boolean;
  onOpen: () => void;
  onClose: () => void;
  header: React.ReactNode | string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const { backgroundPrimary, borderPrimary } = useThemeProvider();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        minW="600px"
        border="1px solid"
        borderColor={borderPrimary}
        bg={backgroundPrimary}
        padding="24px 40px"
      >
        <Grid padding="10px 0px" templateColumns="1fr auto">
          {hideHeader ? (
            <></>
          ) : (
            <>
              <ModalHeader
                fontSize="16px"
                fontWeight="normal"
                fontFamily="Inter"
                padding="0px"
              >
                {header}
              </ModalHeader>
              <CloseIcon
                cursor="pointer"
                _hover={{ opacity: "0.7" }}
                w="14px"
                onClick={onClose}
              />
            </>
          )}
        </Grid>
        <ModalBody padding="20px 0px">{body}</ModalBody>
        {footer && (
          <ModalFooter
            padding="0px"
            mt="20px"
            display="grid"
            gridTemplateColumns="1fr"
          >
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
