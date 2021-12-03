import { VStack, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Player from "../../types/Player";
import WinModal from "../modals/WinModal";
import SelectionOverlay from "../Overlays/SelectionOverlay";
import GridItem from "./components/GridItem";

interface BoardProps {
  size: number;
}

function Board({ size }: BoardProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Player One");
  const [playerOneColor, setPlayerOneColor] = useState<string>("red");
  const [board, setBoard] = useState<Player[][]>(
    new Array(size + 1).fill(null).map(() => new Array(size).fill(null))
  );
  const [currentColHovering, setCurrentColHovering] = useState(0);
  const [winner, setWinner] = useState<Player>(null);
  const [stalemate, setStalemate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOverlay, setShowOverlay] = useState(true);

  const toggleCurrentPlayer = () => {
    setCurrentPlayer((prev) => {
      return prev === "Player One" ? "Player Two" : "Player One";
    });
  };

  const gridClickHandler = (colIndex: number) => {
    const newBoard = board.slice();

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (newBoard[size - rowIndex][colIndex] === null) {
        newBoard[size - rowIndex][colIndex] = currentPlayer;
        break;
      }
    }
    toggleCurrentPlayer();
    setBoard(newBoard);
  };

  const handleOnCloseWinModal = () => {
    setBoard(
      new Array(size + 1).fill(null).map(() => new Array(size).fill(null))
    );
    setWinner(null);
    setStalemate(false);
    onClose();
  };

  const handleSetCurrentColHovering = (colIndex: number) => {
    setCurrentColHovering(colIndex);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  const setPlayerOneColorYellow = () => {
    setPlayerOneColor("yellow.300");
  };

  const checkForWinner = (player: Player): Player => {
    var winner = null;

    // horizontalCheck
    for (let i = size; i > 0; i--) {
      for (let j = 0; j < size - 3; j++) {
        if (
          board[i][j] === player &&
          board[i][j + 1] === player &&
          board[i][j + 2] === player &&
          board[i][j + 3] === player
        ) {
          winner = player;
          console.log("horizontal");
        }
      }
    }

    // verticalCheck
    for (let i = size; i > 3; i--) {
      for (let j = 0; j < size; j++) {
        if (
          board[i][j] === player &&
          board[i - 1][j] === player &&
          board[i - 2][j] === player &&
          board[i - 3][j] === player
        ) {
          winner = player;
          console.log("vertical");
        }
      }
    }

    // ascendingDiagonalCheck
    for (let i = size - 3; i > 0; i--) {
      for (let j = 3; j < size; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j - 1] === player &&
          board[i + 2][j - 2] === player &&
          board[i + 3][j - 3] === player
        ) {
          winner = player;
          console.log("ascending diag");
        }
      }
    }

    // descendingDiagonalCheck
    for (let i = size - 3; i > 0; i--) {
      for (let j = 0; j < size - 3; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j + 1] === player &&
          board[i + 2][j + 2] === player &&
          board[i + 3][j + 3] === player
        ) {
          winner = player;
          console.log("horizontal");
        }
      }
    }

    return winner;
  };

  const checkStalemate = (): Boolean => {
    var isStalemate = true;
    for (let i = size; i > 0; i--) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === null) {
          isStalemate = false;
        }
      }
    }

    return isStalemate;
  };

  useEffect(() => {
    const playerOneWin: Player = checkForWinner("Player One");
    const playerTwoWin: Player = checkForWinner("Player Two");

    if (checkStalemate()) {
      setStalemate(true);
      onOpen();
    }

    if (playerOneWin) {
      setWinner("Player One");
      onOpen();
    } else if (playerTwoWin) {
      setWinner("Player Two");
      onOpen();
    }
  }, [board]);

  return (
    <>
      {showOverlay && (
        <SelectionOverlay
          closeOverlay={closeOverlay}
          togglePlayer={toggleCurrentPlayer}
          setPlayerOneColorYellow={setPlayerOneColorYellow}
        />
      )}

      <VStack w="100%">
        <WinModal
          isOpen={isOpen}
          onClose={handleOnCloseWinModal}
          winner={winner}
          stalemate={stalemate}
        />
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
              <HStack key={rowIndex} justifyContent="center" h="100%" w="100%">
                {row.map((_, colIndex) => {
                  return (
                    <Fragment key={`${rowIndex}, ${colIndex}, fragment`}>
                      <GridItem
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        isHoveringCol={colIndex === currentColHovering}
                        playerOnGrid={board[rowIndex][colIndex]}
                        currentPlayer={currentPlayer}
                        playerOneColor={playerOneColor}
                        setHover={handleSetCurrentColHovering}
                        onClickHandler={gridClickHandler}
                      />
                    </Fragment>
                  );
                })}
              </HStack>
            );
          })}
        </VStack>
      </VStack>
    </>
  );
}

export default Board;
