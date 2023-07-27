import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";

// const baseURL =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const cryptoURL = "http://localhost:3001/";
const exchangeRateURL = "https://open.er-api.com/v6/latest/USD";

export default function Main() {
  const [data, setData] = useState([]);
  const [pound, setPound] = useState([]);

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
    
    <Stack spacing={1} bgGradient="linear(yellow.100, purple.400, blue.200)">
      <main>
        <Box position="relative" padding="10">
          
          <Divider />

          <AbsoluteCenter bg="white" px="4">
            Today's crypto currency update
          </AbsoluteCenter>
        </Box>
       

        {data.map((el) => {
          return (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              mt={1}
              p={1}
            >

              <Tag size="lg" borderRadius="full" p={1} m={4}>
                <Avatar src={`${el.image}`} size="md" name="crypto" m={1} />

                <SkeletonCircle
                  size="8"
                  startColor="red.500"
                  endColor="purple.500"
                  height="5px"
                  m={2}
                />
                <TagLabel ml={1} p={2}>
                  {el.symbol}
                </TagLabel>
              </Tag>

              <Stack direction="row">
                <CardBody>
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap={5}
                    justifyItems="flex-start"
                  >
                    <GridItem colSpan={1} p={2}>
                      <Box ml="1">
                        <Text fontWeight="bold" gap={1}>
                          {el.name}
                        </Text>
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

                    <GridItem colStart={2} colEnd={3}>
                      <Badge colorScheme="green" ml={-1}>
                        RANK {el.market_cap_rank}
                      </Badge>

                      <StatGroup gap={isSmallScreen ? "2" : "5"} mt={1}>
                        <Stat>
                          <StatLabel>High (24hrs)</StatLabel>

                          <StatNumber fontSize="xs">
                            <StatArrow type="increase" />
                            £{el.high_24h}
                          </StatNumber>
                        </Stat>
                        <Stat>
                          <StatLabel>
                            Low<br></br> (24hrs)
                          </StatLabel>

                          <StatNumber fontSize="xs">
                            <StatArrow type="decrease" />
                            £{el.low_24h}
                          </StatNumber>
                        </Stat>
                        <Stat>
                          <StatLabel>
                            Total_volume<br></br>
                          </StatLabel>

                          <StatNumber fontSize="xs">
                            {el.total_volume}
                          </StatNumber>
                        </Stat>
                      </StatGroup>
                    </GridItem>
                  </Grid>
                </CardBody>

                <CardFooter></CardFooter>
              </Stack>
            </Card>
          );
        })}
      </main>
    </Stack>
  );
}

// Add key for the map
// Add auto sever running before frontend request in backend 
