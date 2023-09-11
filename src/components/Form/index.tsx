import {
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "@fontsource/acme";

const Empresa = "<Neural Dash />";

type SignInFormData = {
  username: string;
  password: string;
};

const SignInForSchema = yup.object().shape({
  username: yup.string().required("Usuário obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Digite ao menos 6 letras ou números"),
});

export function Form() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(SignInForSchema),
  });

  const errors = formState.errors;

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(values: SignInFormData) {
    await signIn(values);
  }

  return (
    <Flex
      as="form"
      width={["80%", "100%"]}
      maxWidth={360}
      height={["70%", "100%"]}
      maxHeight={560}
      p="8"
      borderRadius={25}
      flexDir="column"
      onSubmit={handleSubmit(handleSignIn)}
      zIndex={3}
      bgColor="gray.800"
      boxShadow="0 0 5px #fff, 0 0 10px #000, 0 0 15px #25D366, 0 0 20px #2BB741"
    >
      <Stack spacing={["5", "9"]}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          textDecoration="underline"
          color="#000"
          textShadow="
                     -1px -1px 0px #f0f0f0,
                     -1px 1px 0px #f0f0f0,
                    1px -1px 0px #f0f0f0,
                    1px 0px 0px #f0f0f0"
        >
          {Empresa}
        </Text>

        <Stack spacing={["3", "4"]}>
          <Input
            name="username"
            type="text"
            label="USUÁRIO:"
            error={errors.username}
            {...register("username")}
          />
          <Input
            name="password"
            type="password"
            label="SENHA:"
            error={errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          variant="transparent"
          border="2px"
          borderColor="green.900"
          fontSize="2xl"
          size="lg"
          isLoading={formState.isSubmitting}
          _hover={{
            color: "gray.500",
          }}
        >
          Entrar
        </Button>
        <Text zIndex={2} fontSize="sm" align="center" color="gray.200">
          ADQUIRIR ACESSO
        </Text>
      </Stack>
    </Flex>
  );
}
