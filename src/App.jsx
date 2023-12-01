import { useState } from "react";
import Square from './components/Square.jsx'
import TURNOS from './constantes.js'
import {checkWinner, checkEndGame} from './logic/checkWinner.jsx'
import WinnerModal from './components/WinnerModal.jsx'
import confetti from 'canvas-confetti'

function App() {
  const [board, setBoard] = useState(()=>{
    const boardLocalStorage = window.localStorage.getItem('board')
    return boardLocalStorage ? JSON.parse(boardLocalStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(()=>{
    const turnLocalStorage = window.localStorage.getItem('turn')
    return turnLocalStorage ?? TURNOS.X
  });
  const [winner, serWinner] = useState(null)

  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNOS.X)
    serWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);
    //guardar los datos
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //ver si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      serWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      serWinner(false)
    }
  };

  return (
    <main className="board">
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>Reniciar Juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNOS.X}>{TURNOS.X}</Square>
        <Square isSelected={turn === TURNOS.O}>{TURNOS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
}
export default App;
