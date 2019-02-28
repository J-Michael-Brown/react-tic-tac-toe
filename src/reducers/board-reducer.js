export default (state = {}, action) = {
  let newState;
  const history = state.history.slice(0,state.stepNumber+1);
  const current = history[history.length-1];
  const squares = current.squares.slice();
  const { i, } = action;
  switch(action.type){
    case 'NEW_MOVE':
      squares[i] = state.xIsNext ? 'X' : 'O';
      newState = {
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext
      };
      return newState;
    case 'CALC_WINNER':
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const [a, b, c] = lines[lineIndex];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    default:
      return state;
  }
}
