import React from 'react';
import classNames from 'classnames';
import styles from './Tile.module.scss';

export default function Tile({value, isWin, xNext, isActive, onTileClick}) {    
  let buttonClasses = classNames(
    styles.empty, (value === 'X') 
    ? ({[styles.square]:true, [styles.set]: true, [styles.loss]: (!isWin && !isActive), [styles.lock]: !isActive}) 
    : (value === 'O') ? ({[styles.circle]:true, [styles.set]: true, [styles.loss]: (!isWin && !isActive), [styles.lock]: !isActive}) 
    : (xNext) ? {[styles.square]: true, [styles.lock]: !isActive} 
    : {[styles.circle]: true, [styles.lock]: !isActive}    
  );
  return (
    <div className={styles.main}>
      <button className={buttonClasses}
        onClick={onTileClick}
        onTouchEnd={onTileClick}      
        tabIndex={(!value) ? 0 : -1}>{value || "#"}
      </button>
    </div>
  );
};