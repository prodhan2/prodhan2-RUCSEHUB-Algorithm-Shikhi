import React, { useRef, useState } from 'react';

function findOptimalVictim(memory, futureRefs, startIdx) {
  const nextUse = memory.map((page) => {
    const next = futureRefs.slice(startIdx).indexOf(page);
    return next === -1 ? Infinity : next;
  });
  const farthest = Math.max(...nextUse);
  return memory[nextUse.indexOf(farthest)];
}

function simulate(algorithm, frames, references) {
  const memory = [];
  const tableData = [];
  let hits = 0;
  let faults = 0;
  let pointer = 0;

  const addStep = (page, isHit, victim = '') => {
    tableData.push({
      page,
      frames: [...memory],
      status: isHit ? 'HIT' : 'MISS',
      victim,
    });
  };

  function updateLRU(p) {
    const idx = memory.indexOf(p);
    if (idx > -1) memory.splice(idx, 1);
    memory.push(p);
  }

  function setReferenceBit(p) {
    const idx = memory.indexOf(p);
    if (idx > -1) {
      memory.splice(idx, 1);
      memory.push(p);
    }
  }

  function clockReplacement() {
    const current = memory[pointer % frames];
    pointer++;
    return current;
  }

  for (let ri = 0; ri < references.length; ri++) {
    const page = references[ri];
    if (memory.includes(page)) {
      hits++;
      if (algorithm === 'lru') updateLRU(page);
      if (algorithm === 'clock') setReferenceBit(page);
      addStep(page, true);
      continue;
    }

    faults++;
    let victim = '';

    if (memory.length < frames) {
      memory.push(page);
    } else if (algorithm === 'fifo') {
      victim = memory.shift();
      memory.push(page);
    } else if (algorithm === 'lru') {
      victim = memory.shift();
      memory.push(page);
      updateLRU(page);
    } else if (algorithm === 'optimal') {
      victim = findOptimalVictim(memory, references, ri + 1);
      const idx = memory.indexOf(victim);
      memory[idx] = page;
    } else if (algorithm === 'clock') {
      victim = clockReplacement();
      const idx = memory.indexOf(victim);
      memory[idx] = page;
    }

    addStep(page, false, victim);
  }

  return { tableData, hits, faults };
}

export default function PageReplacement() {
  const [refString, setRefString] = useState('');
  const [numFrames, setNumFrames] = useState(3);
  const [algorithm, setAlgorithm] = useState('fifo');
  const [tableData, setTableData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const resultSectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const refStringParsed = refString
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter((n) => !Number.isNaN(n));

    if (refStringParsed.length === 0) {
      window.alert('Please enter a valid reference string.');
      return;
    }

    const frames = parseInt(String(numFrames), 10) || 3;
    const { tableData: data, hits, faults } = simulate(
      algorithm,
      frames,
      refStringParsed
    );

    setTableData(data);
    setSummary({
      totalRefs: refStringParsed.length,
      uniquePages: new Set(refStringParsed).size,
      frames,
      algorithm,
      hits,
      faults,
    });
    setShowResults(true);
    requestAnimationFrame(() => {
      resultSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleClear = () => {
    setRefString('');
    setNumFrames(3);
    setAlgorithm('fifo');
    setTableData(null);
    setSummary(null);
    setShowResults(false);
  };

  const frameCols =
    tableData && tableData.length > 0
      ? Math.max(3, ...tableData.map((s) => s.frames.length))
      : 3;

  return (
    <div className="container py-3">
      <h1 className="mb-3">OS Memory Management Simulator - Page Replacement Visualizer</h1>
      <p className="mb-4">
        Learn virtual memory behavior by simulating FIFO, LRU, Optimal, and Clock
        page replacement algorithms with step-by-step frame transitions, victim
        tracking, and hit-miss analytics.
      </p>

      <form id="simulator-form" onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="ref-string" className="form-label">
              Reference string (space-separated integers)
            </label>
            <input
              id="ref-string"
              type="text"
              className="form-control"
              value={refString}
              onChange={(e) => setRefString(e.target.value)}
              placeholder="e.g. 7 0 1 2 0 3 0 4 2 3 0 3"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="num-frames" className="form-label">
              Number of frames
            </label>
            <input
              id="num-frames"
              type="number"
              min={1}
              max={10}
              className="form-control"
              value={numFrames}
              onChange={(e) => setNumFrames(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="Algorithm" className="form-label">
              Algorithm
            </label>
            <select
              id="Algorithm"
              className="form-select"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="fifo">FIFO</option>
              <option value="lru">LRU</option>
              <option value="optimal">Optimal</option>
              <option value="clock">Clock</option>
            </select>
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Run simulation
          </button>
          <button
            type="button"
            id="clear-btn"
            className="btn btn-outline-secondary"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>

      <div
        id="result-container"
        ref={resultSectionRef}
        className={showResults && tableData ? '' : 'visually-hidden'}
      >
        <div id="result" className="mb-4">
          {tableData && tableData.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered table-hover text-center align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Victim</th>
                    {Array.from({ length: frameCols }, (_, i) => (
                      <th key={i}>Frame {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((step, idx) => {
                    const statusClass =
                      step.status === 'HIT' ? 'hit' : 'miss';
                    return (
                      <tr key={idx}>
                        <td>
                          <strong>{step.page}</strong>
                        </td>
                        <td>
                          <span
                            className={`badge ${statusClass} px-3 py-2`}
                          >
                            {step.status}
                          </span>
                        </td>
                        <td>{step.victim !== '' ? step.victim : '-'}</td>
                        {Array.from({ length: frameCols }, (__, fi) => {
                          if (fi < step.frames.length) {
                            const framePage = step.frames[fi];
                            const isNew =
                              summary?.algorithm !== 'optimal' &&
                              step.page === framePage &&
                              step.status === 'MISS';
                            return (
                              <td
                                key={fi}
                                className={
                                  isNew ? 'table-warning fw-bold' : ''
                                }
                              >
                                {framePage}
                              </td>
                            );
                          }
                          return (
                            <td key={fi}>-</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div
        id="summary"
        className={showResults && summary ? 'card p-3' : 'visually-hidden'}
      >
        {summary && (
          <>
            <h2 className="h5 mb-3">Summary</h2>
            <p>
              References: <span id="ref">{summary.totalRefs}</span> — Unique
              pages: <span id="pages">{summary.uniquePages}</span> — Frames:{' '}
              <span id="frames">{summary.frames}</span> — Algorithm:{' '}
              <span id="algorithm">{summary.algorithm.toUpperCase()}</span>
            </p>
            <p>
              Hit rate:{' '}
              <span id="hit_rate">
                {((summary.hits / summary.totalRefs) * 100).toFixed(1)}%
              </span>{' '}
              — Miss rate:{' '}
              <span id="miss_rate">
                {((summary.faults / summary.totalRefs) * 100).toFixed(1)}%
              </span>
            </p>
            <div className="progress mb-2" style={{ height: 8 }}>
              <div
                id="hit-bar"
                className="progress-bar bg-success"
                style={{
                  width: `${(summary.hits / summary.totalRefs) * 100}%`,
                }}
              />
            </div>
            <div className="progress" style={{ height: 8 }}>
              <div
                id="miss-bar"
                className="progress-bar bg-danger"
                style={{
                  width: `${(summary.faults / summary.totalRefs) * 100}%`,
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
