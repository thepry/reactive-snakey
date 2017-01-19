import React from 'react';
import Row from './Row';

export default function field(props) {
  const rows = props.game.getRows().map((row) => {
    return <Row row={row} game={props.game} key={row.id}/>
  });

  return (
    <div>
      {rows}
    </div>
  );
}

