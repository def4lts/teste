import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Form } from "../Form";
import { SeparateScreen } from "./SeparateScreen";

export function FormLogin() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex w="100%" h="100%" position="absolute" zIndex={0}>
        {isWideVersion && (
          <Flex
            position="absolute"
            left={0}
            width="50%"
            height="100%"
            zIndex={4}
            background="#00000000 url(out-0.png)"
            backgroundSize="cover"
            backgroundPosition="50% 50%"
          ></Flex>
        )}
      </Flex>
      {isWideVersion ? (
        <SeparateScreen>
          <Form />
        </SeparateScreen>
      ) : (
        <Form />
      )}
    </Flex>
  );
}
