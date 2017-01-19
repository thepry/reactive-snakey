import React from 'react';

export default function(props) {
  const withSnake = props.game.hasSnake(props.rowId, props.id)
  const withApple = props.game.hasApple(props.rowId, props.id)

  const className = `cell ${ withSnake ? 'cell--with-snake' : '' } ${ withApple ? 'cell--with-apple' : '' }`;

  return (
    <div className={className} key={props.id}>
    </div>
  );
}
