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
import QRCode from "react-qr-code";
import { useState } from "react";

import { api } from "../../services/api";
import { RiCloudLine } from "react-icons/ri";

function QRCodeSession({ data, onResetTimer }) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const toast = useToast();

  async function handleDeleteClick(id: string) {
    setIsLoadingDelete(true);

    toast({
      title: "Cartão enviado com sucesso!",
      status: "success",
    });

    const response = await api.delete(`/sessions/remove/${id}`);

    setTimeout(function () {
      onResetTimer();
    }, 2000);
  }

  return (
    <>
      <CardBody>
        {data?.instance_data?.qr ? (
          <QRCode value={data?.instance_data?.qr} size={290} />
        ) : (
          <></>
        )}
        <Stack mt="6" spacing="1">
          <Heading size="md" display="inline-flex">
            <Text fontWeight="bold">Escaneie o QRCode</Text>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="red"
              leftIcon={<Icon as={RiCloudLine} fontSize="16" />}
              ml="auto"
            ></Button>
          </Heading>
          <Flex display="inline-flex" alignItems="center">
            <Text fontWeight="bold">Nome:</Text>
            <Text ml="2">{data?.session_data.desc}</Text>
          </Flex>
          <Flex display="inline-flex" alignItems="center">
            <Text fontWeight="bold">Tentativas restantes:</Text>
            <Text ml="2">{data?.instance_data.qrRetry}</Text>
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
          onClick={() => handleDeleteClick(data?.session_data.id)}
        >
          Excluir
        </Button>
      </CardFooter>
    </>
  );
}

export default QRCodeSession;
