const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function bfs(grid, setGrid) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const start = grid[0][0];
  const end = grid[numRows - 1][numCols - 1];

  const queue = [start];
  const visited = new Set([`${start.row}-${start.col}`]);
  const parent = new Map();

  let steps = 0;
  let pathLength = 0;

  while (queue.length > 0) {
    const cell = queue.shift();
    steps++;

    // Mark as visited
    setGrid((prev) =>
      prev.map((r) =>
        r.map((c) =>
          c.row === cell.row && c.col === cell.col
            ? { ...c, isVisited: true }
            : c
        )
      )
    );
    await sleep(20);

    if (cell.row === end.row && cell.col === end.col) {
      // Reconstruct path
      let pathCell = `${end.row}-${end.col}`;
      while (parent.has(pathCell)) {
        const [r, c] = pathCell.split("-").map(Number);
        pathLength++;
        setGrid((prev) =>
          prev.map((row) =>
            row.map((cell) =>
              cell.row === r && cell.col === c
                ? { ...cell, isPath: true }
                : cell
            )
          )
        );
        pathCell = parent.get(pathCell);
      }
      return { steps, pathLength };
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (let [dr, dc] of directions) {
      const newRow = cell.row + dr;
      const newCol = cell.col + dc;
      const key = `${newRow}-${newCol}`;

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < numRows &&
        newCol < numCols &&
        !visited.has(key) &&
        !grid[newRow][newCol].isWall
      ) {
        visited.add(key);
        queue.push(grid[newRow][newCol]);
        parent.set(key, `${cell.row}-${cell.col}`);
      }
    }
  }

  return { steps, pathLength: 0 }; // No path found
}
