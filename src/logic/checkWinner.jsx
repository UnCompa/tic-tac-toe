const WINNER_PATH = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
export const checkWinner = (boardCheck) =>{
    for (const win of WINNER_PATH){
      const [a,b,c] = win
      if(
        boardCheck[a] &&
        boardCheck[a] === boardCheck[b] &&
        boardCheck[a] === boardCheck[c]
      ) {
        return boardCheck[a]
      }
    }
    return null
  } 
export const checkEndGame = (newBoard)=>{
    return newBoard.every((square) => square !== null)
  }
