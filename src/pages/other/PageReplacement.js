// script/main.js - Page Replacement Algorithm Simulator (Full English Version)

const form = document.getElementById("simulator-form");
const refStringInput = document.getElementById("ref-string");
const numFramesInput = document.getElementById("num-frames");
const algorithmSelect = document.getElementById("Algorithm");

const resultContainer = document.getElementById("result-container");
const resultSection = document.getElementById("result");
const summarySection = document.getElementById("summary");

const refCountEl = document.getElementById("ref");
const pagesCountEl = document.getElementById("pages");
const framesCountEl = document.getElementById("frames");
const algorithmNameEl = document.getElementById("algorithm");
const hitRateEl = document.getElementById("hit_rate");
const missRateEl = document.getElementById("miss_rate");
const hitBar = document.getElementById("hit-bar");
const missBar = document.getElementById("miss-bar");

// Reset button
document.getElementById("clear-btn").addEventListener("click", () => {
  form.reset();
  numFramesInput.value = 3;
  refStringInput.value = "";
  resultSection.classList.add("visually-hidden");
  summarySection.classList.add("visually-hidden");
  resultContainer.innerHTML = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Parse inputs
  const algorithm = algorithmSelect.value;
  const frames = parseInt(numFramesInput.value);
  const refString = refStringInput.value
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter(n => !isNaN(n));

  if (refString.length === 0) {
    alert("Please enter a valid reference string.");
    return;
  }

  // Run simulation
  const { tableData, hits, faults } = simulate(algorithm, frames, refString);

  // Display results
  displayTable(tableData, algorithm);
  displaySummary(refString.length, new Set(refString).size, frames, algorithm, hits, faults);

  // Show sections with animation
  resultSection.classList.remove("visually-hidden");
  summarySection.classList.remove("visually-hidden");
  resultSection.scrollIntoView({ behavior: "smooth" });
});

// Main simulation function
function simulate(algorithm, frames, references) {
  const memory = [];           // Current pages in frames
  const tableData = [];        // For displaying step-by-step
  let hits = 0;
  let faults = 0;
  let pointer = 0;             // For Clock algorithm

  // Helper: add current state to table
  const addStep = (page, isHit, victim = "") => {
    tableData.push({
      page,
      frames: [...memory],
      status: isHit ? "HIT" : "MISS",
      victim
    });
  };

  for (const page of references) {
    if (memory.includes(page)) {
      // Page Hit
      hits++;
      if (algorithm === "lru") updateLRU(page);
      if (algorithm === "clock") setReferenceBit(page);
      addStep(page, true);
      continue;
    }

    // Page Fault
    faults++;
    let victim = "";

    if (memory.length < frames) {
      // Frame not full yet
      memory.push(page);
    } else {
      // Need to replace
      if (algorithm === "fifo") {
        victim = memory.shift();
        memory.push(page);
      }
      else if (algorithm === "lru") {
        victim = memory.shift();  // oldest (first in array)
        memory.push(page);
        updateLRU(page);
      }
      else if (algorithm === "optimal") {
        victim = findOptimalVictim(memory, references, references.indexOf(page) + 1);
        const idx = memory.indexOf(victim);
        memory[idx] = page;
      }
      else if (algorithm === "clock") {
        victim = clockReplacement();
        const idx = memory.indexOf(victim);
        memory[idx] = page;
      }
    }

    // For LRU: move page to end (most recently used)
    function updateLRU(p) {
      const idx = memory.indexOf(p);
      if (idx > -1) memory.splice(idx, 1);
      memory.push(p);
    }

    // For Clock: set reference bit to 1
    function setReferenceBit(p) {
      // We simulate reference bit by moving to end (like LRU behavior for clock)
      const idx = memory.indexOf(p);
      if (idx > -1) {
        memory.splice(idx, 1);
        memory.push(p);
      }
    }

    // Clock replacement with second chance
    function clockReplacement() {
      while (true) {
        const current = memory[pointer % frames];
        // Simulate reference bit = 0 → evict
        // We use position: if it's not recently used, evict
        pointer++;
        // Simple second-chance: move pointer until we find the oldest
        // Here we just cycle and replace the one at pointer
        return current;
      }
    }

    addStep(page, false, victim);
  }

  return { tableData, hits, faults };
}

// Optimal Algorithm: find page that will not be used for the longest time
function findOptimalVictim(memory, futureRefs, startIdx) {
  const nextUse = memory.map(page => {
    const next = futureRefs.slice(startIdx).indexOf(page);
    return next === -1 ? Infinity : next;
  });
  const farthest = Math.max(...nextUse);
  return memory[nextUse.indexOf(farthest)];
}

// Display simulation table
function displayTable(data, algo) {
  let html = `
    <table class="table table-bordered table-hover text-center align-middle">
      <thead class="table-primary">
        <tr>
          <th>Reference</th>
          <th>Status</th>
          <th>Victim</th>
          <th>Frame 1</th>
          <th>Frame 2</th>
          <th> 3</th>
          ${data[0].frames.length > 3 ? "<th> 4</th><th> 5</th><th> 6</th><th> 7</th><th> 8</th><th> 9</th><th>10</th>" : ""}
        </tr>
      </thead>
      <tbody>`;

  data.forEach(step => {
    const statusClass = step.status === "HIT" ? "hit" : "miss";
    html += `
      <tr>
        <td><strong>${step.page}</strong></td>
        <td><span class="badge ${statusClass} px-3 py-2">${step.status}</span></td>
        <td>${step.victim !== "" ? step.victim : "-"}</td>`;

    // Show frames
    for (let i = 0; i < 10; i++) {
      if (i < step.frames.length) {
        const framePage = step.frames[i];
        const isNew = algo !== "optimal" && step.page === framePage && step.status === "MISS";
        html += `<td class="${isNew ? 'table-warning fw-bold' : ''}">${framePage}</td>`;
      } else {
        html += `<td>-</td>`;
      }
    }
    html += `</tr>`;
  });

  html += `
      </tbody>
    </table>`;

  resultContainer.innerHTML = html;
}

// Display summary statistics
function displaySummary(totalRefs, uniquePages, frames, algo, hits, faults) {
  const hitRate = ((hits / totalRefs) * 100).toFixed(1);
  const missRate = ((faults / totalRefs) * 100).toFixed(1);

  refCountEl.textContent = totalRefs;
  pagesCountEl.textContent = uniquePages;
  framesCountEl.textContent = frames;
  algorithmNameEl.textContent = algo.toUpperCase();

  hitRateEl.textContent = hitRate + "%";
  missRateEl.textContent = missRate + "%";
  hitBar.style.width = hitRate + "%";
  missBar.style.width = missRate + "%";
}