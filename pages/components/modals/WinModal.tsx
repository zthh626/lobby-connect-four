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
}

function WinModal({ isOpen, onClose, winner }: WinModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{winner} won!</ModalHeader>

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
