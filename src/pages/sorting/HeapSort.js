import React, { useState } from "react";
import { Edge, InputNumbers, Node } from "@/components/numbers";
import useAnimator from "@/hooks/useAnimator";
import binaryTree from "@/common/binaryTree";
import { Colors } from "@/common/constants";
import { sleep, sound } from "@/common/utils";
import Link from "next/link";
import useAlgorithm from "@/hooks/useAlgorithm";

var arr, Tree;
var delay = 500;

export default function HeapSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  const [scope, animator] = useAnimator();
  const { txy, bgcolor, animate } = animator;
  const [algorithm, setCurrentStep] = useAlgorithm(`
    for i = (n / 2 - 1) down to 0:
        heapify(i)
    for i = n - 1 down to 1:
        swap(0, i)
        heapify(0)
    `);

  const heapSort = async () => {
    sound("swap");
    const n = arr.length;
    Tree.insert(arr[0]);
    for (let i = 1; i < n; i++) {
      const j = Math.floor((i + 1) / 2) - 1;
      const parent = Tree.node(j);
      Tree.insert(arr[i], parent, i % 2 === 1);
    }
    await sleep(1500);
    setCurrentStep("0,1");
    const k = Math.floor(n / 2) - 1;
    for (let i = k; i >= 0; i--) {
      await heapify(Tree.node(i), n);
    }
    setCurrentStep("2,3,4");
    await sleep(delay);
    for (let i = n - 1; i > 0; i--) {
      const first = Tree.node(0);
      const last = Tree.node(i);
      if (first.value !== last.value) {
        sound("swap");
        await Tree.swapNodes(first, last);
      }
      await bgcolor(`#node${last.index}`, Colors.sorted);
      await sleep(1000);
      await heapify(Tree.node(0), i);
      await sleep(delay);
    }
    setCurrentStep("");
    const head = Tree.node(0);
    await bgcolor(`#node${head.index}`, Colors.sorted);
    await sleep(1000);
    for (let i = 0; i < n; i++) {
      txy(`#node${Tree.node(i).index}`, i * 50, 0);
      if (i < n - 1) animate(`#edge${i}`, { width: 0 }, 0);
    }
  };

  const heapify = async (node, n) => {
    const { left, right } = node;
    let max = node;
    if (left && left.key < n) {
      if (left.value > max.value) max = left;
    }
    if (right && right.key < n) {
      if (right.value > max.value) max = right;
    }
    await bgcolor(`#node${node.index}`, Colors.compare);
    if (max !== node) {
      await bgcolor(`#node${max.index}`, Colors.compare);
      sound("swap");
      await Tree.swapNodes(node, max);
      await bgcolor(`#node${node.index}`, Colors.white);
      await heapify(max, n);
    } else {
      await sleep(delay);
      await bgcolor(`#node${node.index}`, Colors.white);
    }
  };

  const handleStart = (values) => {
    setNumbers(values);
    arr = values.slice();
    sound("pop");
    Tree = binaryTree(animator);
    sleep(1500).then(heapSort).catch(() => setCurrentStep(""));
  };

  const handleStop = () => {
    setNumbers([]);
    Tree = undefined;
  };

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Heap Sort</h3>

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
              <strong>Heap Sort</strong> হলো একটি দক্ষ অ্যালগরিদম যা{" "}
              <Link href="/data-structures/BinaryHeap">Binary Heap</Link> ব্যবহার
              করে। এটি প্রথমে একটি heap তৈরি করে এবং বড় মানগুলোকে উপরে নিয়ে
              আসে, প্রতিবার সর্বোচ্চ মান বের করে heap পুনর্গঠন করা হয়। এটি
              বড় ডেটাসেটের জন্য খুব কার্যকর এবং অতিরিক্ত মেমোরি প্রয়োজন হয় না।
            </>
          ) : (
            <>
              <strong>Heap Sort</strong> is an efficient algorithm that uses a{" "}
              <Link href="/data-structures/BinaryHeap">Binary Heap</Link>. It
              builds a heap, repeatedly extracts the largest value, and
              rebuilds the heap. This method is efficient for large datasets
              without extra memory.
            </>
          )}
        </p>

        {algorithm}

        <InputNumbers onStart={handleStart} onStop={handleStop} />

        <div className="heapSort" ref={scope}>
          {numbers.slice(0, -1).map((_, i) => (
            <Edge key={i} index={i} />
          ))}
          {numbers.map((num, i) => (
            <Node key={i} index={i} value={num} animate={{ x: i * 50 }} />
          ))}
        </div>
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

          <h4>📘 Heap Sort Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Heap Sort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            একদল ছাত্র সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>&quot;যে বেশি লম্বা, সে সামনে যাবে!&quot;</em><br />
            তাই পাশাপাশি থাকা দুইজন নিজেদের উচ্চতা তুলনা করে ছোটটি পেছনে চলে যায়।<br />
            এভাবে প্রতিবার সারির শেষ মানটি ঠিক জায়গায় পৌঁছে যায়।<br />
            ধীরে ধীরে পুরো সারিটি বড় থেকে ছোট ক্রমে সাজানো হয়।<br />
            এটাই Heap Sort।
          </p>
        </div>
      )}
    </div>
  );
}
