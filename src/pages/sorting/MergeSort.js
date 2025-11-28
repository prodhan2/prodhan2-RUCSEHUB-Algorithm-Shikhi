import React, { useEffect, useState } from "react";
import useAnimator from "@/hooks/useAnimator";
import useAlgorithm from "@/hooks/useAlgorithm";
import { InputNumbers, Numbox } from "@/components/numbers";
import { Colors } from "@/common/constants";
import { sleep, sound } from "@/common/utils";

var arr, delay = 500;

export default function MergeSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  const [scope, { tx, ty, txy, bgcolor }] = useAnimator();
  const [algorithm] = useAlgorithm(`
    function mergeSort(start, end):
        if start < end:
            mid = length(arr) / 2
            mergeSort(start, mid)
            mergeSort(mid + 1, end)
            merge(start, mid, end)
  `);

  if (!numbers.length) arr = undefined;

  const getMergeIndex = (p, q, mid, end) => {
    if (p <= mid && q <= end) return arr[p] <= arr[q] ? p : q;
    return p <= mid ? p : q;
  };

  const merge = async (start, mid, end, ypos) => {
    let p = start,
      q = mid + 1;
    let r = start,
      tmp = [];
    while (r <= end) {
      let s = getMergeIndex(p, q, mid, end);
      tmp.push(arr[s]);
      sound("swap");
      await txy(`#box${s}`, 60 * (r - s), ypos - 60, 0.5);
      await bgcolor(`#box${s}`, Colors.sorted);
      s === q ? q++ : p++;
      r++;
    }
    tmp.forEach((_, i) => (arr[start + i] = tmp[i]));
    setNumbers(arr.slice());
  };

  const split = (start, end, ypos) => {
    const promises = [];
    for (let i = start; i <= end; i++) promises.push(ty(`#box${i}`, ypos));
    return Promise.all(promises);
  };

  const mergeSort = async (start, end, ypos) => {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    await sleep(delay);
    sound("pop");
    await split(start, mid, ypos);
    await mergeSort(start, mid, ypos + 60);
    await sleep(delay);
    sound("pop");
    await split(mid + 1, end, ypos);
    await mergeSort(mid + 1, end, ypos + 60);
    await sleep(delay);
    await merge(start, mid, end, ypos);
    await sleep(delay);
  };

  useEffect(() => {
    numbers.forEach((_, i) => tx(`#box${i}`, 0, 0));
  }, [numbers]);

  const handleStart = (values) => {
    setNumbers(values);
    arr = values.slice();
    sleep(delay).then(() =>
      mergeSort(0, arr.length - 1, 60).catch(() => {})
    );
  };

  const handleStop = () => setNumbers([]);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Merge Sort</h3>

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
              <strong>Merge Sort</strong> হলো একটি divide-and-conquer অ্যালগরিদম। 
              এটি তালিকাকে recursively ছোট ছোট অংশে ভাগ করে এবং প্রতিটি অংশ sorted হলে
              merge করে পুরো তালিকাকে সাজায়। এটি বড় dataset-এর জন্য খুবই কার্যকর।
            </>
          ) : (
            <>
              <strong>Merge Sort</strong> is a divide-and-conquer algorithm.
              It recursively splits a list into smaller parts and merges them
              back in sorted order. Efficient for large datasets.
            </>
          )}
        </p>

        {algorithm}

        <InputNumbers onStart={handleStart} onStop={handleStop} />

        <div className="d-flex pt-4 mergeSort" ref={scope}>
          {numbers.map((num, i) => (
            <Numbox key={i} index={i} value={num} />
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

          <h4>📘 Merge Sort Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Merge Sort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন একদল ছাত্র সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>&quot;তালিকাকে ভাগ করে ছোট অংশে কাজ করুন!&quot;</em><br />
            তারপর প্রতিটি অংশের ছাত্র তাদের নিজ নিজ স্থানে চলে যায়।<br />
            ধীরে ধীরে পুরো সারিটি বড় থেকে ছোট ক্রমে সাজানো হয়।<br />
            এটাই Merge Sort।
          </p>
        </div>
      )}
    </div>
  );
}
