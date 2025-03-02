
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './Dashboard'
import Navbar from './Navbar'

function App() {


  return (
    <ChakraProvider>
    <Navbar/>

    <Dashboard/>
    </ChakraProvider>
  )
}

export default App
