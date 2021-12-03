import { VStack, Heading, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Player from "../../types/Player";
import GridItem from "./components/GridItem";

interface BoardProps {
  size: number;
}

function Board({ size }: BoardProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Player One");
  const [board, setBoard] = useState<Player[][]>(
    new Array(size + 1).fill(null).map(() => new Array(size).fill(null))
  );
  const [currentColHovering, setCurrentColHovering] = useState(0);

  const gridClickHandler = (colIndex: number) => {
    const newBoard = board.slice();

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (newBoard[size - rowIndex][colIndex] === null) {
        newBoard[size - rowIndex][colIndex] = currentPlayer;
        console.log(newBoard);
        break;
      }
    }

    setCurrentPlayer((prev) => {
      return prev === "Player One" ? "Player Two" : "Player One";
    });
    setBoard(newBoard);
  };

  useEffect(() => {}, [board]);

  return (
    <VStack w="100%">
      <HStack w="100%">
        <Heading size="sm" p="0.5em" w="100%">
          Connect Four
        </Heading>
        <Heading size="md" textAlign="end" p="0.5em" w="100%">
          {currentPlayer}'s Turn
        </Heading>
      </HStack>
      <VStack p="1em" h="100%" w="100%">
        {board.map((row, rowIndex) => {
          return (
            <HStack justifyContent="center" h="100%" w="100%">
              {row.map((col, colIndex) => {
                return (
                  <GridItem
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isHoveringCol={colIndex === currentColHovering}
                    playerOnGrid={board[rowIndex][colIndex]}
                    currentPlayer={currentPlayer}
                    setHover={setCurrentColHovering}
                    onClickHandler={gridClickHandler}
                  />
                );
              })}
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
}

export default Board;
