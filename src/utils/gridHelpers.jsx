export const createGrid = (numRows, numCols) => {
  const grid = [];
  for (let r = 0; r < numRows; r++) {
    const row = [];
    for (let c = 0; c < numCols; c++) {
      row.push({
        row: r,
        col: c,
        isStart: r === 0 && c === 0,
        isEnd: r === numRows - 1 && c === numCols - 1,
        isWall: false,
        isVisited: false,
        isPath: false,
      });
    }
    grid.push(row);
  }
  return grid;
};

export const resetGrid = (grid) =>
  grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      isVisited: false,
      isPath: false,
    }))
  );
