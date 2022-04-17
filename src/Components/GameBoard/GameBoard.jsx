import "./GameBoard.css";
import { useState } from "react";

const ROWS = 10;
const COLS = 10;

export default function GameBoard() {
    const [board, setBoard] = useState(generateInitialState());

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

    const handleCellClick = (e) => {
        const { row, col } = e.target.dataset;
        if (board[row][col] !== null) return;
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = "X";
        setBoard(newBoard);
    };

    function generateRowJsx(row, rowIndex) {
        const cells = [];
        for (let i = 0; i < board.length; i++) {
            let classList = "cells";
            if (row[i] === null) {
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
        <>
            <h2>GameBoard</h2>
            {generateBoardJSX()}
        </>
    )
};