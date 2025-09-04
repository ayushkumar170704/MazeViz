const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Simple Priority Queue using array (can replace with binary heap for efficiency)
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(element, priority) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority); // smallest priority first
  }
  dequeue() {
    return this.items.shift().element;
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

export default async function dijkstra(grid, setGrid) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const start = grid[0][0];
  const end = grid[numRows - 1][numCols - 1];

  const pq = new PriorityQueue();
  const distances = {};
  const parent = new Map();
  const visited = new Set();

  // Initialize distances
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      distances[`${r}-${c}`] = Infinity;
    }
  }
  distances[`${start.row}-${start.col}`] = 0;
  pq.enqueue(start, 0);

  let steps = 0;
  let pathLength = 0;

  while (!pq.isEmpty()) {
    const cell = pq.dequeue();
    const key = `${cell.row}-${cell.col}`;

    if (visited.has(key)) continue;
    visited.add(key);
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
      const neighborKey = `${newRow}-${newCol}`;

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < numRows &&
        newCol < numCols &&
        !grid[newRow][newCol].isWall
      ) {
        const newDist = distances[key] + 1; // all edges weight = 1
        if (newDist < distances[neighborKey]) {
          distances[neighborKey] = newDist;
          parent.set(neighborKey, key);
          pq.enqueue(grid[newRow][newCol], newDist);
        }
      }
    }
  }

  return { steps, pathLength: 0 }; // No path found
}
