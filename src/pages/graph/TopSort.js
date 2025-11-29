import React, { useState } from "react";
import DrawGraph from "@/components/draw-graph";
import $ from "jquery";
import Graph, { Path, Point } from "@/common/graph";
import Timer from "@/common/timer";
import {
  appendCell,
  clearGraph,
  createGraph,
  fromDistance,
  hasValue,
  sound,
} from "@/common/utils";
import { Colors } from "@/common/constants";
import Link from "next/link";

export default function TopSort(props) {
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Topological Sorting (DAG)</h3>

          <button
            onClick={() => setIsBangla(!isBangla)}
            className="btn btn-sm btn-primary"
          >
            {isBangla ? "Switch to English" : "বাংলায় দেখুন"}
          </button>

          <button
            onClick={() => setShowStory(true)}
            className="btn btn-sm btn-success ms-2"
          >
            Learn With Story 📘
          </button>
        </div>

        <p>
          {isBangla ? (
            <>
              <strong>Topological Sorting</strong> হলো Directed Acyclic Graph
              (DAG)-এর nodes গুলোর একটি ordering, যেখানে প্রতিটি node তার
              dependent nodes-এর আগে আসে। এটি task scheduling বা dependency
              resolution-এ ব্যবহার হয়। Kahn&apos;s Algorithm অথবা{" "}
              <Link href="/graph/DFS">DFS</Link> stack ব্যবহার করে করা যায়।
            </>
          ) : (
            <>
              <strong>Topological Sorting</strong> is an ordering of nodes in
              a Directed Acyclic Graph (DAG) such that each node appears before
              all nodes it points to. Useful for task scheduling and dependency
              resolution. Can be done via Kahn&apos;s Algorithm or{" "}
              <Link href="/graph/DFS">DFS</Link> with a stack.
            </>
          )}
        </p>

        <DrawGraph
          {...props}
          onStart={start}
          onClear={() => $("#visited").html("")}
          allowDirected={true}
          customSource={false}
        />
        <div id="visited" className="d-flex numGrid alphaGrid" />
      </div>

      {showStory && (
        <div
          style={{
            width: "35%",
            padding: "20px",
            borderLeft: "2px solid #ddd",
            background: "#fafafa",
            overflowY: "auto",
          }}
        >
          <button
            className="btn btn-danger btn-sm mb-3"
            onClick={() => setShowStory(false)}
          >
            Close ❌
          </button>

          <h4>📘 Topological Sorting Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="TopSort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন একটি DAG আছে যেখানে বিভিন্ন কাজ একে অপরের উপর নির্ভরশীল।<br />
            Topological Sorting নিশ্চিত করে যে কোন কাজ শুরু হবে তার নির্ভরতা অনুযায়ী।<br />
            Kahn&apos;s Algorithm nodes এর in-degree চেক করে zero in-degree nodes আগে
            নির্বাচন করে।<br />
            DFS ব্যবহার করেও stack থেকে nodes pop করে ordering তৈরি করা যায়।
          </p>
        </div>
      )}
    </div>
  );
}

// Topological Sorting Logic

var n, ind, stack;
var delay = 800;

function start() {
  n = Graph.totalPoints();
  ind = Graph.indegree();
  stack = [];
  for (let i = 0; i < n; i++) {
    if (ind[i] === 0) {
      $(`.vrtx:eq(${i})`).attr("stroke", Colors.visited);
      stack.push(i);
    }
  }
  return Timer.sleep(delay).then(topSort);
}

async function topSort() {
  if (stack.length > 0) {
    let i = stack.pop();
    sound("pop");
    $(`.vrtx:eq(${i})`).attr("fill", Colors.visited);
    let promises = [];
    for (let j = 0; j < Graph.totalPoints(); j++) {
      let ei = Graph.edgeIndex(i, j);
      if (hasValue(ei) && ind[j] !== 0) {
        --ind[j];
        Path(".edge").eq(ei).attr("stroke", Colors.visited);
        if (ind[j] === 0) {
          $(`.vrtx:eq(${j})`).attr("stroke", Colors.visited);
          stack.push(j);
        }
        let [p, q] = [i, j].map(Graph.point);
        let d = Point.distance(p, q);
        promises.push(() => extract(i, j, d - 25));
      }
    }
    if (promises.length) {
      await Timer.sleep(delay);
      sound("swap");
      await Promise.all(promises.map((p) => p()));
    }
    await Timer.sleep(delay).then(() => fall(i));
    await Timer.sleep(delay).then(topSort);
  } else {
    const graph = Graph.skeleton();
    clearGraph();
    Graph.initialize(graph);
    createGraph(graph);
  }
}

function extract(i, j, d) {
  let [p, q] = [i, j].map(Graph.point);
  let edge = Path(".edge").eq(Graph.edgeIndex(i, j));
  if (d > 0) {
    let r = fromDistance(q, p, d);
    edge.attr("x2", r.x);
    edge.attr("y2", r.y);
    edge.attr("cx", (p.x + r.x) / 2);
    edge.attr("cy", (p.y + r.y) / 2);
    return Timer.sleep(5).then(() => extract(i, j, d - 2));
  } else {
    edge.removeAttr("stroke");
    edge.removeAttr("marker-end");
  }
}

function fall(i) {
  let cy = Number($(`.vrtx:eq(${i})`).attr("cy"));
  if (cy < $("#plane").height() + 20) {
    $(`.vrtx:eq(${i})`).attr("cy", cy + 2);
    $(`.vlbl:eq(${i})`).attr("y", cy + 7);
    return Timer.sleep(5).then(() => fall(i));
  } else {
    appendCell("#visited", String.fromCharCode(65 + i));
    n--;
  }
}
