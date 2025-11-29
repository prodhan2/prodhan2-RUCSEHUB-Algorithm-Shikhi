import Link from "next/link";
import React from "react";

export default function AdvancedIndex() {
  // এখানে আপনি চাইলে নিজের algorithms list দিবেন
  const algorithms = [
    { id: "bfs", name: "Breadth First Search (BFS)" },
    { id: "dfs", name: "Depth First Search (DFS)" },
    { id: "dijkstra", name: "Dijkstra Algorithm" },
    // চাইলে আরও add করতে পারবেন
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Advanced Algorithms</h1>
      <ul style={{ lineHeight: "2rem", fontSize: "18px" }}>
        {algorithms.map((algo) => (
          <li key={algo.id}>
            <Link href={`/advanced/${algo.id}`}>
              {algo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
