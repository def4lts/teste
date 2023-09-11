import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { api } from "../../services/api";
import { RiCloudLine } from "react-icons/ri";

function Session({ data, onResetTimer }) {
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const toast = useToast();

  async function handleLogoutClick(id: string) {
    setIsLoadingLogout(true);

    toast({
      title: "Cartão enviado com sucesso!",
      status: "success",
    });

    const response = await api.get(`/sessions/logout/${id}`);

    setTimeout(function () {
      onResetTimer();
    }, 2000);
  }

  return (
    <>
      <CardBody>
        <Image src="wpp-2.png" width={290} height={290} borderRadius="2xl" />
        <Stack mt="6" spacing="1">
          <Heading size="md" display="inline-flex">
            <Text fontWeight="bold">Sessão primária ativa</Text>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="green"
              leftIcon={<Icon as={RiCloudLine} fontSize="16" />}
              ml="auto"
            ></Button>
          </Heading>
          <Flex display="inline-flex" alignItems="center">
            <Text fontWeight="bold">Nome:</Text>
            <Text ml="2">{data?.session_data.desc}</Text>
          </Flex>
          <Flex display="inline-flex" alignItems="center">
            <Text fontWeight="bold">Pronto:</Text>
            <Text ml="2">{data?.ready ? "Sim" : "Não"}</Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="ghost"
          colorScheme="red"
          width={240}
          isLoading={isLoadingLogout}
          onClick={() => handleLogoutClick(data?.session_data.id)}
        >
          Log out
        </Button>
      </CardFooter>
    </>
  );
}

export default Session;
