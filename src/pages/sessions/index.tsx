import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Icon,
  Spinner,
  Card,
  CardBody,
  Image,
  Stack,
  Divider,
  CardFooter,
  Input,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { RiCloudLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import QRCode from "react-qr-code";
import { useForm } from "react-hook-form";
import CreateSession from "../../components/FormSession/CreateSession";
import ReconnectSession from "../../components/FormSession/ReconnectSession";
import Session from "../../components/FormSession/Session";
import QRCodeSession from "../../components/FormSession/QRCode";

export default function UserList() {
  const [primaryData, setPrimaryData] = useState(null);
  const [intervalTimePrimary, setIntervalTimePrimary] = useState(100);

  const [secondaryData, setSecondaryData] = useState(null);
  const [intervalTimeSecondary, setIntervalTimeSecondary] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      api.get(`/sessions/my-session`).then((response) => {
        if (response.data.error) {
          setIntervalTimePrimary(1000 * 60 * 10);
          setPrimaryData(response.data);
        } else {
          setIntervalTimePrimary(5000);
          setPrimaryData(response.data);
          if (response.data.instance_data.phone_connected) {
            setIntervalTimePrimary(1000 * 60 * 10);
          }
        }
      });
    }, intervalTimePrimary);
    return () => clearInterval(interval);
  }, [intervalTimePrimary]);

  interface CallbackFunction {
    (): void;
  }

  const resetTimer = () => {
    setIntervalTimePrimary(1000);
  };

  const { register, handleSubmit, formState } = useForm();

  async function createSecondary(description) {
    const response = await api.post(`/secondary`, {
      description: description,
    });

    setSecondaryData(response.data);
    setIntervalTimeSecondary(5000);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Stack mt="0" spacing="5" direction="row">
          {
            //sessão primaria
          }
          <Card maxW="sm">
            {primaryData?.error ? (
              <>
                {primaryData?.message === "Primary session not found" ? (
                  <CreateSession
                    type="primary"
                    onResetTimer={resetTimer}
                    connecting="false"
                  />
                ) : (
                  <ReconnectSession
                    data={primaryData}
                    onResetTimer={resetTimer}
                  />
                )}
              </>
            ) : (
              <>
                {primaryData?.instance_data?.phone_connected ? (
                  <Session data={primaryData} onResetTimer={resetTimer} />
                ) : (
                  <QRCodeSession data={primaryData} onResetTimer={resetTimer} />
                )}
              </>
            )}
          </Card>

          {
            //sessão secundaria
          }

          <Card maxW="sm">
            {!secondaryData ? (
              <>
                <Box
                  as="form"
                  flex="1"
                  onSubmit={handleSubmit(createSecondary)}
                >
                  <CardBody>
                    <Image
                      src="wpp.png"
                      width={290}
                      height={290}
                      borderRadius="2xl"
                    />
                    <Stack mt="6" spacing="6">
                      <Heading size="md">Criar sessão secundária</Heading>
                      <Input
                        variant="outline"
                        placeholder="Nome da sessão"
                        maxW="sm"
                        {...register("description")}
                      />
                      <Input
                        type="hidden"
                        value="secondary"
                        {...register("session", { valueAsDate: true })}
                      />
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="ghost"
                      colorScheme="blue"
                      width={240}
                      isLoading={formState.isSubmitting}
                    >
                      Criar
                    </Button>
                  </CardFooter>
                </Box>
              </>
            ) : (
              <>
                {!secondaryData?.qrcode ? (
                  <Card maxW="sm">
                    <CardBody opacity={0.2}>
                      <Heading
                        size="md"
                        display="inline-flex"
                        width={290}
                        height={475}
                      >
                        <Spinner
                          position="absolute"
                          top="50%"
                          left="50%"
                          size="lg"
                          transform="translate(-50%, -50%)"
                        />
                      </Heading>
                    </CardBody>
                  </Card>
                ) : (
                  <>
                    <CardBody>
                      {!secondaryData?.ready ? (
                        <QRCode value={secondaryData?.qrcode} size={290} />
                      ) : (
                        <Image
                          src="wpp-2.png"
                          width={290}
                          height={290}
                          borderRadius="2xl"
                        />
                      )}
                      <Stack mt="6" spacing="1">
                        <Heading size="md" display="inline-flex">
                          <Text fontWeight="bold">Sessão secundária ativa</Text>
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
                          <Text ml="2">{secondaryData?.description}</Text>
                        </Flex>
                        <Flex display="inline-flex" alignItems="center">
                          <Text fontWeight="bold">Pronto:</Text>
                          <Text ml="2">
                            {secondaryData?.ready ? "Sim" : "Não"}
                          </Text>
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
                        isLoading={formState.isSubmitting}
                        //onClick={deleteSecondary}
                      >
                        Excluir
                      </Button>
                    </CardFooter>
                  </>
                )}
              </>
            )}
          </Card>

          {
            //sessões auxiliares
          }

          <Card maxW="sm" bg="rgba(50, 50, 50, 0.4)">
            <CardBody opacity={0.2} filter="blur(4px)">
              <Image
                src="wpp-1.png"
                alt="wpp"
                width={290}
                height={480}
                borderRadius="2xl"
              />
            </CardBody>
            <Button
              as="a"
              href="/sessions/auxiliary"
              position="absolute"
              top="50%"
              left="50%"
              size="lg"
              transform="translate(-50%, -50%)"
              variant="solid"
              colorScheme="blue"
            >
              Sessões auxiliares
            </Button>
          </Card>
        </Stack>
      </Flex>
    </Box>
  );
}
