import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SeparateScreenProps {
  children: ReactNode;
}

export function SeparateScreen({ children }: SeparateScreenProps) {
  return (
    <Flex width={["100%", "50%"]} height="100%" right={0} position="absolute">
      <Flex
        margin={["50", "0 auto"]}
        top={["4%", "14%"]}
        position="absolute"
        left={["47%", "47%"]}
        marginLeft={["-110px", "-150px"]}
      >
        {children}
      </Flex>
    </Flex>
  );
}
