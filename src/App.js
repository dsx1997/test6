import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">      
      <header className="App-header">
        <Game />
        <Palette favcol={'yellow'}/>
      </header>      
    </div>
  );
}

function Square(props) {
    return (
      
      <button className="square" onClick={props.funcProps1}>
        {props.valProps1}
      </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square valProps1={this.props.valProps2[i]} funcProps1={() => this.props.funcProps2(i)}/>;
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares : Array(9).fill(null),
        // squares : [0, 1, 2, 3, 4, 5, 6, 7, 8]
      }],
      xIsNext : true, 
      stepNumber : 0,      
    };
  }

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    if(squares[i] || judgeWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{
        squares : squares,
      }]),
      xIsNext : !this.state.xIsNext,
      stepNumber : history.length,
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber : move,
      xIsNext : move % 2 === 0,
    });
  }

  render() {    

    let stepNumber = this.state.stepNumber;
    let history = this.state.history.slice(0, stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();

    let status;
    let winner = judgeWinner(squares);
    if(winner) {
      status = 'Winner is : ' + winner;
    } else {
      status = 'The next play is : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let moves = history.map((step, move) => {
      let desc = move ? 'Go to step #' + move : 'Go to first game';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board valProps2={squares} funcProps2={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class Palette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favouritecolor : 'red',
    };
    console.log('constructor');
    console.log('favouritecolor : ', this.state.favouritecolor);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    console.log('favouritecolor : ', state.favouritecolor);
    return {favouritecolor : props.favcol};
  }

  ChangeColor() {
    console.log('ChangeColor function');
    console.log('before update');
    console.log(this.state.favouritecolor);
    this.setState({
      favouritecolor : 'blue',
    });    
    console.log('after update');
    console.log(this.state.favouritecolor);
  }

  render () {
    console.log('Palette render part');
    console.log('state.favourite : ', this.state.favouritecolor);
    return (
      <>
        <h1>My favourite color is : {this.state.favouritecolor}</h1>
        <button onClick={() => this.ChangeColor()} >Change Color</button>
      </>
    )
  };
}

function judgeWinner(squares) {
  let lines = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================


export default App;
