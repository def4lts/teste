import { useEffect, useState } from "react";
import CreateSession from "../../components/FormSession/CreateSession";
import { api } from "../../services/api";
import { Box, Card, Flex, Stack } from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import Session from "../../components/FormSession/Session";
import ReconnectSession from "../../components/FormSession/ReconnectSession";
import QRCodeSession from "../../components/FormSession/QRCode";

export default function CreateAux() {
  const [data, setData] = useState(null);
  const [intervalTime, setIntervalTime] = useState(500);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      api.get(`/sessions/my-sessions-aux`).then((response) => {
        console.log(response.data);
        if (response?.data?.length > 0) {
          setData(response.data);
        } else {
          setData(response.data);
          setIntervalTime(1000 * 60 * 10);
        }
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime]);

  const resetTimerQR = () => {
    setIntervalTime(1000);
    setConnecting(false);
  };

  const resetTimerConnect = () => {
    setIntervalTime(1000 * 60 * 10);
    setConnecting(false);
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Stack
          mt="0"
          spacing="0"
          direction="row"
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "10px",
          }}
        >
          <Card maxW="sm">
            <CreateSession
              type="auxiliary"
              onResetTimer={resetTimerQR}
              connecting={connecting}
            />
          </Card>
          {data?.map((aux: any) => (
            <Card maxW="sm" key={aux?.session_data.id}>
              {aux?.error ? (
                <>
                  <ReconnectSession
                    data={aux}
                    onResetTimer={resetTimerConnect}
                  />
                </>
              ) : (
                <>
                  {aux?.instance_data?.phone_connected ? (
                    <Session data={aux} onResetTimer={resetTimerConnect} />
                  ) : (
                    <QRCodeSession data={aux} onResetTimer={resetTimerQR} />
                  )}
                </>
              )}
            </Card>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
}
