import { Button, Flex, Grid, Input, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { CheckIcon } from "../icons/CheckIcon";

export const CustomField = ({
  addon,
  initialValue = "",
  onSubmit,
  setParentValue,
  placeholder = "",
}: {
  addon?: React.ReactNode;
  initialValue?: string;
  onSubmit: () => void;
  setParentValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}) => {
  const [lastSavedValue, setLastSavedValue] = useState<string>(initialValue);
  const [value, setValue] = useState<string>(initialValue);

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const textColor = useColorModeValue(
    "colorPrimary.light",
    "colorPrimary.dark",
  );

  const placeholderColor = useColorModeValue(
    "colorSecondary.light",
    "colorSecondary.dark",
  );

  useEffect(() => {
    setParentValue(value);
  }, [value]);

  const handleSubmit = () => {
    onSubmit();
    setLastSavedValue(value);
  };

  return (
    <Flex
      h="53px"
      borderRadius="8px"
      border="1px solid "
      borderColor={borderColor}
      padding="10px 16px"
      alignItems="center"
      gap="20px"
    >
      {addon && (
        <Flex align="center" ml="5px" justify="center" boxSize="30px">
          {addon}
        </Flex>
      )}
      <Input
        padding="0"
        _focus={{ boxShadow: "none" }}
        color={textColor}
        defaultValue={initialValue}
        onChange={(e) => setValue(e.target.value)}
        fontSize="14px"
        placeholder={placeholder}
        _placeholder={{ color: placeholderColor }}
        fontWeight="400"
        border="none !important"
        _active={{ outline: "none !important" }}
      />
      <Grid
        justifySelf="flex-end"
        w="100px"
        pos="relative"
        h="100%"
        alignItems="center"
      >
        {value != lastSavedValue ? (
          <Button
            onClick={handleSubmit}
            borderRadius="4px"
            color="white"
            h="100%"
            bg="black"
          >
            Save
          </Button>
        ) : (
          <Flex
            h="100%"
            alignSelf="center"
            align="center"
            justify="center"
            justifySelf="flex-end"
          >
            <CheckIcon />
          </Flex>
        )}
      </Grid>
    </Flex>
  );
};
