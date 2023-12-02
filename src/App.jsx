import { useState } from "react";
import Square from "./components/Square.jsx";
import TURNOS from "./constantes.js";
import { checkWinner, checkEndGame } from "./logic/checkWinner.jsx";
import WinnerModal from "./components/WinnerModal.jsx";
import confetti from "canvas-confetti";
import { useSound } from "use-sound";
import Music from "./sound/music.mp3";
import Tab from "./sound/tab.wav";
import Win from "./sound/win.wav";
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(Music, {
    volume: 0.3,
  });
  const toggleAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream){
        play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error al acceder al micrófono: ", error);
    }
  };

  const stopAudio = () => {
    stop();
    setIsPlaying(false);
  };
  const [played] = useSound(Tab, {
    volume: 0.3,
  });
  const [winSound] = useSound(Win)
  //Aqui se define la logica del juego
  const [board, setBoard] = useState(() => {
    const boardLocalStorage = window.localStorage.getItem("board");
    return boardLocalStorage
      ? JSON.parse(boardLocalStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnLocalStorage = window.localStorage.getItem("turn");
    return turnLocalStorage ?? TURNOS.X;
  });
  const [winner, serWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNOS.X);
    serWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);
    //guardar los datos
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    //ver si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      console.log(newWinner);
      (newWinner === TURNOS.X) ? setPlayerOne(playerOne + 1) : setPlayerTwo(playerTwo + 1)
      confetti();
      winSound()
      serWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      serWinner(false);
    }
  };

  const [playerOne,setPlayerOne] = useState(0) 
  const [playerTwo,setPlayerTwo] = useState(0) 

  return (
    <>
      <header>
      <h1>Tic-Tac-Toe</h1>
      </header>
      <main className="board">
        <button onClick={resetGame} onMouseEnter={played}>
          Reniciar Juego
        </button>
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
        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
      <footer className="footerInfo">
        <section>
          {isPlaying ? (
            <button className="audiobutton" onMouseEnter={played} onClick={stopAudio}>Detener Audio</button>
          ) : (
            <button className="audiobutton" onMouseEnter={played} onClick={toggleAudio}>Iniciar Audio</button>
          )}
        </section>
        <section className="Info">
          <h3>Puntaje</h3>
          <span><strong>Jugador1:</strong> {playerOne}</span>
          <span><strong>Jugador2:</strong> {playerTwo}</span>
        </section>
      </footer>
    </>
  );
}
export default App;
