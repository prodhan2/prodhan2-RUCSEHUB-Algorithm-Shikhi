import React, { useState } from 'react';
import DSInput from '@/components/ds-input';
import { showToast } from '@/components/toast';
import { randomInt } from '@/common/utils';

export default function LinkedList(props) {
  const [list, setList] = useState([]);

  const insertFront = async (num) => {
    setList((prev) => [num, ...prev]);
    return Promise.resolve();
  };

  const insertEnd = async (num) => {
    setList((prev) => [...prev, num]);
    return Promise.resolve();
  };

  const deleteFront = async () => {
    if (!list.length) {
      showToast({ message: 'Linked list is empty.', variant: 'error' });
      return Promise.resolve();
    }
    setList((prev) => prev.slice(1));
    return Promise.resolve();
  };

  const deleteValue = async (num) => {
    if (!list.includes(num)) {
      showToast({ message: 'Value not found in linked list.', variant: 'error' });
      return Promise.resolve();
    }
    setList((prev) => {
      const index = prev.indexOf(num);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
    return Promise.resolve();
  };

  const clear = () => setList([]);

  const randomFill = () => {
    setList(Array.from({ length: 4 }, () => randomInt()));
  };

  return (
    <div className="container py-3">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div className="flex-grow-1">
          <h1 className="mb-2">Linked List Visualizer</h1>
          <p className="mb-3">
            linked list-এ প্রতিটি node-এর সাথে next pointer থাকে। node-গুলো array-এর মতো
            contiguous জায়গায় থাকে না, বরং pointer দিয়ে যুক্ত হয়।
          </p>
          <DSInput
            {...props}
            buttons={[
              { text: 'Insert Front', onClick: insertFront, validate: true },
              { text: 'Insert End', onClick: insertEnd, validate: true },
              { text: 'Delete Front', onClick: deleteFront },
              { text: 'Delete Value', onClick: deleteValue, validate: true },
              { text: 'Clear', onClick: clear },
              { text: 'Random', onClick: randomFill },
            ]}
          />
        </div>

        <div className="card p-3 shadow-sm" style={{ minWidth: 250 }}>
          <h2 className="h6 mb-2">How to think about it</h2>
          <ul className="mb-0 ps-3 small">
            <li>Each node stores data + next link</li>
            <li>Insert/delete may happen at front or end</li>
            <li>Easy to grow dynamically</li>
            <li>Useful for stacks, queues, and memory chains</li>
          </ul>
        </div>
      </div>

      <div
        className="rounded-4 p-3"
        style={{
          minHeight: 220,
          border: '2px solid #dee2e6',
          background: 'linear-gradient(180deg, #f8fff8 0%, #eefdf0 100%)',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          overflowX: 'auto',
        }}
      >
        <div className="d-flex align-items-center flex-wrap gap-2">
          {list.length ? (
            list.map((value, index) => (
              <React.Fragment key={`${value}-${index}`}>
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 86,
                      height: 68,
                      background: index === 0 ? '#0d6efd' : '#ffffff',
                      color: index === 0 ? '#ffffff' : '#1f2937',
                      border: '1px solid #cbd5e1',
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    {value}
                  </div>
                  <div className="small mt-2 text-muted">Node {index + 1}</div>
                </div>
                {index < list.length - 1 && (
                  <div
                    className="d-flex align-items-center justify-content-center fw-bold"
                    style={{ minWidth: 36, fontSize: 22, color: '#6b7280' }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="text-muted text-center w-100 py-5">
              Linked list is empty. Insert values to create nodes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
