import { Button, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import React from "react";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RulesModal({ isOpen, onClose }: RulesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect Four Rules</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text px="0.3em" pt="0.3em" pb="1em">
            <Text fontWeight="bold">Game objective</Text>Be the first player to
            connect 4 of the same colored discs in a row (either vertically,
            horizontally, or diagonally)
            <hr />
          </Text>

          <Text p="0.3em">
            First, decide who goes first and what color each player will have. -
            Players must alternate turns, and only one disc can be dropped in
            each turn.
          </Text>
          <br />
          <Text p="0.3em">
            On your turn, drop one of your colored discs from the top into any
            of the seven slots.
          </Text>
          <br />
          <Text p="0.3em">
            The game ends when there is a 4-in-a-row or a stalemate.
          </Text>
          <br />
          <Text p="0.3em">
            The starter of the previous game goes second on the next game.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RulesModal;
