import './App.css';
import { ChakraProvider } from "@chakra-ui/react"; 
import { extendTheme } from "@chakra-ui/react";
import Header from './Header';
import Main from './Main';
import LibraryTest from './LibraryTest';

function App() {
  const customTheme = extendTheme();
  return (
    <ChakraProvider theme={customTheme}>
      <div className="App">
        <Header />
        <LibraryTest />
        <Main />
      </div>
    </ChakraProvider>
  );
}

export default App;
