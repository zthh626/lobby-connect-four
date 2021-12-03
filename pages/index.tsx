import {
  Flex,
  Center,
  Heading,
  Button,
  HStack,
  useDisclosure,
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
        <Board size={size} toggleIsPlaying={toggleIsPlaying} />
      ) : (
        <Center flexDir="column">
          <Heading p="1em ">Connect Four</Heading>
          <HStack>
            <>
              <Button onClick={onOpen}>Rules</Button>
              <RulesModal isOpen={isOpen} onClose={onClose} />
            </>
            <Button
              onClick={() => {
                toggleIsPlaying();
              }}
            >
              Start Game
            </Button>
          </HStack>
        </Center>
      )}
    </Flex>
  );
};

export default ConnectFourPage;
