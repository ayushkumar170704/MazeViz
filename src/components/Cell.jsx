import React from "react";
import { motion } from "framer-motion";

export default function Cell({ cell, onMouseDown, onMouseEnter, onMouseUp }) {
  const getColor = () => {
    if (cell.isStart) return "bg-green-500";
    if (cell.isEnd) return "bg-red-500";
    if (cell.isWall) return "bg-white"; // 🔥 wall is white now
    if (cell.isVisited) return "bg-blue-400";
    if (cell.isPath) return "bg-yellow-400";
    return "bg-gray-200 dark:bg-gray-900"; // ✅ empty cell stays light/dark
  };

  return (
    <motion.div
      className={`w-5 h-5 border border-gray-300 dark:border-gray-700 ${getColor()}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    />
  );
}
