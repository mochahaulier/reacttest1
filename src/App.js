import './App.scss';
import Board from './components/Board/Board';
import { useRef, useState } from 'react';

function App() {
  const [winFromBoard, setWinFromBoard] = useState("#");
  const [playerFromBoard, setPlayerFromBoard] = useState("U");
  const gameState = useRef("");

  const [trigger, setTrigger] = useState(0);

  function handleWinFromBoard(data) {
    setWinFromBoard(data);
  }

  function handlePlayerFromBoard(data) {
    setPlayerFromBoard(data);
  }

  return (
    <div className="main">
      <div className="title">
        TicTacToe<div className='two'>React</div>        
      </div>
      <div className="board">
        <Board sendWinToApp={ handleWinFromBoard } sendPlayerToApp={ handlePlayerFromBoard }
          trigger={trigger}
        />
      </div>
      <div key={ setGameState() } className='info'>
        { gameState.current }
      </div>
      <div className="restart">
        <div className="center">
            <button className="button empty square" 
              onClick={() => { setTrigger((trigger) => trigger + 1); }}
              onTouchEnd={() => { setTrigger((trigger) => trigger + 1); }}
            >{ winFromBoard ? 'New Game' : 'Restart' }</button>
        </div>
     </div>
    </div>
  );

  function setGameState() {
    gameState.current = (!winFromBoard) ? (
        (playerFromBoard).concat("'s Turn")
    ) : (
      (winFromBoard === 'DRAW') ? "It's a DRAW!" : (
        winFromBoard + ' wins!'
      )
    );  
    return gameState.current;
  }
}

export default App;
