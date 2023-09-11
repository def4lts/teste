import { Flex, Text, Box, Avatar } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type ProfileProps = {
  showName?: boolean;
};
// Só mostra o nome e e-mail se showName = true

export function Profile({ showName = true }: ProfileProps) {
  const { user } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showName && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user?.username}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={user?.name} src={user?.avatarUrl} />
    </Flex>
  );
}

// Flex é um container com display Flex
// Stack é um container que permite espaçamento igual entre os componentes
// HStack é um Stack com display inline-block
// Box é uma div vazia
// Avatar tem a vantagem de mostrar as iniciais, caso não tenha imagem
