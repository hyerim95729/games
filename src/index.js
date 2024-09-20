import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서는 이 부분을 사용
import './index.css'

const Square = (props) => {
    return (
        <button
            className="square"
            onClick= {props.onClick}
        >
            {props.value}
        </button>
    )
}

const Board = () => {
    const initialSquares = Array(9).fill(null)
    const [squares, setSquares] = useState(initialSquares)
    const [xIsNext, setXIsNext] = useState(true)

    const handleClickEvent = (i) => {
        const newSquares = [...squares]

        const winnerDeclared = Boolean(calculateWinner(newSquares))
        const squareFilled = Boolean(newSquares[i])
        if (winnerDeclared || squareFilled) {
            return
        }

        newSquares[i] = xIsNext ? 'X' : 'O'
        setSquares(newSquares)
        setXIsNext(!xIsNext)
    }

    const renderSquare = (i) => {
        return (
            <Square
                value= { squares[i] }
                onClick={() => handleClickEvent(i)}
            />
        )
    }

    const winner = calculateWinner(squares)
    const status = winner ?
        `Winner: ${winner}` :
        `Next Player: ${xIsNext ? 'A' : 'B'}`

    return (
        <div className="status">
            <div>{status}</div>
            <div className="board-row">
                {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
            </div>
        </div>
    )
}

const Game = () => {
    return (
        <div className="game">
            Tic-Tac-Toe
            <Board/>
        </div>
    )
}

// React 18에서는 createRoot 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8], //rows
        [0,3,6],[1,4,7],[2,5,8], //columns
        [0,4,8],[2,4,6] // diagonals
    ]

    for (let line of lines) {
        const [a,b,c] = line;
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}
