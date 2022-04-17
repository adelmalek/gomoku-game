import "./GameBoard.css";
import { useState } from "react";
import Menu from "../Menu/Menu";

const ROWS = 20;
const COLS = 20;

const transpose = (array) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
};

export default function GameBoard() {
    const [board, setBoard] = useState(generateInitialState());
    const [symbol, setSymbol] = useState("X");
    const [winner, setWinner] = useState(null);

    const resetGame = () => {
        setBoard(generateInitialState());
        setSymbol("X");
        setWinner(null);
      };

    function generateInitialState() {
        const board = [];
        for (let i = 0; i < ROWS; i++) {
            board.push([]);
            for (let j = 0; j < COLS; j++) {
                board[i].push(null)
            }
        };
        return board;
    };

    function getWinnerInRow(row) {
        let symbolCount = 0;
        for (let cell of row) {
            if (cell === symbol) {
                symbolCount +=1;
            } else {
                symbolCount = 0;
            }
            if (symbolCount === 5) {
                return symbol;
            }
        }
        return null;
    };

    function getWinnerInRowList(board) {
        for (let row of board) {
            const winner = getWinnerInRow(row);
            if (winner !== null) {
                return winner;
            }
        }
        return null;
    };

    function getDiagonal(board, x, y) {
        let diag = [];
        while (Array.isArray(board[x]) && typeof board[x][y] !== "undefined") {
            diag.push(board[x][y]);
            x += 1;
            y += 1;
        };
        return diag;
    };

    function getWinner(board) {
        let boardTransposed = transpose(board);
        let boardReversed = board.map(row => [...row].reverse());
        
        let diaglist = [
            ...board, //vertical
            ...boardTransposed //horizontal
        ];

        diaglist.push(getDiagonal(board, 0, 0)); // main diagonal
        diaglist.push(getDiagonal(boardReversed, 0, 0)); // 'cross diagonal'

        let maxLen = Math.max(ROWS, COLS);
        for (let i = 1; i < maxLen; i++) {
            diaglist.push(getDiagonal(board, i, 0));
            diaglist.push(getDiagonal(board, 0, i));
            diaglist.push(getDiagonal(boardReversed, i, 0));
            diaglist.push(getDiagonal(boardReversed, 0, i));
        };

        diaglist = diaglist.filter(diag => diag.length >= 5);

        return getWinnerInRowList(diaglist);
    };

    const handleCellClick = (e) => {
        const { row, col } = e.target.dataset;
        if (board[row][col] !== null || winner !== null) return;
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = symbol;
        setWinner(getWinner(newBoard));
        setBoard(newBoard);
        setSymbol(symbol === "X" ? "O" : "X");
    };

    function generateRowJsx(row, rowIndex) {
        const cells = [];
        for (let i = 0; i < board.length; i++) {
            let classList = "cells";
            if (row[i] === null && winner === null) {
                classList += " empty";
            }
            cells.push(
                <td 
                    className={classList}
                    key={JSON.stringify({row, rowIndex, i})}
                    data-row={rowIndex}
                    data-col={i}
                    onClick={handleCellClick}>
                    {row[i]}
                </td>);
        };

        return (
            <tr key={JSON.stringify({row, rowIndex})}>
                {cells}
            </tr>
        )
    };

    function generateBoardJSX() {
        const rows = [];
        for (let i = 0; i < board.length; i++) {
            rows.push(generateRowJsx(board[i], i))
        };

        return (
            <table className="board">
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    };

    return (
        <div className="gameboard-container">
            <h2>Gomoku Game</h2>
            <Menu resetGame={resetGame}/>
            <h3>Winner: {winner}</h3>
            {generateBoardJSX()}
        </div>
    )
};