import React, { useEffect, useMemo, useState } from 'react';
import { showToast } from '@/components/toast';

const GRAY = ['00', '01', '11', '10'];
const SAMPLE = {
  2: { minterms: '1 2 3', dontCares: '0' },
  3: { minterms: '1 3 5 7', dontCares: '0 2' },
  4: { minterms: '0 1 2 5 6 7 8 9 10 14', dontCares: '3 4 12 13 15' },
};

function parseTerms(value, maxTerm) {
  const terms = value
    .trim()
    .split(/[\s,]+/)
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item) && item >= 0 && item <= maxTerm);

  return [...new Set(terms)].sort((a, b) => a - b);
}

function binaryPad(number, width) {
  return number.toString(2).padStart(width, '0');
}

function getCellIndex(variableCount, minterm) {
  const bits = binaryPad(minterm, variableCount);
  if (variableCount === 2) {
    const row = Number(bits[0]);
    const col = Number(bits[1]);
    return { row, col };
  }

  if (variableCount === 3) {
    const row = Number(bits[0]);
    const col = GRAY.indexOf(bits.slice(1));
    return { row, col };
  }

  const row = GRAY.indexOf(bits.slice(0, 2));
  const col = GRAY.indexOf(bits.slice(2));
  return { row, col };
}

function buildGrid(variableCount, minterms, dontCares) {
  const rowCount = variableCount === 2 ? 2 : 1 << (variableCount - 2);
  const colCount = variableCount === 2 ? 2 : 1 << Math.min(2, variableCount - 1);
  const grid = Array.from({ length: rowCount }, () => Array.from({ length: colCount }, () => '0'));

  minterms.forEach((minterm) => {
    const { row, col } = getCellIndex(variableCount, minterm);
    grid[row][col] = '1';
  });

  dontCares.forEach((minterm) => {
    const { row, col } = getCellIndex(variableCount, minterm);
    if (grid[row][col] !== '1') {
      grid[row][col] = 'X';
    }
  });

  return grid;
}

function getRowLabels(variableCount) {
  if (variableCount === 2) return ['0', '1'];
  if (variableCount === 3) return ['0', '1'];
  return GRAY;
}

function getColumnLabels(variableCount) {
  if (variableCount === 2) return ['0', '1'];
  if (variableCount === 3) return GRAY;
  return GRAY;
}

export default function KMap(props) {
  const [variableCount, setVariableCount] = useState(4);
  const [mintermText, setMintermText] = useState(SAMPLE[4].minterms);
  const [dontCareText, setDontCareText] = useState(SAMPLE[4].dontCares);
  const [cells, setCells] = useState([]);
  const [activeCell, setActiveCell] = useState(null);
  const [running, setRunning] = useState(false);
  const [summary, setSummary] = useState(null);
  const maxTerm = useMemo(() => (1 << variableCount) - 1, [variableCount]);

  const grid = useMemo(() => {
    const minterms = parseTerms(mintermText, maxTerm);
    const dontCares = parseTerms(dontCareText, maxTerm);
    return buildGrid(variableCount, minterms, dontCares);
  }, [variableCount, mintermText, dontCareText, maxTerm]);

  const rowLabels = useMemo(() => getRowLabels(variableCount), [variableCount]);
  const columnLabels = useMemo(() => getColumnLabels(variableCount), [variableCount]);

  useEffect(() => {
    const minterms = parseTerms(mintermText, maxTerm);
    const dontCares = parseTerms(dontCareText, maxTerm);
    const nextCells = [];

    grid.forEach((row, r) => {
      row.forEach((state, c) => {
        const minterm = (() => {
          for (let i = 0; i <= maxTerm; i++) {
            const pos = getCellIndex(variableCount, i);
            if (pos.row === r && pos.col === c) return i;
          }
          return null;
        })();
        nextCells.push({ row: r, col: c, value: state, minterm });
      });
    });

    setCells(nextCells);
    setSummary({
      variables: variableCount,
      minterms,
      dontCares,
    });
    setActiveCell(null);
  }, [grid, variableCount, mintermText, dontCareText, maxTerm]);

  const animate = async () => {
    const minterms = parseTerms(mintermText, maxTerm);
    const dontCares = parseTerms(dontCareText, maxTerm);
    const allTerms = [...new Set([...minterms, ...dontCares])].sort((a, b) => a - b);

    if (!allTerms.length) {
      showToast({ message: 'কমপক্ষে একটি minterm বা dont care দিন।', variant: 'error' });
      return;
    }

    setRunning(true);
    for (const term of allTerms) {
      setActiveCell(term);
      await new Promise((resolve) => setTimeout(resolve, 520));
    }
    setActiveCell(null);
    setRunning(false);
  };

  const clear = () => {
    setMintermText('');
    setDontCareText('');
    setActiveCell(null);
    setSummary(null);
  };

  const loadSample = () => {
    const sample = SAMPLE[variableCount];
    setMintermText(sample.minterms);
    setDontCareText(sample.dontCares);
  };

  return (
    <div className="container py-3" {...props}>
      <div className="d-flex flex-wrap justify-content-between gap-3 align-items-start mb-3">
        <div className="flex-grow-1">
          <h1 className="mb-2">K-Map Visualizer</h1>
          <p className="mb-3">
            2, 3, এবং 4-variable Karnaugh Map এক জায়গায় দেখো।
            minterm এবং don&apos;t care cell-গুলো animate হয়ে ভরে যাবে,
            তাই K-map layout বুঝতে সুবিধা হবে।
          </p>

          <div className="d-flex flex-wrap gap-2 mb-3">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                type="button"
                className={`btn btn-sm ${variableCount === count ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setVariableCount(count)}
                disabled={running}
              >
                {count}-Variable
              </button>
            ))}
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Minterms</label>
              <input
                type="text"
                className="form-control"
                value={mintermText}
                onChange={(e) => setMintermText(e.target.value)}
                placeholder="e.g. 1 2 3 5"
                disabled={running}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Don&apos;t Cares</label>
              <input
                type="text"
                className="form-control"
                value={dontCareText}
                onChange={(e) => setDontCareText(e.target.value)}
                placeholder="e.g. 0 4 7"
                disabled={running}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <button className="btn btn-success" type="button" onClick={animate} disabled={running}>
              {running ? 'Animating...' : 'Run Animation'}
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={loadSample} disabled={running}>
              Load Sample
            </button>
            <button className="btn btn-outline-danger" type="button" onClick={clear} disabled={running}>
              Clear
            </button>
          </div>
        </div>

        <div className="card p-3 shadow-sm" style={{ minWidth: 260 }}>
          <h2 className="h6 mb-2">Animation meaning</h2>
          <ul className="mb-0 ps-3 small">
            <li>সবুজ = 1 (minterm)</li>
            <li>হলুদ = X (don&apos;t care)</li>
            <li>হালকা = 0</li>
            <li>Gray code order ব্যবহার করা হয়</li>
          </ul>
        </div>
      </div>

      <div
        className="rounded-4 p-3 mb-4"
        style={{
          border: '2px solid #dee2e6',
          background: 'linear-gradient(180deg, #f6fbff 0%, #eef7ff 100%)',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          overflowX: 'auto',
        }}
      >
        <div style={{ minWidth: variableCount === 4 ? 560 : 420 }}>
          <div className="d-flex align-items-center mb-2" style={{ paddingLeft: variableCount === 2 ? 72 : 110 }}>
            {columnLabels.map((label) => (
              <div key={label} className="text-center fw-bold" style={{ flex: 1, minWidth: 90 }}>
                {label}
              </div>
            ))}
          </div>

          {cells.length > 0 && rowLabels.map((rowLabel, rowIndex) => (
            <div key={rowLabel} className="d-flex align-items-center mb-2">
              <div className="fw-bold text-center" style={{ width: variableCount === 2 ? 72 : 110 }}>
                {rowLabel}
              </div>
              <div className="d-flex gap-2 flex-grow-1">
                {columnLabels.map((columnLabel, colIndex) => {
                  const cell = cells.find((item) => item.row === rowIndex && item.col === colIndex);
                  const isActive = activeCell !== null && cell?.minterm === activeCell;
                  const isOne = cell?.value === '1';
                  const isDontCare = cell?.value === 'X';

                  return (
                    <div
                      key={`${rowLabel}-${columnLabel}`}
                      className="rounded-3 d-flex flex-column align-items-center justify-content-center"
                      style={{
                        flex: 1,
                        minWidth: 88,
                        minHeight: 78,
                        border: isActive ? '3px solid #0d6efd' : '1px solid #cbd5e1',
                        background: isOne ? '#d1fae5' : isDontCare ? '#fef3c7' : '#ffffff',
                        color: '#1f2937',
                        boxShadow: isActive ? '0 0 0 4px rgba(13,110,253,0.12)' : 'none',
                        transition: 'all 0.25s ease',
                        fontWeight: 800,
                      }}
                    >
                      <div style={{ fontSize: 22 }}>{cell?.value}</div>
                      <div style={{ fontSize: 11, opacity: 0.75 }}>
                        m{cell?.minterm}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {summary && (
        <div className="card p-3 shadow-sm">
          <h2 className="h6 mb-2">Current setup</h2>
          <p className="mb-1">
            Variables: <strong>{summary.variables}</strong>
          </p>
          <p className="mb-1">
            Minterms: <strong>{summary.minterms.length ? summary.minterms.join(', ') : 'None'}</strong>
          </p>
          <p className="mb-0">
            Don&apos;t cares: <strong>{summary.dontCares.length ? summary.dontCares.join(', ') : 'None'}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
