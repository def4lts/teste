import { Text, useBreakpointValue } from "@chakra-ui/react";

export function Logo() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      width="64"
      color="messenger.500"
    >
      {isWideVersion ? "<" : ""}
      <Text as="span" ml="1" color="gray.400">
        {isWideVersion ? "Zero Day" : "0day"}
      </Text>
      <Text as="span" ml="1" color="messenger.500">
        {isWideVersion ? " />" : "."}
      </Text>
    </Text>
  );
}

// Breakpoints do Chakra-UI: tamanhos pré-definidos p/ responsividade
// sm, md, lg, xl, 2xl, 3xl...
