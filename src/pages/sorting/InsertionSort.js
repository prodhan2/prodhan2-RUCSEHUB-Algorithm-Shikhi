import React, { useEffect, useState } from "react";
import useAnimator from "@/hooks/useAnimator";
import useAlgorithm from "@/hooks/useAlgorithm";
import { InputNumbers, Numbox } from "@/components/numbers";
import { Colors } from "@/common/constants";
import { sleep, sound } from "@/common/utils";

var arr, delay = 800;

export default function InsertionSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);

  const [scope, { tx, ty, bgcolor }] = useAnimator();
  const [algorithm, setCurrentStep] = useAlgorithm(`
    for i = 1 to (n - 1):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = key
  `);

  if (!numbers.length) arr = undefined;

  const sortNumbers = async () => {
    await sleep(delay);
    bgcolor(`#box${0}`, Colors.sorted);
    for (let i = 1; i < arr.length; i++) {
      await sleep(delay);
      setCurrentStep("1,2");
      sound("pop");
      await ty(`#box${i}`, -50, 0.5);
      setCurrentStep("3");
      await sleep(delay);

      let num = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > num) {
        arr[j + 1] = arr[j];
        setCurrentStep("3,4,5");
        await tx(`#box${j}`, 60, 0.5);
        j--;
      }

      sound("swap");
      if (j < i - 1) {
        arr[j + 1] = num;
        let k = i - (j + 1);
        await tx(`#box${i}`, -k * 60, k * 0.2);
      }

      setCurrentStep("6");
      await ty(`#box${i}`, 0, 0.5);
      await bgcolor(`#box${i}`, Colors.sorted);
      setNumbers(arr.slice());
    }
    setCurrentStep("");
  };

  useEffect(() => {
    numbers.forEach((_, i) => tx(`#box${i}`, 0, 0));
  }, [numbers]);

  const handleStart = (values) => {
    setNumbers(values);
    arr = values.slice();
    sortNumbers().catch(() => setCurrentStep(""));
  };

  const handleStop = () => setNumbers([]);

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Insertion Sort</h3>

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
              <strong>Insertion Sort</strong> হলো এমন একটি অ্যালগরিদম যা
              খেলোয়াড়দের কার্ড সাজানোর মতো কাজ করে। প্রতিটি নতুন
              উপাদানকে(sorted part) ঠিক স্থানে বসানো হয়। ছোট dataset বা
              আংশিকভাবে sorted list-এর জন্য এটি খুবই কার্যকর।
            </>
          ) : (
            <>
              <strong>Insertion Sort</strong> is like organizing playing cards.
              Each new element is inserted into its correct position in the
              sorted part. It&apos;s efficient for small datasets or partially
              sorted lists.
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
            overflowY: "auto",
          }}
        >
          <button
            className="btn btn-danger btn-sm mb-3"
            onClick={() => setShowStory(false)}
          >
            Close ❌
          </button>

          <h4>📘 Insertion Sort Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Insertion Sort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন একদল ছাত্র সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>&quot;যে বেশি লম্বা, সে সামনে যাবে!&quot;</em><br />
            একজন করে ছাত্র তার ঠিক জায়গায় চলে যায়, যাতে সারি সবসময় sorted থাকে।<br />
            ধীরে ধীরে পুরো সারিটি বড় থেকে ছোট ক্রমে সাজানো হয়।<br />
            এটাই Insertion Sort।
          </p>
        </div>
      )}
    </div>
  );
}
