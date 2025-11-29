import React from "react";
import Layout from "@/components/layout";

export default function BFSAdvancedPage() {
  return (
    <Layout selected="BFS">
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontWeight: 700 }}>BFS (Breadth First Search) – Advanced</h1>

        <p style={{ marginTop: "10px", lineHeight: "1.7" }}>
          Breadth First Search (BFS) একটি Graph Traversal Algorithm, যা গ্রাফের সকল নোডকে
          level-by-level ভিজিট করে। এটি মূলত Queue ব্যবহার করে।
        </p>

        <h2 style={{ marginTop: "20px" }}>কিভাবে কাজ করে?</h2>
        <ul>
          <li>১) প্রথমে source node কে queue তে push করা হয়।</li>
          <li>২) Queue থেকে একটি নোড বের করে তার সকল পাশের নোডকে ভিজিট করা হয়।</li>
          <li>৩) পাশের নোডগুলো queue তে push করা হয়।</li>
          <li>৪) Queue empty না হওয়া পর্যন্ত repeat করা হয়।</li>
        </ul>

        <h2 style={{ marginTop: "20px" }}>Uses</h2>
        <ul>
          <li>Shortest Path in Unweighted Graph</li>
          <li>Level Order Traversal</li>
          <li>Finding Connected Components</li>
        </ul>
      </div>
    </Layout>
  );
}
