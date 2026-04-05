import React, { useState } from "react";
import DrawGraph from "@/components/draw-graph";
import $ from "jquery";
import Graph, { Path } from "@/common/graph";
import Timer from "@/common/timer";
import { getCostMatrix, hasValue, spanEdge } from "@/common/utils";
import { Colors } from "@/common/constants";

export default function PrimsMST(props) {
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Prim&apos;s Algorithm (MST)</h3>

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
              <strong>Prim&apos;s Algorithm</strong> একটি Minimum Spanning Tree
              (MST) তৈরি করার জন্য ব্যবহৃত হয়। এটি একটি node থেকে শুরু করে
              সর্বনিম্ন weight এর edge নির্বাচন করে tree-তে নতুন node যোগ করে
              যতক্ষণ না সব node অন্তর্ভুক্ত হয়। এটি network design যেমন
              computer network বা road network optimization এ ব্যবহার হয়।
            </>
          ) : (
            <>
              <strong>Prim&apos;s Algorithm</strong> builds a Minimum Spanning
              Tree (MST) by starting from any node and adding the smallest edge
              that connects the tree to a new node, repeating until all nodes
              are included. Useful for optimizing computer or road networks.
            </>
          )}
        </p>

        <DrawGraph
          {...props}
          onStart={start}
          weighted={true}
          allowDirected={false}
        />
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

          <h4>📘 Prim&apos;s MST Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Prim's Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরো তুমি একটি গ্রামে বিদ্যুতের লাইন দিতে চাও।<br />
            Prim&apos;s Algorithm একটি ঘর থেকে শুরু করে, current network-এর
            বাইরে থাকা ঘরগুলোর মধ্যে সবচেয়ে কম খরচের সংযোগটি বেছে নেয়।<br />
            তারপর নতুন ঘরটিকে network-এ যুক্ত করে।
          </p>

          <p style={{ lineHeight: "1.8" }}>
            এইভাবে tree ধীরে ধীরে বড় হয়, এবং সব node যুক্ত না হওয়া পর্যন্ত
            cheapest connector বেছে নেওয়া হয়।<br />
            তাই পুরো network-এর মোট খরচ কম থাকে।
          </p>

          <p>
            সহজে মনে রাখো: <strong>Start one node, grow by nearest cheap edge</strong>
          </p>
        </div>
      )}
    </div>
  );
}

// Prim's MST Logic

var n, w;
var mst, i, j;
var queue;
var r, delay = 1000;

function start(source) {
  $('.cost').each(function () {
    this.setAttribute('value', this.value);
    this.setAttribute('readonly', true);
  });

  n = Graph.totalPoints();
  w = getCostMatrix();
  queue = [];
  mst = [];
  i = source;

  Timer.timeout(() => {
    $('.vrtx').eq(i).attr('stroke', Colors.visited);
    $('.vrtx').eq(i).attr('fill', Colors.visited);
    Timer.timeout(enqueue, delay);
  }, delay);

  return new Promise((res) => (r = res));
}

function enqueue() {
  mst.push(i);
  queue = queue.concat(Array(n).fill(Infinity));
  w[i] = w[i] || [];
  w[i].forEach((val, j) => {
    queue[n * i + j] = val;
  });

  for (let k = 0; k < n; k++) {
    if (mst.indexOf(k) === -1 && hasValue(w[i][k])) {
      let ei = Graph.edgeIndex(i, k);
      Path('.edge').eq(ei).attr('stroke', Colors.enqueue);
      $('.vrtx').eq(k).attr('stroke', Colors.enqueue);
      $('.vrtx').eq(k).attr('fill', Colors.enqueue);
    }
  }

  Timer.timeout(extractMin, delay);
}

function extractMin() {
  let min = queue.reduce((a, b) => (b < a ? b : a), Infinity);
  if (min === Infinity) return r();
  let k = queue.indexOf(min);
  queue[k] = Infinity;
  i = Math.floor(k / n);
  j = k % n;

  if (mst.indexOf(j) > -1) {
    extractMin();
  } else {
    spanEdge(i, j).then(() => {
      $('.vrtx').eq(j).attr('fill', Colors.visited);
      i = j;
      if (mst.length < n) {
        Timer.timeout(enqueue, delay);
      }
    });
  }
}
