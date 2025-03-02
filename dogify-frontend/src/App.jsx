import { Route, createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider} from "react-router-dom"
import './App.css'
import Upload from "./Upload";
import Login from './Login';
import Navbar from "./Navbar";
import Dashboard from './layout/Dashboard';
import { UserContext } from "./utils/contextFile"
import { useEffect, useState } from "react";
import ErrorPage from "./Error";
import {ChakraProvider} from "@chakra-ui/react";
import Signup from "./Signup";
import { authUser } from "./utils/authUser";
// import Chat from "./views/Chat";
// import Docs from "./views/Docs";
// import TaskManager from "./views/TaskManager";
import Default from "./Default";
import Forgot from "./Forgot";
import ResetPassord from "./ResetPassword";


function App() {


  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  // const [ addRoom, setAddRoom ] = useState(0);
  const [ hasForgotten, setHasForgotten] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await authUser();
      setIsLoggedIn(loggedIn)
      setIsLoading(false)
    };
    checkAuth();
  },[])
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="login" element={isLoggedIn ? <Navigate to={"/dashboard/"+`${isLoggedIn}`} replace /> : <Login/>}>
        </Route>
        <Route path="dashboard/:id" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace/>}>
          <Route path="" element={isLoggedIn ? <Default/>: <Navigate to="/login" replace/>}></Route>
          {/* <Route path=":room/chat" element={isLoggedIn ? <Chat/> : <Navigate to="/login" replace/>}></Route>
          <Route path=":room/document" element={isLoggedIn ? <Docs/> : <Navigate to="/login" replace/>}></Route>
          <Route path=":room/task_manager" element={isLoggedIn ? <TaskManager/> : <Navigate to="/login" replace/>}></Route> */}
        </Route>
        <Route path="signup" element={isLoggedIn ? <Navigate to={"/dashboard/"+`${isLoggedIn}`} replace/> : <Signup />}></Route>
        <Route path="" element={isLoggedIn ? <Navigate to={"/dashboard/"+`${isLoggedIn}`} replace/> : <Navigate to="/login"/>}></Route>
        <Route path="login/forgot" element={hasForgotten ? <Forgot/> : <Navigate to="/login" replace/>}></Route>
        <Route path="login/forgot/:id/:otp" element={hasForgotten ? <ResetPassord/> : <Navigate to="/login" replace/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Route>
    )
  )

  if(isLoading){
    return <div>Loading ...</div>
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, hasForgotten, setHasForgotten}}>
     <ChakraProvider>
      <RouterProvider router={router} />
      <Navbar/>
      <Upload/>

      
     </ChakraProvider>
    </UserContext.Provider>

    
  )
}

export default App

