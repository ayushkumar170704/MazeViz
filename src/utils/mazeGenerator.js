export function generateRandomMaze(rows, cols) {
  const maze = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isWall: Math.random() < 0.3, // 30% chance of wall
      isVisited: false,
      isPath: false,
      isStart: r === 0 && c === 0,
      isEnd: r === rows - 1 && c === cols - 1,
    }))
  );

  // Ensure start/end are not walls
  maze[0][0].isWall = false;
  maze[rows - 1][cols - 1].isWall = false;

  return maze;
}
