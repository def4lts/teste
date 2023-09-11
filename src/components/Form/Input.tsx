import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { FormErrorMessage } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  type?: string;
  placeHolder?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, name, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!label || (
        <FormLabel color="gray.200" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        color="gray.400"
        borderColor="green.50"
        border="2px"
        borderRadius="50"
        focusBorderColor="#003a03"
        size="lg"
        _hover={{
          bgColor: "brand.50",
        }}
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
