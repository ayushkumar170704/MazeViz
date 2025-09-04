import React from "react";

export default function Controls({ onSolve, onReset }) {
  return (
    <div className="space-x-2">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => onSolve("dfs")}
      >
        Solve (DFS)
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onSolve("bfs")}
      >
        Solve (BFS)
      </button>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded"
        onClick={() => onSolve("dijkstra")}
      >
        Solve (Dijkstra)
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}
