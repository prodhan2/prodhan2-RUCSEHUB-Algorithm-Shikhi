import React, { useState } from "react";
import DrawGraph from "@/components/draw-graph";
import $ from "jquery";
import Graph from "@/common/graph";
import Timer from "@/common/timer";
import { appendCell, cloneEdge, hasValue, spanEdge } from "@/common/utils";
import { Colors } from "@/common/constants";

export default function Hamiltonian(props) {
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Hamiltonian Cycle</h3>

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
              <strong>Hamiltonian Cycle</strong> হলো এমন একটি path যা প্রতিটি
              node ঠিক একবার visit করে এবং আবার starting node এ ফিরে আসে।<br />
              এটি routing, scheduling এবং circuit design-এ ব্যবহার হয়।<br />
              Travelling Salesman Problem (TSP) এর সাথে সম্পর্কিত।
            </>
          ) : (
            <>
              A <strong>Hamiltonian Cycle</strong> is a path in a graph that
              visits every node exactly once and returns to the starting node.
              It is useful in routing, scheduling, and circuit design and is
              closely related to the Travelling Salesman Problem (TSP).
            </>
          )}
        </p>

        <DrawGraph
          {...props}
          onStart={start}
          onClear={() => $("#path").html("")}
          allowDirected={false}
        />
        <div id="path" className="d-flex numGrid alphaGrid" />
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

          <h4>📘 Hamiltonian Cycle Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Hamiltonian Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরো তুমি একটি সাইকেল রাইড প্ল্যান করছো।<br />
            শর্ত হলো: প্রতিটি শহরে <strong>একবারই</strong> যাবে, এবং শেষে
            আবার শুরু করা শহরে ফিরবে।<br />
            এই নিখুঁত রাউন্ড-ট্রিপটাই Hamiltonian Cycle।
          </p>

          <p style={{ lineHeight: "1.8" }}>
            কোনো শহর থেকে এগোনোর রাস্তা না পেলে algorithm পিছিয়ে এসে
            (backtrack) অন্য রাস্তা চেষ্টা করে।<br />
            তাই এটি trial-and-error style এ valid cycle খোঁজে।
          </p>

          <p>
            সহজে মনে রাখো: <strong>Visit everyone once, then come back home</strong>
          </p>
        </div>
      )}
    </div>
  );
}

// Hamiltonian Logic

var src, v;
var delay = 500;

async function start(source) {
  src = source;
  v = Array(Graph.totalPoints()).fill(0);
  v[src] = 1;
  await Timer.sleep(1000);
  $(".vrtx").eq(src).attr("stroke", Colors.visited);
  $(".vrtx").eq(src).attr("fill", Colors.visited);
  appendCell("#path", String.fromCharCode(65 + src));
  await Timer.sleep(delay);
  await findCycle(src);
}

async function findCycle(i) {
  if (v.indexOf(0) === -1) {
    let ei = Graph.edgeIndex(i, src);
    if (hasValue(ei)) {
      await spanEdge(i, src);
      return true;
    }
  }
  await Timer.sleep(delay);
  for (let j = 0; j < Graph.totalPoints(); j++) {
    let ei = Graph.edgeIndex(i, j);
    if (hasValue(ei) && v[j] === 0) {
      await spanEdge(i, j);
      appendCell("#path", String.fromCharCode(65 + j));
      v[j] = 1;
      if (await findCycle(j)) return true;
      v[j] = 0;
      await Timer.sleep(delay);
      await revertSpan(i, j);
      $("#path").children().last().remove();
      await Timer.sleep(delay);
    }
  }
}

function revertSpan(i, j) {
  const ei = Graph.edgeIndex(i, j);
  $(".edge").eq(ei).attr("stroke", Colors.stroke);
  $(".vrtx").eq(j).attr("stroke", Colors.stroke);
  const edge = cloneEdge(i, j);
  const d = edge[0].getTotalLength();
  const t = 1000 / (d / 2);
  const seg = Graph.segments()[ei];
  function span(dash) {
    if (dash < d) {
      edge.attr("stroke-dasharray", `${d - dash} ${dash}`);
      if (i !== seg[0]) {
        edge.attr("stroke-dashoffset", d - dash);
      }
      return Timer.sleep(t).then(() => span(dash + 2));
    } else edge.remove();
  }
  return span(2);
}
