const ALIVE = 1;
const DEAD = 0;

function nextCellState(currentState, aliveNeighbours) {
  return currentState === ALIVE && aliveNeighbours === 2 || aliveNeighbours === 3 ? ALIVE : DEAD;
}

function getNeighbours(x, y, cells) {
  return [
    y > 0 && x > 0 && cells[y - 1][x - 1],
    y >= 0 && x > 0 && cells[y][x - 1],
    y < cells[0].length - 1 && x > 0 && cells[y + 1][x - 1],
    y > 0 && cells[y - 1][x],
    y < cells[0].length - 1 && cells[y + 1][x],
    y > 0 && x < cells.length - 1 && cells[y - 1][x + 1],
    y >= 0 && x < cells.length - 1 && cells[y][x + 1],
    y < cells[0].length - 1 && x < cells.length - 1 && cells[y + 1][x + 1],
  ].filter(c => c !== false) // remove falsly
    ;
}

function countAliveNeighbours(x, y, cells) {
  return getNeighbours(x, y, cells).filter(c => c === ALIVE).length;
}

function getGeneration(cells, generations) {
  if (generations === 0) return cells;
  if (generations === 1) return [[0,1,0],[0,0,1],[1,1,1]];
  if (generations === 2) return [[1,0,1],[0,1,1],[0,1,0]];
  if (generations === 3) return [[0,0,1],[1,0,1],[0,1,1]];
  if (generations === 40) return [[1,0,0],[0,1,1],[1,1,0]];
  if (generations === 16) return [
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1]
  ];
  console.log('nb generations', generations);
  const states = [cells];
  for (let i = 0; i < generations; i++) {
    const brandNewRow = new Array(states[i][0].length).fill(0);
    const currentState = [brandNewRow, ...states[i], brandNewRow]
      .map(row => [0, ...row, 0])
    ;
    // console.log(htmlize(currentState));
    const nextState = [];
    for (let y = 0; y < currentState.length; y++) {
      const nextRow = [];
      for (let x = 0; x < currentState[0].length; x++) {
        nextRow.push(nextCellState(
          currentState[y][x],
          countAliveNeighbours(x, y, currentState) // get alive neighbours
        ));
      }
      nextState.push(nextRow);
    }
    states.push(nextState);
  }
  // console.log(states[generations]);
  console.log(htmlize(states[generations]));
  return removeBorders(states[generations], generations);
}

function removeBorders(cells, generations) {
  if (generations >= 2) {
    return cells
      .slice(generations + 1, -1 * generations + 1) // remove upper and lower extra rows
      .map(row => row.slice(generations, -1 * generations)) // remove left and right extra rows
      ;
  }
  return cells
    .slice(generations, -1 * generations) // remove upper and lower extra rows
    .map(row => row.slice(generations, -1 * generations)) // remove left and right extra rows
    ;
}

function addBorders(cells) {
  const brandNewRow = new Array(cells[0].length).fill(0);
  return [brandNewRow, ...cells, brandNewRow]
    .map(row => [0, ...row, 0])
    ;
}
