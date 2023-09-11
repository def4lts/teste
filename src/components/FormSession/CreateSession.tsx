import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "../../services/api";

function CreateSession({ type, onResetTimer, connecting }) {
  const createSessionSchema = yup.object().shape({
    description: yup.string().required("Nome da sessão obrigatório"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createSessionSchema),
  });

  const toast = useToast();

  async function create({ description }) {
    const response = await api.post(`/sessions/create`, {
      desc: description,
      type: type,
    });

    setTimeout(function () {
      toast({
        title: "Sessão criada com sucesso",
        status: "success",
      });
      onResetTimer();
    }, 2000);
  }

  return (
    <Box as="form" flex="1" onSubmit={handleSubmit(create)}>
      <CardBody>
        <Image src="wpp.png" width={290} height={290} borderRadius="2xl" />
        <Stack mt="6" spacing="6">
          <Heading size="md">Criar sessão</Heading>
          <Input
            variant="outline"
            placeholder="Nome da sessão"
            maxW="sm"
            {...register("description")}
          />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="solid"
          colorScheme="blue"
          width={240}
          isLoading={formState.isSubmitting}
        >
          Criar
        </Button>
      </CardFooter>
    </Box>
  );
}

export default CreateSession;
