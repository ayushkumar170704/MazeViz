import React from "react";

export default function Stats({ stats }) {
  return (
    <div className="p-2 bg-white rounded shadow-md">
      <p>Steps Taken: {stats.steps}</p>
      <p>Path Length: {stats.pathLength}</p>
      <p>Time Taken: {stats.time} ms</p>
    </div>
  );
}
