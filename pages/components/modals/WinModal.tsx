import { Button, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/modal";
import React from "react";
import Player from "../../types/Player";

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: Player;
  stalemate: Boolean;
}

function WinModal({ isOpen, onClose, winner, stalemate }: WinModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {!stalemate ? <>{winner} won!</> : <>Stalemate!</>}
        </ModalHeader>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default WinModal;
