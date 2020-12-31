import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      order : props.value,
      playerOne : props.playerOne,
      playerTwo : props.playerTwo,
      squares: Array(props.value*props.value).fill(null),
      isNext : 'X',
      success : 3,
      gameResult : false
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} 
    onClick={() => this.handleClick(i)}
      />;
  }

  handleClick(i) {
    var gameOver = false;
    const squares = this.state.squares.slice();
    var cellState = this.state.isNext;
    squares[i] = this.state.isNext;
    this.setState({squares: squares});
    if ((i%this.state.order !== 0) && (i%this.state.order !== this.state.order-1) && (squares[i] === cellState) && (squares[i-1] === cellState) && (squares[i+1] === cellState)){
      gameOver = true;
    } else if ((i%this.state.order !== this.state.order-2) && (i%this.state.order !== this.state.order-1) && (squares[i] === cellState) && (squares[i+1] === cellState) && (squares[i+2] === cellState)) {
      gameOver = true;
    } else if ((i%this.state.order !== 0) && (i%this.state.order !== 1) && (squares[i] === cellState) && (squares[i-1] === cellState) && (squares[i-2] === cellState)) {
      gameOver = true;
    }

    if ((i-this.state.order >0) && (i+this.state.order < this.state.order*this.state.order) && (squares[i] === cellState) && (squares[i-this.state.order] === cellState) && (squares[i+this.state.order] === cellState)){
      gameOver = true;
    } else if ((i+this.state.order < this.state.order*this.state.order) && (i+2*this.state.order < this.state.order*this.state.order) && (squares[i] ===cellState) && (squares[i+this.state.order] ===cellState) && (squares[i+2*this.state.order] === cellState)) {
      gameOver = true;
    } else if ((i-this.state.order >0) && (i-2*this.state.order >0) && (squares[i] ===cellState) && (squares[i-this.state.order] ===cellState) && (squares[i-2*this.state.order] === cellState)) {
      gameOver = true;
    }

    if(gameOver === true) {
      this.setState({squares: Array(this.state.order*this.state.order).fill(null)}, () => console.log(this.state.squares));
      this.setState({gameResult : true})
    }

    if (this.state.isNext === 'X'){
      this.setState({isNext : 'O'})
    } else {
      this.setState({isNext : 'X'})
    }
  }

  render() {

    let parent = [];
    if (this.state.gameResult === true) {
      parent = [];
      if (this.state.isNext === 'X'){
      parent.push(<div className="board-row">{this.state.playerTwo} wins the game</div>)
      } else {
        parent.push(<div className="board-row">{this.state.playerOne} wins the game</div>)
      } 
    } else {
    for (var i = 0; i < this.state.order; i++) {
      let children = []
      for (var j = 0; j < this.state.order; j++) {
        children.push(this.renderSquare(i*this.state.order+j))
      }
      parent.push(<div className="board-row">{children}</div>)
    }
  }

    return (
      <div>
      {parent}
    </div>    
    )
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {playerOne: '', playerTwo: '', gameOrder:0, keepForm:true};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePlayerOneChange = (event) => {
    this.setState({
        playerOne : event.target.value
    })
  }

  handlePlayerTwoChange = (event) => {
    this.setState({
      playerTwo : event.target.value
    })
  }

  handleOrderChange = (event) => {
      this.setState({
        gameOrder : event.target.value
      })
  }

  handleSubmit(event) {
    if (this.state.gameOrder > 2) {
    this.setState({keepForm : false})
    this.render();
    } else {
      alert ('Game order should be greater than or equal to 3')
    } 
  }

  render() {
    if (this.state.keepForm){
      return (
          <div>
            <h2>This is a simple game of tic tac toe, you can choose the number of rows and columns by specifying the order, Player who makes first 3 horizontal or vertical pair wins the game</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name of player 1 (X):
                <input type="text" value={this.state.playerOne} onChange={this.handlePlayerOneChange} />
              </label><br/>
              <label>
                Name of player 2 (O) :
                <input type="text" value={this.state.playerTwo} onChange={this.handlePlayerTwoChange} />
              </label><br/>
              <label>
                Order of tic-tac game:
                <input type="text" value = {this.state.gameOrder} onChange={this.handleOrderChange} />
              </label><br/>
              <input type="submit" value="Submit" />
            </form>
          </div>
        );
  } else {
      return (
          <div><ul>
            <li>Welcome to the game, Player (X) goes first</li>
            <li>{this.state.playerOne} (X)</li>
            <li>{this.state.playerTwo} (O)</li>
            <li><Board value={this.state.gameOrder} playerOne={this.state.playerOne} playerTwo={this.state.playerTwo}/></li>
          </ul></div>
        );
  }
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
