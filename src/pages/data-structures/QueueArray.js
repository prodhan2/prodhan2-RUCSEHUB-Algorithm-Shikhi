import React, { useState } from 'react';
import DSInput from '@/components/ds-input';
import { showToast } from '@/components/toast';
import { randomInt } from '@/common/utils';

const CAPACITY = 8;

export default function QueueArray(props) {
  const [queue, setQueue] = useState([]);

  const enqueue = async (num) => {
    if (queue.length >= CAPACITY) {
      showToast({ message: 'Queue is full.', variant: 'error' });
      return Promise.resolve();
    }
    setQueue((prev) => [...prev, num]);
    return Promise.resolve();
  };

  const dequeue = async () => {
    if (!queue.length) {
      showToast({ message: 'Queue is empty.', variant: 'error' });
      return Promise.resolve();
    }
    setQueue((prev) => prev.slice(1));
    return Promise.resolve();
  };

  const clear = () => setQueue([]);

  const randomFill = () => {
    setQueue(Array.from({ length: 5 }, () => randomInt()));
  };

  return (
    <div className="container py-3">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div className="flex-grow-1">
          <h1 className="mb-2">Queue Array Visualizer</h1>
          <p className="mb-3">
            দেখো কীভাবে First In, First Out (FIFO) নিয়মে queue কাজ করে।
            যে আগে ঢোকে, সে আগে বের হয়। সাধারণ queue-র simple array view এটা।
          </p>
          <DSInput
            {...props}
            buttons={[
              { text: 'Enqueue', onClick: enqueue, validate: true },
              { text: 'Dequeue', onClick: dequeue },
              { text: 'Clear', onClick: clear },
              { text: 'Random', onClick: randomFill },
            ]}
          />
        </div>

        <div className="card p-3 shadow-sm" style={{ minWidth: 240 }}>
          <h2 className="h6 mb-2">How to think about it</h2>
          <ul className="mb-0 ps-3 small">
            <li>Front = first inserted item</li>
            <li>Rear = newest item</li>
            <li>Dequeue removes from front</li>
            <li>Useful for scheduling and buffers</li>
          </ul>
        </div>
      </div>

      <div className="table-responsive">
        <div
          className="d-flex gap-3 justify-content-start align-items-end p-3 rounded-4"
          style={{
            minHeight: 220,
            border: '2px solid #dee2e6',
            background: 'linear-gradient(180deg, #fffaf5 0%, #fff1e6 100%)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
            overflowX: 'auto',
          }}
        >
          {queue.length ? (
            queue.map((value, index) => {
              const isFront = index === 0;
              const isRear = index === queue.length - 1;
              return (
                <div
                  key={`${value}-${index}`}
                  className="d-flex flex-column align-items-center"
                  style={{ minWidth: 82 }}
                >
                  <div className="small fw-semibold mb-2" style={{ color: '#6c757d' }}>
                    {isFront && isRear ? 'Front / Rear' : isFront ? 'Front' : isRear ? 'Rear' : ''}
                  </div>
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 72,
                      height: 72,
                      background: isFront ? '#198754' : '#ffffff',
                      color: isFront ? '#ffffff' : '#1f2937',
                      border: '1px solid #cbd5e1',
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    {value}
                  </div>
                  <div className="small mt-2 text-muted">#{index + 1}</div>
                </div>
              );
            })
          ) : (
            <div className="text-muted text-center w-100 my-auto">
              Queue is empty. Enqueue values to start the visualizer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
