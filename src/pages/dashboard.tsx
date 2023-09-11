import {
  Flex,
  Grid,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import IconBox from "../components/Icons/IconBox";

import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  ProfileIcon,
  WalletIcon,
  WhatsappIcon,
} from "../components/Icons/Icons";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Projects from "../components/Projects/Projects";
import OrdersOverview from "../components/Orders/OrdersOverview";
import { useAll } from "../services/hooks/useAll";

const avatar1 =
  "https://i.pinimg.com/originals/5a/72/e1/5a72e1f05f9e2e1b76a8438a7490dc3b.jpg";

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, isFetching, error } = useAll();

  const dashboardTableData = [];
  const timelineData = [];

  data?.purchasesSlice.map((purchase) => {
    const purchaseData = {
      logo: WhatsappIcon,
      title: purchase.id,
      date: `R$${purchase.price}`,
      color: "teal.300",
    };

    timelineData.push(purchaseData);
  });

  data?.clientsSlice.map((client) => {
    const dataChart = {
      logo: ProfileIcon,
      name: client.name,
      purchases: 0,
      photos: [avatar1],
      number: client.number,
    };

    dashboardTableData.push(dataChart);
  });

  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("white", "white");

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Flex flexDirection="column" pt={{ base: "20px", md: "35px" }}>
          <SimpleGrid
            columns={{ sm: 1, md: 2, xl: 4 }}
            spacing={["5px", "125px"]}
            maxWidth={["320px", "1480px"]}
          >
            <Card minH="83px">
              <CardBody>
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat me="auto">
                    <StatLabel
                      fontSize="sm"
                      color="gray.400"
                      fontWeight="bold"
                      pb=".1rem"
                    >
                      Vendas
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="lg" color={textColor}>
                        {data?.totalPurchases}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color="green.400"
                        fontWeight="bold"
                        ps="10px"
                        fontSize="md"
                      >
                        +55%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                    <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
            <Card minH="83px">
              <CardBody>
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat me="auto">
                    <StatLabel
                      fontSize="sm"
                      color="gray.400"
                      fontWeight="bold"
                      pb=".1rem"
                    >
                      Clientes
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="lg" color={textColor}>
                        {data?.totalClients}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color="green.400"
                        fontWeight="bold"
                        ps="10px"
                        fontSize="md"
                      >
                        +5%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                    <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
            <Card minH="83px">
              <CardBody>
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat>
                    <StatLabel
                      fontSize="sm"
                      color="gray.400"
                      fontWeight="bold"
                      pb=".1rem"
                    >
                      Trocas
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="lg" color={textColor}>
                        00
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color="red.500"
                        fontWeight="bold"
                        ps="20px"
                        fontSize="md"
                      >
                        -14%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Spacer />
                  <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                    <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
            <Card minH="83px">
              <CardBody>
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat me="auto">
                    <StatLabel
                      fontSize="sm"
                      color="gray.400"
                      fontWeight="bold"
                      pb=".1rem"
                    >
                      Cartões
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize="lg"
                        color={textColor}
                        fontWeight="bold"
                      >
                        {data?.totalProducts}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="0px"
                        color="green.400"
                        fontWeight="bold"
                        ps="20px"
                        fontSize="md"
                      >
                        +8%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                    <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
          </SimpleGrid>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
            templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
            gap="64px"
          >
            {isWideVersion ? (
              <Projects
                title={"Novos usuários"}
                amount={5}
                captions={["Nome", "Compras", "Foto", "Número"]}
                data={dashboardTableData}
              />
            ) : (
              <Projects
                title={"Novos usuários"}
                amount={5}
                captions={["Nome", "", "Foto", ""]}
                data={dashboardTableData}
              />
            )}
            <OrdersOverview
              title={"Últimas compras"}
              amount={30}
              data={timelineData}
            />
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
}
