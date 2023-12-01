import Square from './Square'
export default function WinnerModal({winner, resetGame}) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Gano:";
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">{(winner) ? <Square>{winner}</Square>: <Square>{'-'}</Square>}</header>
        <footer>
          <button className='resetButton' onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}

