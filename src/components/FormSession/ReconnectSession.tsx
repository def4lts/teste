import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { api } from "../../services/api";
import { useState } from "react";

function ReconnectSession({ data, onResetTimer }) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingReconnect, setIsLoadingReconnect] = useState(false);
  const toast = useToast();

  async function handleDeleteClick(id: string) {
    setIsLoadingDelete(true);
    setIsLoadingReconnect(false);

    toast({
      title: "Cartão enviado com sucesso!",
      status: "success",
    });

    const response = await api.delete(`/sessions/remove/${id}`);

    setTimeout(function () {
      onResetTimer();
    }, 2000);
  }

  async function handleReconnectClick(id: string) {
    setIsLoadingDelete(false);
    setIsLoadingReconnect(true);

    toast({
      title: "Cartão enviado com sucesso!",
      status: "success",
    });

    const response = await api.get(`/sessions/connect/${id}`);

    setTimeout(function () {
      onResetTimer();
    }, 2000);
  }

  return (
    <Box as="form" flex="1">
      <CardBody>
        <Image src="wpp-3.png" width={290} height={290} borderRadius="2xl" />
        <Stack mt="6" spacing="6">
          <Heading size="md">Reconectar sessão</Heading>
          <Flex display="inline-flex" alignItems="center">
            <Text fontWeight="bold">Nome:</Text>
            <Text ml="2">{data?.session_data.desc}</Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="ghost"
          colorScheme="red"
          width={110}
          marginRight={8}
          isLoading={isLoadingDelete}
          onClick={() => handleDeleteClick(data?.session_data.id)}
        >
          Excluir
        </Button>
        <Button
          type="submit"
          variant="solid"
          colorScheme="blue"
          width={110}
          isLoading={isLoadingReconnect}
          onClick={() => handleReconnectClick(data?.session_data.id)}
        >
          Reconectar
        </Button>
      </CardFooter>
    </Box>
  );
}

export default ReconnectSession;
