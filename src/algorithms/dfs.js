const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function dfs(grid, setGrid) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const visited = new Set();
  let steps = 0;
  let pathLength = 0;

  const dfsHelper = async (row, col) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= numRows ||
      col >= numCols ||
      visited.has(`${row}-${col}`)
    ) {
      return false;
    }

    const cell = grid[row][col];
    if (cell.isWall) return false;

    visited.add(`${row}-${col}`);
    steps++;

    setGrid((prev) =>
      prev.map((r) =>
        r.map((c) =>
          c.row === row && c.col === col ? { ...c, isVisited: true } : c
        )
      )
    );
    await sleep(20);

    if (cell.isEnd) return true;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (let [dr, dc] of directions) {
      if (await dfsHelper(row + dr, col + dc)) {
        pathLength++;
        setGrid((prev) =>
          prev.map((r) =>
            r.map((c) =>
              c.row === row && c.col === col ? { ...c, isPath: true } : c
            )
          )
        );
        return true;
      }
    }
    return false;
  };

  await dfsHelper(0, 0);
  return { steps, pathLength };
}
