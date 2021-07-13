/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import Container from './component/container/Containes';
//import Board from './component/test/boardtest';
import Board from './component/board/Board.jsx';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <>
        <div>
          <Container />
          <Board />


        </div>

      </>
    )
  }
}
export default App;