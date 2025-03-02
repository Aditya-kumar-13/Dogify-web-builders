import { useState, useCallback } from "react";
import { 
  Box, Input, Text, VStack, Image, IconButton, Heading, Button, Spinner 
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { SmallCloseIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
    const MODEL_ID = "dog-skin-diseases/1"; // Replace with your actual model ID

  // Handle file upload (Click & Drag-Drop)
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/gif": [],
    },
    multiple: false,
    noClick: !!image, // Prevents triggering file input when image is present
  });

  // Function to send the uploaded image to Roboflow API
  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setDiseaseInfo(null);
    setError(null);
    try {
        const base64Data = image.split(",")[1]; 
      const response = await axios.post(
  `https://detect.roboflow.com/${MODEL_ID}`,
  base64Data, // Send raw base64 as data
  {
    params: { api_key: ROBOFLOW_API_KEY },
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Correct Content-Type
  }
);

      setDiseaseInfo(response.data);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      minH="100vh" 
      w="full" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      pt="80px"  
      px={4}
    >
      <Heading size={"2xl"} mb={{ base: 16, sm: 24 }} textAlign="center">
        Upload Your Dog Image
      </Heading>

      <VStack spacing={4} width="100%" maxW="600px" mx="auto">
        <Box
          {...getRootProps()} 
          width="100%"
          height={{ base: "300px", sm: "400px" }}
          border="2px dashed gray"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          _hover={{ borderColor: "blue.500" }}
          textAlign="center"
          cursor="pointer"
          overflow="hidden"
        >
          <Input {...getInputProps()} />

          {image ? (
            <Box position="relative" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
              <Image 
                src={image} 
                alt="Uploaded Image" 
                objectFit="contain" 
                borderRadius="md" 
                width="80%" 
                height="80%"
              />
              <IconButton
                icon={<SmallCloseIcon />}
                size="sm"
                colorScheme="red"
                position="absolute"
                top="2"
                right="2"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents click from opening file input
                  setImage(null);
                  setDiseaseInfo(null);
                  setError(null);
                }}
              />
            </Box>
          ) : (
            <Text color="gray.500" fontSize={{ base: "md", md: "lg" }}>
              Click or Drag & Drop to Upload
            </Text>
          )}
        </Box>

        {image && (
          <Button 
            colorScheme="blue" 
            onClick={analyzeImage} 
            isLoading={loading} 
            isDisabled={!image || loading}
          >
            Analyze Image
          </Button>
        )}

        {loading && <Spinner size="lg" color="blue.500" />}

        {error && (
          <Box p={3} bg="red.100" color="red.700" borderRadius="md" mt={2}>
            {error}
          </Box>
        )}

        {diseaseInfo && !error && (
          <Box p={4} mt={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Heading size="md">Analysis Results:</Heading>
            {diseaseInfo.predictions && diseaseInfo.predictions.length > 0 ? (
              diseaseInfo.predictions.map((disease, index) => (
                <Text key={index} mt={2}>
                  ✅ {disease.class} (Confidence: {Math.round(disease.confidence * 100)}%)
                </Text>
              ))
            ) : (
              <Text mt={2}>No disease detected.</Text>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
}
