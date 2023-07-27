import { Box, ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";

const LibraryTest = () => {
    const customTheme = extendTheme();
  return (
    <ChakraProvider theme={customTheme}>
      {/* <Box w="100%" h="200px" bgGradient="linear(to-l, #7928CA, #FF0080)" /> */}
      {/* <Text
        bgGradient="linear(to-l, #1221AA, #AE10E0)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Chakra UI
      </Text> */}

      <Skeleton startColor="yollow.400" endColor="orange.500" height="20px" />
      <Box p={4} display={{ md: "flex" }}>
        <Box flexShrink={0}>
          
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          
          
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LibraryTest;
