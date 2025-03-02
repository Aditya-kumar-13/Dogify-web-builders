import Premium from './premium'
import './App.css'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {


  return (
    <>
      <ChakraProvider>
      <Premium />
    </ChakraProvider>
    </>
  )
}

export default App
