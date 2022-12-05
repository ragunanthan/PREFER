import React from "react";
import { Box, Flex, HStack, Text, VStack } from "native-base";
import { Container } from "../Components/Container";
import { Address } from "../Components/Address";

let SPOText = {
  containerOne: {
    title: "Prerequisite",
    content:
      " Ejaculate with a minimum of 500 million sperm/mL and 70% progressive motility to be considered for the analysis.",
  },
  containertwo: {
    title: "Protocol",
    content: [
      "Transfer 100 million cells each to Buffer A and Buffer B. ",
      "Measure progressive motility for the samples in Buffer A immediately and discard the samples.",
      "Incubate the samples in Buffer B in a water bath at 37°C. ",
      "Measure progressive motility of samples in Buffer B at 1 and 4 h of incubation. ",
      "Feed the measured progressive motility values at 0 (Buffer A), 1 and 4 h (Buffer B) as input in the Predict page.",
    ],
  },
};

let ICARNIANPText =
  "The ICAR - National Institute of Animal Nutrition and Physiology (ICAR - NIAN) was established on 24th November 1995 at Bangalore under the aegis of Indian Council of Agricultural Research (ICAR), New Delhi. The Institute is mandated to conduct basic and fundamental research with respect to animal feed resource management using physiological-nutritional approaches to improve animal productivity and profitability of livestock farmers. During the journey, ICAR - NIAN has developed several technologies and package of practices for the farmers as well as earned its own place in the basic and fundamental research.";

let ICARNFPText =
  "PREFER, mobile application has been developed under the National Fellow Project titled Development of Buffalo Bull Fertility Diagnostic Chip Based On Sperm Transcripts Signatures. This project focus on identifying transcript markers which can identify the sub-fertile animals from the bull herd.";
let PreferText = {
  containerOne:
    "PREFER, mobile application has been developed under the National Fellow Project titled Development of Buffalo Bull Fertility Diagnostic Chip Based On Sperm Transcripts Signatures. This project focus on identifying transcript markers which can identify the sub-fertile animals from the bull herd.",
  containertwo: {
    title: "Disclaimer",
    content:
      "The prediction is based on the inputs provided by the user and not by the developer. This app predicts only the quality of the particular ejaculate. The misguidance of the application cannot be claimed from the developer.",
  },
};

let TeamText = {
  title: "Concept and Development",
  content: [
    "Dr. S. Selvaraju",
    "Dr. Arangasamy",
    "Dr. Krishnappa",
    "Dr. Binsila",
    "Dr. M. Lavanya",
    "Ms. D. Swathi",
    "Ms. L. Ramya",
    "Ms. Ss. Archana",
  ],
};

let PublisedBy = {
  title: "Published by",
  content: [
    "Dr. Raghavendra Bhatta",
    "Director",
    "ICAR-NIANP",
    "Adugodi, Bangalore Karnataka - 560030",
    "Contact Us : 080-25711303",
    "Email: selvarajuars@gmail.com",
    "ICAR- NIANP 2021",
  ],
};

let ContactText = [
  {
    title: "Contact us:",
    content: [
      "Dr. S. Selvaraju",
      "ICAR - National Fellow and Principal Scientist",
      "Reproductive Physiology Laboratory",
      "Animal Physiology Division",
      "ICAR - National Institute of Animal Nutrition",
      "and Physiology",
      "Adugodi, Bangalore - 560 030",
    ],
  },
  {
    title: "Email : ",
    content: ["Selvaraju.S@icar.gov.in", "selvarajuars@gmail.com"],
  },
  {
    title: "Phone: ",
    content: ["+91 94496 36864"],
  },
];

export function SPO() {
  return (
    <VStack>
      <Container title={SPOText.containerOne.title}>
        <Text>{SPOText.containerOne.content}</Text>
      </Container>
      <Container title={SPOText.containertwo.title} mt={10}>
        {SPOText.containertwo.content.map((i, index) => (
          <HStack key={index}>
            <Text>{index + 1}. </Text>
            <Text>{i}</Text>
          </HStack>
        ))}
      </Container>
    </VStack>
  );
}

export function ICARNIANP() {
  return (
    <VStack>
      <Container>
        <Text>{ICARNIANPText}</Text>
      </Container>
    </VStack>
  );
}

export function ICARNFP() {
  return (
    <VStack>
      <Container>
        <Text>{ICARNFPText}</Text>
      </Container>
    </VStack>
  );
}

export function Prefer() {
  return (
    <VStack>
      <Container>
        <Text>{PreferText.containerOne}</Text>
      </Container>
      <Container mt={10} title={PreferText.containertwo.title}>
        <Text>{PreferText.containertwo.content}</Text>
      </Container>
    </VStack>
  );
}

export function Team() {
  return (
    <VStack display={"flex"} alignItems="center" >
    <Flex width={"96"}
      h={"full"}
      justifyContent="space-between"
    >
    
        <Address title={TeamText.title}>
          {TeamText.content.map((text) => (
            <Text key={text}>{text}</Text>
          ))}
        </Address>
        <Box position={"relative"} bottom="0" left="0" >
        <Address title={PublisedBy.title}>
          {PublisedBy.content.map((text) => (
            <Text  key={text}>{text}</Text>
          ))}
        </Address>
        </Box>
    </Flex>
  </VStack>
  );
}
export function Contact() {
  return (
    <VStack alignItems="center">
      <Box maxW={"96"}>
        {ContactText.map((i) => (
          <Address title={i.title}>
            {i.content.map((text) => (
              <Text key={text}>{text}</Text>
            ))}
          </Address>
        ))}
      </Box>
    </VStack>
  );
}
