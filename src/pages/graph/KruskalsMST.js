import React, { useState } from "react";
import DrawGraph from "@/components/draw-graph";
import $ from "jquery";
import Graph, { Path } from "@/common/graph";
import Timer from "@/common/timer";
import { Colors } from "@/common/constants";
import { hasValue, sound } from "@/common/utils";

export default function KruskalsMST(props) {
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Kruskal&apos;s Algorithm (MST)</h3>

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
              <strong>Kruskal&apos;s Algorithm</strong> একটি Minimum Spanning
              Tree (MST) তৈরি করার জন্য ব্যবহৃত হয়। এটি সমস্ত edges
              weight অনুযায়ী sort করে এবং cycle না তৈরি করে smallest
              edge গুলো যোগ করে। Sparse graph এ এটি কার্যকর এবং connected
              components track করতে union-find ব্যবহার করে।
            </>
          ) : (
            <>
              <strong>Kruskal&apos;s Algorithm</strong> builds a Minimum
              Spanning Tree (MST) by sorting all edges and adding them in order
              of increasing weight, ensuring no cycles are formed. Efficient for
              sparse graphs using a union-find structure.
            </>
          )}
        </p>

        <DrawGraph
          {...props}
          onStart={start}
          weighted={true}
          allowDirected={false}
          customSource={false}
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

          <h4>📘 Kruskal&apos;s MST Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Kruskal's Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন একটি গ্রাফ আছে যেখানে বিভিন্ন node সংযুক্ত।<br />
            Kruskal&apos;s Algorithm সমস্ত edge কে weight অনুযায়ী sort
            করে এবং cycle তৈরি না করে tree তে যোগ করে।<br />
            এভাবে যতক্ষণ না সব node যোগ হয়, Minimum Spanning Tree তৈরি হয়।<br />
            Sparse network design এবং connectivity নিশ্চিত করার জন্য এটি
            ব্যবহার হয়।
          </p>
        </div>
      )}
    </div>
  );
}

// Kruskal's MST Logic

var parent;
var arr, mst, k;
var r, delay = 1000;

function start() {
  arr = [];
  $('.cost').each(function () {
    let edge = {};
    edge.w = Number($(this).val()) || 1;
    arr.push(edge);
  });

  let n = Graph.totalPoints();
  parent = [];
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    for (let j = 0; j < n; j++) {
      let ei = Graph.edgeIndex(i, j);
      if (hasValue(ei)) {
        arr[ei].u = i;
        arr[ei].v = j;
        arr[ei].i = ei;
      }
    }
  }

  arr.sort((a, b) => a.w - b.w);
  mst = [];
  k = 0;
  Timer.timeout(nextMin, delay);

  return new Promise((res) => (r = res));
}

function nextMin() {
  if (k < arr.length) {
    let p = findParent(arr[k].u);
    let q = findParent(arr[k].v);
    if (p !== q) {
      parent[q] = p;
      sound('pop');
      $('.vrtx').eq(arr[k].u).attr('stroke', Colors.visited);
      $('.vrtx').eq(arr[k].u).attr('fill', Colors.visited);
      $('.vrtx').eq(arr[k].v).attr('stroke', Colors.visited);
      $('.vrtx').eq(arr[k].v).attr('fill', Colors.visited);
      Path('.edge').eq(arr[k].i).attr('stroke', Colors.visited);

      Timer.timeout(() => {
        $('.vrtx').eq(arr[k].u).attr('fill', Colors.vertex);
        $('.vrtx').eq(arr[k].v).attr('fill', Colors.vertex);
        mst.push(arr[k++]);
        Timer.timeout(nextMin, delay);
      }, delay / 2);
    } else {
      sound('pop');
      $('.vrtx').eq(arr[k].u).attr('stroke', 'orangered');
      $('.vrtx').eq(arr[k].v).attr('stroke', 'orangered');
      Path('.edge').eq(arr[k].i).attr('stroke', 'orangered');
      Timer.timeout(reject, delay / 2);
    }
  } else r();
}

function reject() {
  $('.vrtx').eq(arr[k].u).attr('stroke', Colors.visited);
  $('.vrtx').eq(arr[k].v).attr('stroke', Colors.visited);
  Path('.edge').eq(arr[k].i).attr('stroke', Colors.rejected);
  k++;
  Timer.timeout(nextMin, delay);
}

function findParent(q) {
  return parent[q] === q ? q : findParent(parent[q]);
}
