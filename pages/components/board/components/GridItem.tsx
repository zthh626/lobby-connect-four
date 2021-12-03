import { Box } from "@chakra-ui/react";
import React from "react";
import Player from "../../../types/Player";

interface GridItemProps {
  rowIndex: number;
  colIndex: number;
  isHoveringCol: boolean;
  playerOnGrid: Player;
  currentPlayer: Player;
  setHover: (colIndex: number) => void;
  onClickHandler: (colIndex: number) => void;
}

function GridItem({
  rowIndex,
  colIndex,
  isHoveringCol,
  playerOnGrid,
  currentPlayer,
  setHover,
  onClickHandler,
}: GridItemProps) {
  if (rowIndex === 0) {
    return (
      <Box
        h="100%"
        css={{
          aspectRatio: "1",
        }}
        key={`${rowIndex}, ${colIndex}, indicator`}
        bg={
          isHoveringCol
            ? currentPlayer === "Player One"
              ? "red"
              : "yellow.300"
            : "none"
        }
        borderRadius="100px"
      />
    );
  }

  return (
    <Box
      h="100%"
      css={{
        aspectRatio: "1",
      }}
      borderRadius="10px"
      key={`${rowIndex}, ${colIndex}`}
      onMouseOver={() => {
        setHover(colIndex);
      }}
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => {
        onClickHandler(colIndex);
      }}
      bg={isHoveringCol ? "gray.100" : "none"}
      border="1px"
      borderColor="black"
    >
      <Box
        bg={
          playerOnGrid !== null
            ? playerOnGrid === "Player One"
              ? "red"
              : "yellow.300"
            : "none"
        }
        borderRadius="100px"
        h="100%"
        w="100%"
        key={`${rowIndex}, ${colIndex}, played`}
      />
    </Box>
  );
}

export default GridItem;
