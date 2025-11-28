import React, { useState } from "react";
import useAnimator from "@/hooks/useAnimator";
import useAlgorithm from "@/hooks/useAlgorithm";
import { InputNumbers, Numbox } from "@/components/numbers";
import { Colors } from "@/common/constants";
import { sleep, sound } from "@/common/utils";

var arr, delay = 800;

export default function BubbleSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true); // Bangla default

  const [scope, { tx, bgcolor }] = useAnimator();
  const [algorithm, setCurrentStep] = useAlgorithm(`
    for i = 1 to (n - 1):
        swapped = false
        for j = 1 to (n - i):
            if arr[j] < arr[j + 1]:
                swap(j, j + 1)
                swapped = true
        if not swapped:
            break
    `);

  if (!numbers.length) arr = undefined;

  const swapNumbers = async (u, v) => {
    await Promise.all([tx(`#box${u}`, 60, 0.5), tx(`#box${v}`, -60, 0.5)]);
    arr.swap(u, v);
    setNumbers(arr.slice());
    await Promise.all([tx(`#box${u}`, 0, 0), tx(`#box${v}`, 0, 0)]);
  };

  const compare = async (u, v) => {
    bgcolor(`#box${u}`, Colors.compare);
    bgcolor(`#box${v}`, Colors.compare);
    if (u > 0) bgcolor(`#box${u - 1}`, Colors.white);
  };

  const bubbleSort = async () => {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      await sleep(delay);
      setCurrentStep("0,1");
      await sleep(delay);
      let swap = false;
      for (let j = 0; j < n - i; j++) {
        setCurrentStep("2,3");
        await compare(j, j + 1);
        await sleep(delay);
        if (arr[j] > arr[j + 1]) {
          swap = true;
          setCurrentStep("4,5");
          sound("swap");
          await swapNumbers(j, j + 1);
          await sleep(delay);
        }
      }
      let k = n - i;
      bgcolor(`#box${k - 1}`, Colors.white);
      bgcolor(`#box${k}`, Colors.sorted);
      if (!swap) {
        setCurrentStep("6,7");
        for (let j = 0; j < n - i; j++)
          bgcolor(`#box${j}`, Colors.sorted);
        i = n;
      }
    }
    bgcolor(`#box${0}`, Colors.sorted);
    setCurrentStep("");
  };

  const handleStart = (values) => {
    setNumbers(values);
    arr = values.slice();
    bubbleSort().catch(() => setCurrentStep(""));
  };

  const handleStop = () => setNumbers([]);

  return (
    <div className="d-flex">
      {/* ---------------- LEFT SIDE MAIN CONTENT ---------------- */}
      <div style={{ width: showStory ? "65%" : "100%" }}>

        <div className="d-flex justify-content-between mb-3">
          <h3>Bubble Sort</h3>

          {/* Language Toggle */}
          <button
            onClick={() => setIsBangla(!isBangla)}
            className="btn btn-sm btn-primary"
          >
            {isBangla ? "Switch to English" : "বাংলায় দেখুন"}
          </button>

          {/* Story Button */}
          <button
            onClick={() => setShowStory(true)}
            className="btn btn-sm btn-success ms-2"
          >
            Learn With Story 📘
          </button>
        </div>

        {/* Main Description */}
        <p>
          {isBangla ? (
            <>
              <strong>Bubble Sort</strong> একটি সহজ অ্যালগরিদম যেখানে পাশাপাশি
              থাকা দুটি সংখ্যাকে তুলনা করা হয় এবং বড় সংখ্যাটি সামনে পাঠানো হয়।  
              ধীরে ধীরে সব বড় সংখ্যা উপরে চলে আসে, ঠিক ফেনার বুদবুদের মতো!
            </>
          ) : (
            <>
              <strong>Bubble Sort</strong> compares adjacent numbers and swaps
              them if needed. Large numbers “bubble up” to the top, similar to
              air bubbles in water.
            </>
          )}
        </p>

        {algorithm}

        <InputNumbers onStart={handleStart} onStop={handleStop} />

        <div className="sorting d-flex pt-4" ref={scope}>
          {numbers.map((num, i) => (
            <Numbox key={i} index={i} value={num} />
          ))}
        </div>
      </div>

      {/* ---------------- RIGHT SIDE STORY PANEL ---------------- */}
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

          <h4>📘 Bubble Sort Story (বাংলা)</h4>

          {/* Story Image */}
          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Bubble Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          {/* Story Text */}
          <p style={{ lineHeight: "1.8" }}>
            একদল ছাত্র সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>"যে বেশি লম্বা, সে সামনে যাবে!"</em><br />
            তাই পাশাপাশি থাকা দুইজন নিজেদের উচ্চতা তুলনা করে ছোটটি পেছনে চলে যায়।<br />
            এভাবে প্রতিবার সারির শেষ মানটি ঠিক জায়গায় পৌঁছে যায়।<br />
            ধীরে ধীরে পুরো সারিটি বড় থেকে ছোট ক্রমে সাজানো হয়।<br />
            এটাই Bubble Sort।
          </p>
        </div>
      )}
    </div>
  );
}
