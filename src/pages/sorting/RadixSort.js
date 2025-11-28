import React, { useEffect, useState } from "react";
import { sound } from "@/common/utils";
import Numbers from "@/components/numbers/input-numbers";
import Timer from "@/common/timer";
import useAnimator from "@/hooks/useAnimator";
import { Numbox } from "@/components/numbers";

const sleep = (t) => Timer.sleep(t);

var a, n;
var max, exp;
var out, b;
var delay = 500;

export default function RadixSort() {
  const [numbers, setNumbers] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [isBangla, setIsBangla] = useState(true);
  const [scope, { txy, tx, bgcolor, animate }] = useAnimator();
  const [nextExp, setNextExp] = useState(0);

  // --- enqueue digit into bucket
  const enqueue = async (i) => {
    let j = Math.floor(a[i] / exp) % 10;
    b[j].push(i);
    sound("swap");
    animate(`#box${i}`, { height: 30 });
    let dy = b[j].length * 36;
    await txy(`#box${i}`, j * 60, 240 - dy);
    await sleep(delay * 2);
  };

  // --- dequeue from bucket
  const dequeue = async (j) => {
    while (b[j].length) {
      let i = b[j].pop();
      out.push(a[i]);
      sound("swap");
      let k = n - out.length;
      animate(`#box${i}`, { height: 40 });
      await txy(`#box${i}`, k * 60, 0);
      await sleep(delay);
    }
  };

  // --- radix sort main
  const radixSort = async () => {
    await sleep(delay * 2);
    b = [];
    for (let j = 0; j < 10; j++) b[j] = [];
    for (let i = 0; i < n; i++) await enqueue(i);

    await sleep(delay);
    out = [];
    for (let j = 9; j >= 0; j--) await dequeue(j);

    setNextExp(0);
    await sleep(delay);
    for (let i = 0; i < n; i++) tx(`#box${i}`, i * 60, 0);

    a = out.reverse();
    setNumbers(a.slice());

    exp *= 10;
    if (Math.floor(max / exp) > 0) {
      await sleep(delay);
      setNextExp(exp);
      await radixSort();
    }
  };

  // --- start with user input or example
  const start = async (values) => {
    if (!values || values.length === 0) {
      // Example input for demo
      values = [170, 45, 75, 90, 802, 24, 2, 66];
    }
    setNumbers(values);
    a = values.slice();
    n = a.length;
    max = Math.max(...a);
    exp = 1;
    await sleep(delay * 2);
    setNextExp(1);
    radixSort().catch(() => {});
  };

  const stop = () => {
    setNumbers([]);
    setNextExp(0);
    Timer.clear();
  };

  useEffect(() => () => stop(), []);

  // --- highlight current digit
  const renderDigits = (num) => {
    let digits = [];
    let t = num;
    let j = 1;
    while (t !== 0) {
      let r = t % 10;
      if (j === nextExp) {
        digits.push(
          <span key={j} style={{ color: "#e91e63", fontWeight: 600 }}>
            {r}
          </span>
        );
      } else {
        digits.push(<span key={j}>{r}</span>);
      }
      t = Math.floor(t / 10);
      j *= 10;
    }
    return digits.reverse();
  };

  return (
    <div className="d-flex">
      <div style={{ width: showStory ? "65%" : "100%" }}>
        <div className="d-flex justify-content-between mb-3">
          <h3>Radix Sort</h3>

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
              <strong>Radix Sort</strong> হলো একটি digit-by-digit অ্যালগরিদম।
              এটি সংখ্যাগুলোকে rightmost থেকে leftmost পর্যন্ত সাজায়, এবং bucket
              অনুযায়ী আবার সংগ্রহ করে। প্রতিটি digit অনুযায়ী এই প্রক্রিয়া চলতে থাকে
              যতক্ষণ না পুরো তালিকা sorted হয়।
            </>
          ) : (
            <>
              <strong>Radix Sort</strong> organizes numbers digit by digit.
              Starts from least significant digit to most significant. Numbers
              are placed into buckets and collected back. Process repeats until
              sorted.
            </>
          )}
        </p>

        <Numbers onStart={start} onStop={stop} />

        <div className="radixSort" ref={scope}>
          <div className="d-flex position-relative" style={{ height: 300 }}>
            {numbers.map((num, i) => (
              <Numbox
                key={i}
                index={i}
                value={renderDigits(num)}
                animate={{ x: i * 60 }}
                style={styles.numbox()}
              />
            ))}
          </div>

          <div className="d-flex position-relative" style={{ height: 300 }}>
            {numbers.length > 0 &&
              Array.from({ length: 10 }, (_, i) => (
                <Numbox
                  key={i}
                  index={numbers.length + i}
                  value={i}
                  animate={{ x: i * 60, y: 240 }}
                  style={styles.bucket()}
                />
              ))}
          </div>
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

          <h4>📘 Radix Sort Story (বাংলা)</h4>

          <img
            src="https://i.postimg.cc/xdqcd9rT/bubble.png"
            alt="Radix Sort Story"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
          />

          <p style={{ lineHeight: "1.8" }}>
            ধরুন ছাত্রদের একটি দল সারিতে দাঁড়িয়ে আছে।<br />
            শিক্ষক বললেন: <em>&quot;প্রতিটি সংখ্যাকে তার digit অনুযায়ী সাজাও!&quot;</em><br />
            প্রথমে rightmost digit অনুযায়ী সাজানো হয়, তারপর leftmost পর্যন্ত ধাপে ধাপে চলে।<br />
            ধীরে ধীরে পুরো তালিকা sorted হয়।<br />
            এটাই Radix Sort।
          </p>

          <p>
            উদাহরণ হিসেবে যদি [170, 45, 75, 90, 802, 24, 2, 66] ইনপুট হয়,
            Radix Sort প্রথমে 1-এর digit অনুযায়ী সাজাবে, তারপর 10-এর, তারপর 100-এর,
            এবং শেষ পর্যন্ত পুরো তালিকা [2, 24, 45, 66, 75, 90, 170, 802] হবে।
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  numbox: () => ({
    position: "absolute",
    fontWeight: 600,
  }),
  bucket: () => ({
    position: "absolute",
    fontWeight: 600,
    fontSize: "1rem",
    background: "transparent",
    border: 0,
    borderTop: "2px solid grey",
    borderRadius: "8px",
  }),
};
