import React, { useState } from "react";
import Cell from "./Cell";

export default function Grid({ grid, setGrid }) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleWall = (row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) =>
        r.map((cell) =>
          cell.row === row && cell.col === col
            ? { ...cell, isWall: !cell.isWall }
            : cell
        )
      );
      return newGrid;
    });
  };

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMouseDown) return;
    toggleWall(row, col);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="grid gap-0"
      style={{
        gridTemplateRows: `repeat(${grid.length}, 20px)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
      }}
      onMouseLeave={handleMouseUp} // in case cursor leaves grid
    >
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) => (
          <Cell
            key={`${rIdx}-${cIdx}`}
            cell={cell}
            onMouseDown={() => handleMouseDown(rIdx, cIdx)}
            onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
            onMouseUp={handleMouseUp}
          />
        ))
      )}
    </div>
  );
}
