import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/constant';
import { useData } from '../utils/contextFile';
import { authUser } from '../utils/authUser';
import { useParams} from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Navbar from '../Navbar';


export default function Dashboard() {
  const {setIsLoggedIn} = useData();
  const {id, room} = useParams();
  const navigate = useNavigate();
//   const location = useLocation();
//   const [socket, setSocket] = useState(null)
//   const [ currentTab, setCurrentTab ] = useState("");
//   const [ currentuser, setUser ] = useState({});
//   const [ users, setUsers ] = useState([]);

//   useEffect(() => {
//     const s = io(BACKEND_URL)
//     s.on("connect",() =>{
//       console.log("dashboard connected.")
//     })
//     setSocket(s);
//     return () => {
//       s.disconnect();
//     }
//   },[])

//   useEffect(() => {
//     if(socket === null) return
//       socket.on("users-updated", users => {
//       setUsers(users);
//       console.log(users)
//     })
//   },[socket,addRoom])

//   useEffect(() => {
//     const path = location.pathname;
//     const segments = path.split("/");
//     if(segments.includes("chat")){
//       setCurrentTab("chat");
//     }else if(segments.includes("document")){
//       setCurrentTab("document");
//     }else if(segments.includes("task_manager")){
//       setCurrentTab("task_manager");
//     }
//   },[location])
//   useEffect(() => {
//     const Userdata = async (id) => {
//       try{
//         const response = await axios.post(BACKEND_URL+'/userdata',{_id:id});
//         if(response.status === 200){
//           const user = response.data.user;
//           const users = response.data.users;
//           setUser(user);
//           setUsers(users);
//           if(socket){
//           socket.emit("update-users");
//           }
//         }
//       }catch(err){
//         if(err.response){
//           console.log(err.response.data);
//         }else{
//           console.log("Error: ", err.message);
//         }
//       }
//     }
//     Userdata(id);
//   },[id,addRoom,socket])

//  useEffect(() => {

//  },[])
  const logoutFunction = async() => {
    try{
      const response = await axios.get(BACKEND_URL+'/logout',{withCredentials:true} );
      if(response.status === 200){
        const loggedIn = await authUser();
        setIsLoggedIn(loggedIn);
        navigate('/login');
      }
    }catch(err){
      if(err.response){
        console.log(err.response.data);
      }else{
        console.log("Error: ", err.message);
      }
    }

  }

  return (
    <Box w={"100vw"} h={"100vh"} boxSizing='border-box'>
      <Flex w={"100%"} h={'100%'}>
        <Flex as="aside" flexDirection={'column'} justifyContent={'space-between'} w={{base:"35vw", md:"30vw"}} h={'100vh'} bgColor={'gray.600'} flexGrow={0} boxSizing='border-box' p={"8"}>
        <Flex flexDirection={'column'}>
          <Heading as="h3" fontWeight={"thin"} color={"white"} fontSize={"3xl"}>Hello, <Text as="span" whiteSpace={'nowrap'} fontWeight={"bold"} color={"white"} fontSize={{base:'xl', md:'2xl'}}>Hello</Text></Heading>
          <Flex flexDirection={'column'}>
            {/* <Text fontSize={"xl"} color={"white"} mt={8} mb={3}>Already Joined Rooms: </Text>
            {(currentuser.rooms || []).map((room, index) => {
              return (
              <Box key={index} mb={2}>
                <Link to={`${room}/chat`}><Text color={'gray.50'} whiteSpace={'nowrap'} p={1} pl={2} borderRadius={'md'} bgColor={'gray.700'} fontSize={{base:'md', md:'2xl'}} fontWeight={'bold'}>{room}</Text></Link>
                {
                (users || []).filter(user => user.rooms.includes(room))
                      .map((user, index) => {
                          return (user.username === currentuser.username) ? <Box as="div" whiteSpace={'nowrap'} key={index} color={'gray.200'} fontSize={'md'}>{user.username} (You)</Box>
                       : <Box as="div" key={index} color={'gray.200'} fontSize={'md'}>{user.username}</Box>
                      })}
              </Box>
              )
            })} */}
          </Flex>
          </Flex>
          <Flex gap={1}>
           <Box>{room && <Link to={`/dashboard/${id}`}><Button leftIcon={<ArrowBackIcon />} _hover={{boxShadow:"xl"}} bgColor={'gray.400'} colorScheme={"gray.100"} variant="solid"></Button></Link>}</Box>
           <Button onClick={logoutFunction}><Text>Logout</Text></Button>
           </Flex>
        </Flex>
        <Flex direction={'column'} w={"100%"} h={'100%'}>
          <Flex as="nav" w={"100%"} h={'60px'} flexFlow={0} bgColor={'gray.500'} justifyContent={"center"} alignItems={"center"}>
            <Navbar/>
          </Flex>
          <Box as="main" w={"100%"} h={"100%"} bgColor={'gray.400'}>
            <Outlet/>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
