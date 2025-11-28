import React, { useState } from "react";
import useAnimator from "@/hooks/useAnimator";
import { InputNumbers, Numbox } from "@/components/numbers";
import { Colors } from "@/common/constants";
import { sleep, sound } from "@/common/utils";
import Link from "next/link";
import useAlgorithm from "@/hooks/useAlgorithm";

var arr, delay = 500;

export default function SelectionSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);
  const [scope, { tx, ty, bgcolor }] = useAnimator();
  const [algorithm, setCurrentStep] = useAlgorithm(`
    for i = 0 to (n - 1):
        min = i
        for j = i + 1 to (n):
            if arr[j] < arr[min]:
                min = j
        if min != i:
            swap(i, min)
  `);

  if (!numbers.length) arr = undefined;

  const pickNumber = async (i) => {
    await ty(`#box${i}`, -50, 0.5);
    await sleep(delay);
  };

  const swapNumbers = async (i, j) => {
    let k = j - i;
    await Promise.all([
      tx(`#box${i}`, k * 60, 0.15 * k),
      tx(`#box${j}`, -k * 60, 0.15 * k)
    ]);
    await Promise.all([ty(`#box${i}`, 0, 0.5), ty(`#box${j}`, 0, 0.5)]);
    arr.swap(i, j);
    setNumbers(arr.slice());
    await Promise.all([tx(`#box${i}`, 0, 0), tx(`#box${j}`, 0, 0)]);
  };

  const sortNumbers = async () => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      setCurrentStep("1");
      sound("pop");
      await pickNumber(i);
      let k = i;
      for (let j = i + 1; j < n; j++) {
        setCurrentStep("2,3");
        bgcolor(`#box${j - 1}`, Colors.white);
        bgcolor(`#box${j}`, Colors.compare);
        await sleep(delay);
        if (arr[j] < arr[k]) {
          setCurrentStep("4");
          ty(`#box${k}`, 0, 0.5);
          sound("pop");
          await pickNumber(j);
          k = j;
        }
      }
      bgcolor(`#box${n - 1}`, Colors.white);
      await sleep(delay);
      if (k > i) {
        setCurrentStep("6");
        await ty(`#box${i}`, 50, 0.5);
        sound("swap");
        await swapNumbers(i, k);
      } else {
        sound("swap");
        await ty(`#box${k}`, 0, 0.5);
      }
      bgcolor(`#box${i}`, Colors.sorted);
      await sleep(1000);
    }
    setCurrentStep("");
    bgcolor(`#box${n - 1}`, Colors.sorted);
  };

  const handleStart = (values) => {
    if (!values || values.length === 0) {
      values = [29, 10, 14, 37, 13]; // Example input
    }
    setNumbers(values);
    arr = values.slice();
    setTimeout(() => {
      sortNumbers().catch(() => setCurrentStep(""));
    }, 1000);
  };

  const handleStop = () => setNumbers([]);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Selection Sort</h3>

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
              <strong>Selection Sort</strong> হলো এমন একটি algorithm যা
              ছোট থেকে ছোট মান বেছে নিয়ে ঠিক জায়গায় বসায়। এটি <Link href="/sorting/BubbleSort">Bubble Sort</Link>
              এর থেকে কম swap করে কাজ করে। প্রতিটি ধাপে একটি
              number ঠিক অবস্থানে চলে যায়, ধীরে ধীরে পুরো তালিকা
              sorted হয়।
            </>
          ) : (
            <>
              <strong>Selection Sort</strong> is an algorithm that selects
              the smallest item from the unsorted section and places it at
              its correct position. It performs fewer swaps than{" "}
              <Link href="/sorting/BubbleSort">Bubble Sort</Link>. Step by
              step, the entire list becomes sorted.
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

          <h4>📘 Selection Sort Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Selection Sort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন ছাত্ররা সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>&quot;ছোট মান আগে যাবে!&quot;</em><br />
            প্রতিটি ধাপে সবচেয়ে ছোট মান বেছে নিয়ে তার সঠিক স্থানে বসানো হয়।<br />
            ধীরে ধীরে পুরো তালিকা sorted হয়ে যায়।<br />
            এটাই Selection Sort।
          </p>

          <p>
            উদাহরণ: [29, 10, 14, 37, 13] ইনপুট হলে, ধাপে ধাপে sorted হবে
            [10, 13, 14, 29, 37]।
          </p>
        </div>
      )}
    </div>
  );
}
