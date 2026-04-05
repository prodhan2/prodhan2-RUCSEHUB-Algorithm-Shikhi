import React, { useState } from "react";
import DrawGraph from "@/components/draw-graph";
import $ from "jquery";
import Graph, { Path } from "@/common/graph";
import Timer from "@/common/timer";
import { appendCell, hasValue, sound, spanEdge } from "@/common/utils";
import { Colors } from "@/common/constants";

export default function DFS(props) {
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Depth First Search (DFS)</h3>

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
              <strong>DFS</strong> হলো একটি graph traversal algorithm যা
              এক node থেকে শুরু করে যত গভীরে সম্ভব explore করে এবং
              পরে backtrack করে। এটি stack ব্যবহার করে nodes visit করে
              এবং connected components খুঁজে বের করতে বা path পরীক্ষা করতে
              উপযোগী।
            </>
          ) : (
            <>
              <strong>DFS</strong> (Depth First Search) explores a graph
              by going as deep as possible along each path before backtracking.
              It uses a stack to track nodes and is useful for finding
              connected components or exploring all paths.
            </>
          )}
        </p>

        <DrawGraph
          {...props}
          onStart={start}
          onClear={() => {
            $("#visited").html("");
            $("#dfsStack").html("");
          }}
        />

        <div id="visited" className="d-flex numGrid alphaGrid" />
        <div id="dfsStack" className="d-flex numGrid alphaGrid" />
      </div>

      {showStory && (
        <div
          style={{
            width: "35%",
            padding: "20px",
            borderLeft: "2px solid #ddd",
            background: "#fafafa",
            overflowY: "auto"
          }}
        >
          <button
            className="btn btn-danger btn-sm mb-3"
            onClick={() => setShowStory(false)}
          >
            Close ❌
          </button>

          <h4>📘 DFS Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="DFS Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            কল্পনা করো তুমি একটা গোলকধাঁধা (maze) ঘুরে বের করছো।<br />
            DFS-এ তুমি এক পথ ধরে যতদূর সম্ভব এগিয়ে যাবে।<br />
            সামনে নতুন রাস্তা না পেলে পিছনে ফিরে (backtrack) অন্য রাস্তা ধরবে।
          </p>

          <p style={{ lineHeight: "1.8" }}>
            ঠিক যেমন বুকমার্ক রেখে বই পড়া হয়, DFS-এ stack সেই বুকমার্কের কাজ করে।<br />
            শেষ যে node-এ গেছো, আগে সেটাই থেকে ফিরে আসো (LIFO)।
          </p>

          <p>
            সহজে মনে রাখো: <strong>DFS = Deep + Stack + Backtrack</strong><br />
            উদাহরণ: A থেকে শুরু করে order হতে পারে A → B → D → C → E
          </p>
        </div>
      )}
    </div>
  );
}

// DFS Logic

var stack, i, v, prev;
var r, delay = 800;

function start(source) {
  v = [source];
  stack = [];
  prev = [];
  i = source;
  Timer.timeout(() => {
    sound("pop");
    $(".vrtx").eq(i).attr("stroke", Colors.visited);
    $(".vrtx").eq(i).attr("fill", Colors.visited);
    appendCell("#visited", String.fromCharCode(65 + i));
    Timer.timeout(explore, delay, 0);
  }, delay);
  return new Promise((res) => (r = res));
}

function explore(j) {
  if (j < Graph.totalPoints()) {
    let ei = Graph.edgeIndex(i, j);
    if (hasValue(ei)) {
      if (!v.includes(j) && !stack.includes(j)) {
        Path(".edge").eq(ei).attr("stroke", Colors.enqueue);
        $(".vrtx").eq(j).attr("stroke", Colors.enqueue);
        $(".vrtx").eq(j).attr("fill", Colors.enqueue);
        stack.push(j);
        prev[j] = i;
        sound("pop");
        appendCell("#dfsStack", String.fromCharCode(65 + j));
        Timer.timeout(explore, delay, ++j);
      } else explore(++j);
    } else explore(++j);
  } else {
    Timer.timeout(visit, delay / 2);
  }
}

function visit() {
  $(".vrtx").eq(i).attr("fill", Colors.vertex);
  if (stack.length) {
    i = stack.pop();
    sound("pop");
    $("#dfsStack").children().last().remove();
    if (v.indexOf(i) === -1) {
      v.push(i);
      Timer.timeout(() => {
        spanEdge(prev[i], i).then(dequeue);
        appendCell("#visited", String.fromCharCode(65 + i));
      }, delay / 2);
    } else {
      Timer.timeout(visit, delay);
    }
  } else r();
}

function dequeue() {
  $(".vrtx").eq(i).attr("fill", Colors.visited);
  Timer.timeout(explore, delay, 0);
}
