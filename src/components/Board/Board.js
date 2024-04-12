import styles from './Board.module.scss';
import Tile from '../Tile/Tile';
import { useState, useEffect, useRef } from 'react';

export default function Board({ sendWinToApp, sendPlayerToApp, trigger }) {
  const [xNext, setXNext] = useState(true);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [isActive, setIsActive] = useState(true);
  
  const winner = useRef(null);
  const player = useRef(xNext);
  const win = useRef([-1, -1, -1]);
  
  function handleClick(i) {
    if (isWinner(tiles) || tiles[i]) return; 
    const newTiles = tiles.slice();
    newTiles[i] = (xNext) ? 'X': 'O';    
    setTiles(newTiles);
    setXNext(!xNext);     
  }

  useEffect(() => {
    if (trigger) {
      onReset();
    }
  }, [trigger]);

  useEffect(() => {    
    winner.current = isWinner(tiles);
    setIsActive(!isWinner(tiles));
    sendWinToApp(winner.current);
    player.current = (xNext ? 'X' : 'O');
    sendPlayerToApp(player.current);   
  }, [tiles, sendWinToApp, xNext, sendPlayerToApp])

  return (
    <div className={styles.main}>
      {Array.from({ length: 9 }, (_, i) => 
        <Tile key={i} value={tiles[i]} xNext={xNext} 
          isActive={isActive} onTileClick={() => handleClick(i)} 
          isWin={win.current.includes(i)}
        />
      )} 
    </div>
  );

  function isWinner(tiles) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    win.current = [-1, -1, -1];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c]= lines[i];
      if (tiles[a] &&
        tiles[a] === tiles[b] &&
        tiles[a] === tiles[c]) {
        win.current = lines[i];      
        return tiles[a];
      } 
    }
  
    if (tiles.includes(null)) {
      return null;
    } else {
      return 'DRAW'
    }
  }

  function onReset() {
    setXNext(true);
    setTiles(Array(9).fill(null));
    setIsActive(true);
    winner.current = null;
    player.current = xNext;
    win.current = [-1, -1, -1];
  };
}



