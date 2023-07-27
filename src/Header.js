import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react"; 

export default function Header(){

  const outerBoxStyles = {
    boxSize: 'full',
    height: '280px',
    p: '10',
    background:
      'url(https://www.uktech.news/wp-content/uploads/2021/05/Crypto-Terms.jpg) center/cover no-repeat',
  }
   
    return (
      <header>
        <Box sx={outerBoxStyles} className="App-header">
          <Box filter="auto" brightness="90%">
            <Text
              bgGradient="linear(to-l, #1221AA, #AE10E0)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
              filter="auto"
              brightness="75%"
            >
              <Heading size="2xl">CRYPTO CURRENCY</Heading>
            </Text>
            <div className="line"></div>
            <Text size="xs">Worldwide update</Text>{" "}
          </Box>
        </Box>
        
      </header>
    );
}