// Chakra imports
import {
  Flex,
  Icon,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import DashboardTableRow from "../Tables/DashboardTableRow";

const Projects = ({ title, amount, captions, data }) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const textColor = useColorModeValue("white", "white");

  return (
    <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
          <Flex align="center">
            <Icon
              as={IoCheckmarkDoneCircleSharp}
              color="teal.300"
              w={4}
              h={4}
              pe="3px"
            />
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              <Text fontWeight="bold" as="span">
                {amount} +
              </Text>{" "}
              esse mês.
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <Table variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            {captions.map((caption, idx) => {
              return (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => {
            return isWideVersion ? (
              <DashboardTableRow
                key={row.name}
                name={row.name}
                logo={row.logo}
                purchases={row.purchases}
                photos={row.photos}
                budget={row.number}
              />
            ) : (
              <DashboardTableRow
                key={row.name}
                name={row.name}
                logo={row.logo}
                photos={row.photos}
              />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Projects;
