import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  AbsoluteCenter,
  Stat,
  Stack,
  Avatar,
  Badge,
  Divider,
  StatLabel,
  StatNumber,
  StatArrow,
  StatGroup,
  Card,
  CardBody,
  SkeletonCircle,
  CardFooter,
  Tag,
  TagLabel,
  useBreakpointValue,
  HStack
} from "@chakra-ui/react";

import { Fade } from "react-reveal";


// const baseURL =
// "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const cryptoURL = "http://localhost:3001/";
const exchangeRateURL = "https://open.er-api.com/v6/latest/USD";

export default function Main() {
  const [data, setData] = useState([]);
  const [pound, setPound] = useState([]);


  // Chakra responsive state
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ctyptoData = await fetch(cryptoURL);
        const res = await ctyptoData.json();
        setData(res);
        console.log(res);

        const gbpRateData = await fetch(exchangeRateURL);
        const res2 = await gbpRateData.json();
        console.log(res2.rates);
        setPound(res2.rates.GBP);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack spacing={1} bgGradient="linear(gray.100, teal.300, blue.200)">
      <main>
        <Box position="relative" padding="10">
          <Divider />

          <AbsoluteCenter color="green.700" fontWeight="bold" px="7" fontSize="lg">
            Today's crypto currency update in GBP
          </AbsoluteCenter>
        </Box>

        {data.map((el, index) => {
          return (
            <Fade bottom cascade>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                mt={2}
                p={1}
                bgGradient="linear(to-t,gray.50, teal.50, orange.50)"
                key={index}
              >
                <HStack ml={2}>
                  <Tag size="xs" borderRadius="full" m={3} width={40}>
                    <Avatar src={`${el.image}`} size="md" name="crypto" m={1} />
                    <TagLabel ml={1} p={2}>
                      {el.symbol} GBP
                    </TagLabel>
                  </Tag>
                </HStack>

                <Stack direction="row">
                  <CardBody>
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      gap={5}
                      justifyItems="flex-start"
                    >
                      <GridItem colSpan={1} p={1}>
                        <Box ml="1">
                          <Text fontWeight="bold" gap={1}>
                            {el.name}
                          </Text>
                          <SkeletonCircle
                            size=""
                            startColor="purple.600"
                            endColor="orange.500"
                            height="6px"
                            m={1.5}
                            ml={-1}
                          />
                          <Text
                            fontSize="lg"
                            color="darkred"
                            mr={1}
                            mt={1}
                            pr={1}
                            pt={1}
                            pb={1}
                          >
                            £{Number(el.current_price * pound).toFixed(7)}
                          </Text>
                        </Box>
                      </GridItem>

                      <GridItem colSpan={1} m={1} p={1}>
                        <Badge colorScheme="green" ml={-1}>
                          RANK {el.market_cap_rank}
                        </Badge>

                        <hr
                          style={{
                            backgroundColor: "orange",
                            height: "1.75px",
                            marginLeft: "-5px",
                          }}
                        ></hr>
                        <StatGroup
                          gap={isSmallScreen ? "3" : "6"}
                          mt={2}
                          ml={-1}
                          mb={2}
                        >
                          <Stat
                            mt={-1}
                            mb={-1}
                            p={1}
                            bg="purple.200"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">Total_vol</StatLabel>

                            <StatNumber fontSize="xs">
                              {el.total_volume}
                            </StatNumber>
                          </Stat>
                          <Stat
                            mt={-1}
                            mb={-1}
                            bg="blue.100"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">
                              Changes <br></br>
                            </StatLabel>

                            <StatNumber fontSize="xs">
                              {el.price_change_percentage_24h}%
                            </StatNumber>
                          </Stat>
                          <Stat
                            mt={-1}
                            mb={-1}
                            bg="red.100"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">
                              High <br></br>
                            </StatLabel>
                            <StatNumber fontSize="xs">
                              £{el.high_24h} <StatArrow type="increase" />
                            </StatNumber>
                          </Stat>
                          <Stat
                            mt={-1}
                            mb={-1}
                            bg="yellow.100"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">
                              Low<br></br>
                            </StatLabel>
                            <StatNumber fontSize="xs">
                              £{el.low_24h} <StatArrow type="decrease" />
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </GridItem>
                    
                    </Grid>
                  </CardBody>

                  <CardFooter> </CardFooter>
                </Stack>
              </Card>
            </Fade>
          );
        })}
      </main>
    </Stack>
  );
}


// add an animated info at the right empty space of each cards using another gridItem , don't use card footer
