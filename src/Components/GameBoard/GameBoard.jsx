import "./GameBoard.css";
import { useState } from "react";
import Menu from "../Menu/Menu";

const ROWS = 15;
const COLS = 15;

//row -> column
const transpose = (array) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
};

export default function GameBoard() {
    const [board, setBoard] = useState(createEmptyBoard());
    const [emoji, setEmoji] = useState("✪");
    const [winner, setWinner] = useState(null);

    function createEmptyBoard() {
        const board = [];
        for (let i = 0; i < ROWS; i++) {
            board.push([]);
            for (let j = 0; j < COLS; j++) {
                board[i].push(null)
            }
        };
        return board;
    };

    const reset = () => {
        setBoard(createEmptyBoard());
        setEmoji("✪");
        setWinner(null);
      };

    function winnerInRow(row) {
        let symbolCount = 0;
        for (let cell of row) {
            if (cell === emoji) {
                symbolCount +=1;
            } else {
                symbolCount = 0;
            }
            if (symbolCount === 5) {
                return emoji;
            }
        }
        return null;
    };

    function winnerInRowList(board) {
        for (let row of board) {
            const winner = winnerInRow(row);
            if (winner !== null) {
                return winner;
            }
        }
        return null;
    };

    function diagonal(board, x, y) {
        let diag = [];
        while (Array.isArray(board[x]) && typeof board[x][y] !== "undefined") {
            diag.push(board[x][y]);
            x += 1;
            y += 1;
        };
        return diag;
    };

    function isWinner(board) {
        let boardTransposed = transpose(board);
        let boardReversed = board.map(row => [...row].reverse());
        
        let diaglist = [
            ...board,  //vertical
            ...boardTransposed  //horizontal
        ];

        diaglist.push(diagonal(board, 0, 0));  //main diagonal
        diaglist.push(diagonal(boardReversed, 0, 0));  //cross diagonal

        let maxLen = Math.max(ROWS, COLS);
        for (let i = 1; i < maxLen; i++) {
            diaglist.push(diagonal(board, i, 0));
            diaglist.push(diagonal(board, 0, i));
            diaglist.push(diagonal(boardReversed, i, 0));
            diaglist.push(diagonal(boardReversed, 0, i));
        };

        diaglist = diaglist.filter(diag => diag.length >= 5);

        return winnerInRowList(diaglist);
    };

    const cellClick = (e) => {
        const { row, col } = e.target.dataset;
        if (board[row][col] !== null || winner !== null) return;
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = emoji;
        setWinner(isWinner(newBoard));
        setBoard(newBoard);
        setEmoji(emoji === "✪" ? "♚" : emoji === "♚"? "♥︎" : "✪");
    };

    function createRowJsx(row, rowIndex) {
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
                    onClick={cellClick}>
                    {row[i]}
                </td>);
        };

        return (
            <tr key={JSON.stringify({row, rowIndex})}>
                {cells}
            </tr>
        )
    };

    function createBoardJSX() {
        const rows = [];
        for (let i = 0; i < board.length; i++) {
            rows.push(createRowJsx(board[i], i))
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
        <div className="gameboard">
            <h2>Gomoku Game</h2>
            <Menu reset={reset}/>
            <h3>⭐The Winner Is⭐: {winner}</h3>
            {createBoardJSX()}
        </div>
    )
};