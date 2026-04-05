import React, { useState } from 'react';
import DSInput from '@/components/ds-input';
import { showToast } from '@/components/toast';
import { randomInt } from '@/common/utils';

const CAPACITY = 8;

export default function StackArray(props) {
  const [stack, setStack] = useState([]);

  const push = async (num) => {
    if (stack.length >= CAPACITY) {
      showToast({ message: 'Stack is full.', variant: 'error' });
      return Promise.resolve();
    }
    setStack((prev) => [...prev, num]);
    return Promise.resolve();
  };

  const pop = async () => {
    if (!stack.length) {
      showToast({ message: 'Stack is empty.', variant: 'error' });
      return Promise.resolve();
    }
    setStack((prev) => prev.slice(0, -1));
    return Promise.resolve();
  };

  const clear = () => setStack([]);

  const randomFill = () => {
    setStack(Array.from({ length: 4 }, () => randomInt()));
  };

  return (
    <div className="container py-3">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div className="flex-grow-1">
          <h1 className="mb-2">Stack Array Visualizer</h1>
          <p className="mb-3">
            দেখো কীভাবে Last In, First Out (LIFO) নিয়মে stack কাজ করে।
            নতুন item সবসময় উপরে ঢোকে, আর pop করলে উপরের item-ই আগে বের হয়।
          </p>
          <DSInput
            {...props}
            buttons={[
              { text: 'Push', onClick: push, validate: true },
              { text: 'Pop', onClick: pop },
              { text: 'Clear', onClick: clear },
              { text: 'Random', onClick: randomFill },
            ]}
          />
        </div>

        <div className="card p-3 shadow-sm" style={{ minWidth: 240 }}>
          <h2 className="h6 mb-2">How to think about it</h2>
          <ul className="mb-0 ps-3 small">
            <li>Push = add to top</li>
            <li>Pop = remove from top</li>
            <li>Peek = top element দেখা</li>
            <li>Useful for undo, recursion, parsing</li>
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div
          className="w-100"
          style={{
            maxWidth: 360,
            minHeight: 340,
            border: '2px solid #dee2e6',
            borderRadius: 18,
            padding: 16,
            background: 'linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)',
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: 10,
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          }}
        >
          {stack.length ? (
            stack.map((value, index) => {
              const isTop = index === stack.length - 1;
              return (
                <div
                  key={`${value}-${index}`}
                  className="d-flex align-items-center justify-content-between px-3 py-2 rounded-3"
                  style={{
                    background: isTop ? '#0d6efd' : '#ffffff',
                    color: isTop ? '#fff' : '#1f2937',
                    border: '1px solid #cbd5e1',
                    fontWeight: 700,
                  }}
                >
                  <span>{value}</span>
                  <span style={{ fontSize: 12, opacity: 0.85 }}>
                    {isTop ? 'TOP' : `#${stack.length - index}`}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-muted text-center my-auto">
              Stack is empty. Push values to start the visualizer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
