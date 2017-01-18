import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Field from './components/Field'
import Game from './models/Game'

const game = new Game;

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

const keyDownTextField = (e) => {
  switch(e.keyCode) {
    case 37:
      game.setDirection("left");
      break;
    case 38:
      game.setDirection("up");
      break;
    case 39:
      game.setDirection("right");
      break;
    case 40:
      game.setDirection("down");
      break;
  }
}

document.addEventListener("keydown", keyDownTextField, false);

export default App;


