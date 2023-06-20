import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@chakra-ui/react";

import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <Box color="black" bg="white" borderRadius={"lg"}>
      <Image borderRadius={"lg"} src={imageSrc} />
      <VStack p={4} align="left" spacing={1}>
        <Heading size={"md"}>{title}</Heading>
        <Box>
          <Text color="grey" fontSize="sm">
            {description}
          </Text>
        </Box>
        <HStack>
          <Text>See more</Text>
          <a href=""><FontAwesomeIcon icon={faArrowRight} size="1x" /></a>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;
