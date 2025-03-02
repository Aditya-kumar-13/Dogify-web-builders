
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Flex, Card, CardBody, Heading, Text ,Button,useToast,List,ListIcon,ListItem} from "@chakra-ui/react";
import { BACKEND_URL } from "./utils/constant";
import Tabs from "./tab";
import { useData } from "./utils/contextFile";
const Premium = () => {
    const navigate = useNavigate();
    const {premium, setPremium, isLoggedIn} = useData();
    const toast = useToast();
    let user = "aditya-k";
    const handlePremium =async (premium) =>{
        try{
            const res = await axios.put(BACKEND_URL+"/premium",{premium,user});
            toast({
                title: "Successfully done!",
                description: res.data,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setTimeout(()=>{
                navigate("/dashboard/"+`${isLoggedIn}`);
              },3000)
        }catch(err){
            console.log(err);
        }
        

    }
    return(
        <>
        <Flex 
        overflowX="hidden"
        w="100%"
        minH="100%"
        wrap="wrap" 
        justify="center" 
        align="center"
        gap={6}
        bg="#F5F5F5"
      >
        <Card width={{ base: "15rem", md: "20rem", lg: "25rem" }} m="2rem 0 2rem 0">
          <CardBody align="center">
            <Heading size="lg" color="orange" m="1rem 0 1rem 0">Premium Pass</Heading>
            <Flex align="start" flexDirection="column" ml="1rem">
            <List spacing={4} textAlign="left">
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text fontWeight="bold" display="inline">Personalized Consultation</Text>
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontWeight="bold" display="inline">Diet plan based on Dog breed</Text>
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontWeight="bold" display="inline">Detailed Analysis of Dog disease</Text>
                </ListItem>
            </List>
            </Flex>
            
            <Button m="1rem 0 1rem 0" 
            onClick={()=>{setPremium(true);
            handlePremium(premium);
            }}>
                Buy
            </Button>
          </CardBody>
        </Card>
  
        <Card width={{ base: "15rem", md: "20rem", lg: "25rem" }} m="2rem 0 2rem 0">
          <CardBody align="center">
            <Heading size="lg" color="orange" m="1rem 0 1rem 0">Free Pass</Heading>
            <Flex align="start" flexDirection="column" ml="1rem">
            <List spacing={4} textAlign="left">
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text fontWeight="bold" display="inline">Identification of Dog breed</Text>
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontWeight="bold" display="inline">General diet for Dogs</Text>
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontWeight="bold" display="inline">General Information of Dogs</Text>
                </ListItem>
            </List>
            </Flex>
            <Button m="1rem 0 1rem 0" 
            onClick={()=>{setPremium(false);
            handlePremium(premium);
            }}>
                Free
                </Button>
          </CardBody>
        </Card>
        
      </Flex>
      <Flex
      minW="100vw"><Tabs/></Flex>
        
   
      </>
    )
}

export default Premium;