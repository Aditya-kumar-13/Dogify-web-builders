import { useState } from "react";
import { 
  Box, Flex, Text, IconButton, Avatar, Button, VStack, HStack, Drawer, DrawerOverlay, 
  DrawerContent, DrawerBody, useDisclosure 
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useData } from "./utils/contextFile";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {isLoggedIn} = useData();

  return (
    <Box
      width="100%"
      bg="rgba(255, 255, 255, 0.15)" 
      backdropFilter="blur(15px)" 
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      borderBottom="1px solid rgba(255, 255, 255, 0.2)"
      px={6}
      py={3}
    >
      <Flex justify="space-between" align="center">
        {/* Brand Name */}
        <Text fontSize="xl" fontWeight="bold" >
          DOGLIFY
        </Text>

        {/* Desktop Navigation */}
        <HStack gap={6} display={{ base: "none", md: "flex" }}>
          <Text  cursor="pointer" _hover={{ opacity: 0.7 }} onClick={() => navigate("/dashboard/"+`${isLoggedIn}`)}>Home</Text>
          <Text  cursor="pointer" _hover={{ opacity: 0.7 }} onClick={() => navigate("/dashboard/contact")}>Contact</Text>
        </HStack>

        <HStack>
          {/* Hamburger Menu Icon (Visible on Mobile) */}
          <IconButton 
            icon={<HamburgerIcon />} 
            display={{ base: "flex", md: "none" }} 
            bg="transparent" 
            _hover={{ bg: "rgba(255, 255, 255, 0.2)" }} 
            onClick={onOpen} 
          />

          {/* Profile Icon */}
          <Box position="relative">
            <IconButton
              icon={<Avatar size="sm" />}
              bg="transparent"
              _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
              onClick={() => setShowMenu(!showMenu)}
            />

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "40px",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "lg",
                    border: "1px solid rgba(255, 255, 255, 0.3)"
                  }}
                >
                  {/* <VStack spacing={2}>
                    {/* <Button colorScheme="blue" size="sm" width="100%">Profile</Button> */}
                    {/* <Button colorScheme="red" size="sm" width="100%">Logout</Button> 
                  </VStack> */}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </HStack>
      </Flex>

      {/* Mobile Drawer (Side Menu) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)">
          <DrawerBody display="flex" flexDirection="column" alignItems="center" pt={10}>
            <IconButton 
              icon={<CloseIcon />} 
              color="white" 
              bg="transparent" 
              _hover={{ bg: "rgba(255, 255, 255, 0.2)" }} 
              onClick={onClose} 
              mb={5}
            />
            <VStack spacing={4}>
              <Text color="white" fontSize="lg" cursor="pointer" _hover={{ opacity: 0.7 }} onClick={onClose}>Home</Text>
              <Text color="white" fontSize="lg" cursor="pointer" _hover={{ opacity: 0.7 }} onClick={onClose}>About</Text>
              <Text color="white" fontSize="lg" cursor="pointer" _hover={{ opacity: 0.7 }} onClick={onClose}>Services</Text>
              <Text color="white" fontSize="lg" cursor="pointer" _hover={{ opacity: 0.7 }} onClick={onClose}>Contact</Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}