import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Stats from "./components/Stats";
import ThemeToggle from "./components/ThemeToggle";
import { createGrid, resetGrid } from "./utils/gridHelpers";
import { generateRandomMaze } from "./utils/mazeGenerator";
import dfs from "./algorithms/dfs";
import bfs from "./algorithms/bfs";
import dijkstra from "./algorithms/dijkstra";
import PerformanceChart from "./components/PerformanceChart";


const numRows = 20;
const numCols = 30;

export default function App() {
  const [grid, setGrid] = useState(createGrid(numRows, numCols));
  const [stats, setStats] = useState({ steps: 0, pathLength: 0, time: 0 });
  const [speed, setSpeed] = useState(50);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]); // ✅ for performance tracking

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSolve = async (algorithm = "dfs") => {
    setGrid(resetGrid(grid));
    const startTime = performance.now();

    let result;
    if (algorithm === "dfs") result = await dfs(grid, setGrid, speed);
    else if (algorithm === "bfs") result = await bfs(grid, setGrid, speed);
    else if (algorithm === "dijkstra") result = await dijkstra(grid, setGrid, speed);

    const endTime = performance.now();
    const newStats = {
      steps: result.steps,
      pathLength: result.pathLength,
      time: (endTime - startTime).toFixed(2),
      algo: algorithm.toUpperCase(),
    };
    setStats(newStats);
    setHistory((prev) => [...prev, newStats]); // ✅ save to history
  };

  const handleReset = () => {
    setGrid(createGrid(numRows, numCols));
    setStats({ steps: 0, pathLength: 0, time: 0 });
    setHistory([]);
  };

  const handleGenerateMaze = () => {
    setGrid(generateRandomMaze(numRows, numCols));
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between w-full max-w-5xl">
        <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 drop-shadow">
          Maze Solver & Pathfinding Visualizer
        </h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <Controls
        onSolve={handleSolve}
        onReset={handleReset}
        onGenerateMaze={handleGenerateMaze}
        speed={speed}
        setSpeed={setSpeed}
      />
      <Grid grid={grid} setGrid={setGrid} />
      <Stats stats={stats} />
      <PerformanceChart history={history} />

    </div>
  );
}
