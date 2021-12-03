import {
  Flex,
  Center,
  Heading,
  Button,
  HStack,
  useDisclosure,
  Box,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import Board from "./components/board/Board";
import RulesModal from "./components/modals/RulesModal";

const ConnectFourPage: NextPage = () => {
  const [size, setSize] = useState(7);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleIsPlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Flex justifyContent="center" h="100vh">
      {isPlaying ? (
        <Board size={size} />
      ) : (
        <Center flexDir="column">
          <Heading p="1em ">Connect Four</Heading>
          <HStack>
            <>
              <Button onClick={onOpen}>Rules</Button>
              <RulesModal isOpen={isOpen} onClose={onClose} />
            </>
            <Button
              disabled={size > 20}
              bg="green.400"
              onClick={() => {
                toggleIsPlaying();
              }}
            >
              Start Game
            </Button>
          </HStack>
        </Center>
      )}
      <Box hidden={isPlaying} position="absolute" bottom="2em" right="2em">
        Board Size
        <NumberInput
          defaultValue={7}
          max={20}
          clampValueOnBlur={false}
          onChange={(_: string, valueAsNumber: number) => {
            setSize(valueAsNumber);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>
  );
};

export default ConnectFourPage;
