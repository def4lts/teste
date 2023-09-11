import { useState } from "react";
import { Box, Flex, Button, Heading, Icon, Spinner } from "@chakra-ui/react";
import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Checkbox, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiFileCopyLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useGroups } from "../../services/hooks/useGroups";

export default function UserList() {
  const [curPage, setCurPage] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = "Texto que será copiado";

  function copyToClipboard(inviteCode: string) {
    navigator.clipboard.writeText(`https://chat.whatsapp.com/${inviteCode}`);
    setIsCopied(true);
  }

  const { data, isLoading, isFetching, error } = useGroups(curPage);

  async function handlePrefetchClient() {
    await queryClient.prefetchQuery(
      ["groups"],
      async () => {
        const response = await api.get(`/primary/my-groups/${curPage}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutos
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Grupos
              {!isLoading && isFetching && <Spinner color="gray.500" ml="4" />}
            </Heading>

            <Button
              as="a"
              href="/cards/create"
              size="sm"
              fontSize="sm"
              colorScheme="messenger"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
            {/*</Link>*/}
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos cartões</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="messenger" />
                    </Th>
                    <Th>Nome</Th>
                    <Th>Descrição</Th>
                    <Th>Convite</Th>
                    <Th>Membros</Th>
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.groups.map((group) => (
                    <Tr key={group.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="messenger" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" width={100}>
                            {group.name}
                          </Text>
                        </Box>
                      </Td>

                      <Td>
                        <Text noOfLines={1}>{group.desc}</Text>
                      </Td>
                      <Td>
                        <Text noOfLines={1}>{group.inviteCode}</Text>
                      </Td>
                      <Td>{group.numberParticipants}</Td>
                      <Td>
                        <Button
                          onClick={() => copyToClipboard(group.inviteCode)}
                          size="sm"
                          fontSize="sm"
                          colorScheme={isCopied ? "gray" : "green"}
                          color={isCopied ? "black" : "white"}
                          disabled={isCopied}
                          leftIcon={<Icon as={RiFileCopyLine} fontSize="16" />}
                        >
                          {isCopied ? "Texto copiado!" : "Copiar texto"}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={curPage}
                onPageChange={setCurPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
