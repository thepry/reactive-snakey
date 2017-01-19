import React, { Component } from 'react';
import './App.css';
import Field from './components/Field'
import Game from './models/Game'

const game = new Game();
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;

class App extends Component {
  constructor(props) {
    super(props);
    game.moveCallback = () => {
      game.move();
      this.forceUpdate();
    }
    game.reset();
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <Field game={game} />
        </div>
      </div>
    );
  }
}

const keyDownTextField = (event) => {
  switch (event.keyCode) {
    case keyLeft:
      game.setDirection('left');
      break;
    case keyUp:
      game.setDirection('up');
      break;
    case keyRight:
      game.setDirection('right');
      break;
    case keyDown:
      game.setDirection('down');
      break;
    default:
      break;
  }
}
document.addEventListener('keydown', keyDownTextField, false);

export default App;
