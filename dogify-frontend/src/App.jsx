import Premium from './premium'
import './App.css'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard';

function App() {


  return (
    <>
      <ChakraProvider>
      <Router> 
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </Router>
    </ChakraProvider>
    </>
  )
}

export default App
