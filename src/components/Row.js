import React from 'react';
import Cell from './Cell';

export default function(props) {
  const cells = Array(props.row.size).
    fill().
    map((cell, index) => {
      return <Cell cell={cell} rowId={props.row.id} id={index} key={index} game={props.game}/>
    });

  return (
    <div className="row">
      {cells}
    </div>
  );
}
