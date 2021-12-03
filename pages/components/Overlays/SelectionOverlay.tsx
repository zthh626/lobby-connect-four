import {
  Flex,
  Center,
  VStack,
  Heading,
  HStack,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SelectionOverlayProps {
  closeOverlay: () => void;
  togglePlayer: () => void;
  setPlayerOneColorYellow: () => void;
}

function SelectionOverlay({
  closeOverlay,
  togglePlayer,
  setPlayerOneColorYellow,
}: SelectionOverlayProps) {
  const [turnSelected, setTurnSelected] = useState(false);

  return (
    <Flex
      position="absolute"
      h="100vh"
      w="100vw"
      bg="gray.100"
      justifyContent="center"
      alignItems="center"
    >
      <Center>
        <VStack>
          <Heading>
            {!turnSelected ? (
              <>Player One, are you going first or second?</>
            ) : (
              <>Player Two, what color would you like?</>
            )}
          </Heading>
          <HStack>
            {!turnSelected ? (
              <ButtonGroup p="1em" variant="outline" spacing="6">
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    togglePlayer();
                    setTurnSelected(true);
                  }}
                >
                  Second
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setTurnSelected(true);
                  }}
                >
                  First
                </Button>
              </ButtonGroup>
            ) : (
              <HStack pt="1em" spacing="2em">
                <Box
                  _hover={{ border: "1px", cursor: "pointer" }}
                  onClick={() => {
                    closeOverlay();
                  }}
                  bg={"yellow.300"}
                  borderRadius="100px"
                  h="5em"
                  w="5em"
                />
                <Box
                  _hover={{ border: "1px", cursor: "pointer" }}
                  onClick={() => {
                    setPlayerOneColorYellow();
                    closeOverlay();
                  }}
                  bg={"red"}
                  borderRadius="100px"
                  h="5em"
                  w="5em"
                />
              </HStack>
            )}
          </HStack>
        </VStack>
      </Center>
    </Flex>
  );
}

export default SelectionOverlay;
