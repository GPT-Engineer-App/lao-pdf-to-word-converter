import React, { useState } from "react";
import { Container, VStack, Button, Text, useToast, Heading, Input, Box } from "@chakra-ui/react";
import { FaFileUpload, FaFileDownload } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      toast({
        title: "File uploaded.",
        description: "You have uploaded a PDF file.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDownload = () => {
    if (!file) {
      toast({
        title: "No file uploaded.",
        description: "Please upload a PDF file first.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Simulate a file download process
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name.replace(".pdf", ".docx")); // create a new .docx file
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    toast({
      title: "File downloaded.",
      description: "Your Word document has been downloaded.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading>PDF to Word Converter</Heading>
        <Text>Supports Lao Language (Simulation)</Text>
        <Box>
          <Input type="file" accept=".pdf" onChange={handleFileChange} size="md" display="none" id="file-upload" />
          <Button leftIcon={<FaFileUpload />} colorScheme="blue" as="label" htmlFor="file-upload">
            Upload PDF
          </Button>
        </Box>
        <Button leftIcon={<FaFileDownload />} colorScheme="green" onClick={handleDownload} isDisabled={!file}>
          Download Word
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
