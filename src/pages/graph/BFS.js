import React, { useState } from "react";
import DrawGraph from "@/components/draw-graph";
import $ from "jquery";
import Graph, { Path } from "@/common/graph";
import Timer from "@/common/timer";
import { appendCell, hasValue, sound, spanEdge } from "@/common/utils";
import { Colors } from "@/common/constants";

export default function BFS(props) {
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Breadth First Search (BFS)</h3>

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
              <strong>BFS</strong> হলো একটি graph traversal algorithm যা
              level-by-level graph explore করে। এটি একটি queue ব্যবহার করে
              nodes visit করে এবং unweighted graph-এ shortest path
              খুঁজে পেতে বা connectivity check করতে সুবিধাজনক।
            </>
          ) : (
            <>
              <strong>BFS</strong> (Breadth First Search) explores a graph
              level by level, using a queue to visit nodes. It is ideal for
              finding the shortest path in an unweighted graph and checking
              connectivity.
            </>
          )}
        </p>

        <DrawGraph
          {...props}
          onStart={start}
          onClear={() => {
            $("#visited").html("");
            $("#bfsQueue").html("");
          }}
        />

        <div id="visited" className="d-flex numGrid alphaGrid" />
        <div id="bfsQueue" className="d-flex numGrid alphaGrid" />
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

          <h4>📘 BFS Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="BFS Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ভাবো তুমি একজন ক্লাস মনিটর। তোমার কাছে জরুরি নোটিশ এসেছে,
            আর পুরো স্কুলে খবর দিতে হবে।<br />
            তুমি আগে নিজের পাশের ক্লাসগুলোতে খবর দিলে। তারপর ওই ক্লাসগুলোর
            পাশের ক্লাসে খবর গেল।<br />
            অর্থাৎ খবরটি ছড়ালো <strong>লেভেল ধরে ধরে</strong>। এটাই BFS।
          </p>

          <p style={{ lineHeight: "1.8" }}>
            BFS-এ queue কাজ করে টোকেন লাইনের মতো:<br />
            যে আগে লাইনে ঢোকে, সে আগে সার্ভিস পায়।<br />
            তাই traversal order হয়: কাছের node আগে, দূরের node পরে।
          </p>

          <p>
            সহজে মনে রাখো: <strong>BFS = Breadth + Queue + Level</strong><br />
            উদাহরণ: A থেকে শুরু করলে order হতে পারে A → B → C → D → E → F
          </p>
        </div>
      )}
    </div>
  );
}

// BFS Logic

var queue, k;
var v, i, prev;
var r, delay = 800;

function start(source) {
  v = [source];
  queue = [];
  prev = [];
  i = source;
  k = 0;
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
      if (!v.includes(j) && !queue.includes(j)) {
        Path(".edge").eq(ei).attr("stroke", Colors.enqueue);
        $(".vrtx").eq(j).attr("stroke", Colors.enqueue);
        $(".vrtx").eq(j).attr("fill", Colors.enqueue);
        queue.push(j);
        prev[j] = i;
        sound("pop");
        appendCell("#bfsQueue", String.fromCharCode(65 + j));
        Timer.timeout(explore, delay, ++j);
      } else explore(++j);
    } else explore(++j);
  } else {
    Timer.timeout(visit, delay / 2);
  }
}

function visit() {
  $(".vrtx").eq(i).attr("fill", Colors.vertex);
  if (queue.length) {
    i = queue.shift();
    sound("pop");
    $("#bfsQueue").children().eq(k++).css("visibility", "hidden");
    if (v.indexOf(i) === -1) {
      v.push(i);
      Timer.timeout(() => {
        appendCell("#visited", String.fromCharCode(65 + i));
        spanEdge(prev[i], i).then(dequeue);
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
