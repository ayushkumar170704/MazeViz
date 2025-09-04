import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function PerformanceChart({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-200">
        Algorithm Performance Comparison
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="algo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="steps" stroke="#8884d8" />
          <Line type="monotone" dataKey="pathLength" stroke="#82ca9d" />
          <Line type="monotone" dataKey="time" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
