import React, { useState } from "react";
import useAnimator from "@/hooks/useAnimator";
import useAlgorithm from "@/hooks/useAlgorithm";
import { InputNumbers, Numbox } from "@/components/numbers";
import { Colors } from "@/common/constants";
import { sleep, sound } from "@/common/utils";

var arr, delay = 1000;

export default function QuickSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);
  const [scope, { tx, ty, bgcolor }] = useAnimator();
  const [algorithm] = useAlgorithm(`
    function quickSort(start, end):
        if start < end:
            pivot = partition(start, end)
            quickSort(start, pivot - 1)
            quickSort(pivot + 1, end)
  `);

  if (!numbers.length) arr = undefined;

  const swap = async (a, b) => {
    const d = b - a;
    await Promise.all([ty(`#box${a}`, 50), ty(`#box${b}`, -50)]);
    sound("swap");
    await Promise.all([
      tx(`#box${a}`, d * 60, 0.2 * d),
      tx(`#box${b}`, -d * 60, 0.2 * d)
    ]);
    await Promise.all([ty(`#box${a}`, 0), ty(`#box${b}`, 0)]);
    arr.swap(a, b);
    setNumbers(arr.slice());
    await Promise.all([tx(`#box${a}`, 0, 0), tx(`#box${b}`, 0, 0)]);
  };

  const divide = async (start, end) => {
    bgcolor(`#box${end}`, Colors.sorted);
    await sleep(delay);
    let i = start, j = end - 1;
    bgcolor(`#box${i}`, Colors.compare);
    bgcolor(`#box${j}`, Colors.compare);
    await sleep(delay);

    while (i < j) {
      if (arr[i] <= arr[end]) {
        i++;
        bgcolor(`#box${i - 1}`, Colors.white);
        bgcolor(`#box${i}`, Colors.compare);
      } else if (arr[j] > arr[end]) {
        j--;
        bgcolor(`#box${j + 1}`, Colors.white);
        bgcolor(`#box${j}`, Colors.compare);
      } else {
        await swap(i, j);
      }
      await sleep(delay);
    }

    if (i < end && arr[i] > arr[end]) {
      bgcolor(`#box${i}`, Colors.sorted);
      await sleep(500);
      await swap(i, end);
      await sleep(500);
      bgcolor(`#box${end}`, Colors.white);
    } else {
      bgcolor(`#box${i}`, Colors.white);
      i = end;
    }
    return i;
  };

  const quickSort = async (start, end) => {
    if (start >= end) {
      bgcolor(`#box${start}`, Colors.sorted);
      return;
    }
    const pivot = await divide(start, end);
    await sleep(delay);
    await quickSort(start, pivot - 1);
    await sleep(delay);
    await quickSort(pivot + 1, end);
  };

  const handleStart = (values) => {
    if (!values || values.length === 0) {
      values = [34, 7, 23, 32, 5, 62]; // Example input
    }
    setNumbers(values);
    arr = values.slice();
    sleep(delay).then(() => {
      quickSort(0, arr.length - 1).catch(() => {});
    });
  };

  const handleStop = () => setNumbers([]);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Quick Sort</h3>

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
              <strong>Quick Sort</strong> হলো একটি দ্রুত sorting algorithm। এটি
              একটি <strong>pivot</strong> নির্বাচন করে, তারপর বাকি elements
              দুই ভাগে ভাগ করে: pivot এর চেয়ে ছোট এবং বড়। Recursive ভাবে
              এই process চালিয়ে পুরো তালিকা sorted হয়।
            </>
          ) : (
            <>
              <strong>Quick Sort</strong> is a fast sorting algorithm. It picks a{" "}
              <strong>pivot</strong>, partitions elements into smaller and
              larger groups, and recursively sorts them until fully sorted.
            </>
          )}
        </p>

        {algorithm}
        <InputNumbers onStart={handleStart} onStop={handleStop} />

        <div className="sorting d-flex pt-5" ref={scope}>
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
            overflowY: "auto"
          }}
        >
          <button
            className="btn btn-danger btn-sm mb-3"
            onClick={() => setShowStory(false)}
          >
            Close ❌
          </button>

          <h4>📘 Quick Sort Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Quick Sort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন ছাত্রদের একটি দল সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>&quot;যে মান ছোট, সে pivot অনুযায়ী ঠিক জায়গায় যাবে!&quot;</em><br />
            প্রতিটি সংখ্যা তার pivot অনুযায়ী ভাগ হয়ে ঠিক জায়গায় চলে যায়।<br />
            ধীরে ধীরে পুরো সারি sorted হয়ে যায়।<br />
            এটাই Quick Sort।
          </p>

          <p>
            উদাহরণ হিসেবে যদি [34, 7, 23, 32, 5, 62] ইনপুট হয়, Quick Sort
            ধাপে ধাপে pivot নির্বাচন করে, এবং শেষ পর্যন্ত sorted তালিকা হবে
            [5, 7, 23, 32, 34, 62]।
          </p>
        </div>
      )}
    </div>
  );
}
