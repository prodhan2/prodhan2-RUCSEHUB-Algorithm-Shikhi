import React, { useState } from 'react';
import DrawGraph from '@/components/draw-graph';
import $ from 'jquery';
import Graph, { Path } from '@/common/graph';
import Timer from '@/common/timer';
import { createGrid, getCostMatrix, hasValue, spanEdge } from '@/common/utils';
import { Colors } from '@/common/constants';
import Link from 'next/link';

export default function Dijkstra(props) {
    const [showStory, setShowStory] = useState(false);
    const [isBangla, setIsBangla] = useState(true);

    return (
        <div className="d-flex">
            <div style={{ width: showStory ? '65%' : '100%' }}>
                <div className="d-flex justify-content-between mb-3">
                    <h3>Dijkstra&apos;s Algorithm</h3>

                    <button
                        onClick={() => setIsBangla(!isBangla)}
                        className="btn btn-sm btn-primary"
                    >
                        {isBangla ? 'Switch to English' : 'বাংলায় দেখুন'}
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
                            <strong>Dijkstra&apos;s Algorithm</strong> source node থেকে
                            সব node-এ shortest distance বের করে, যদি edge weight
                            negative না হয়। এটি{' '}
                            <Link href="/data-structures/BinaryHeap">priority queue</Link>{' '}
                            ব্যবহার করে সবচেয়ে ছোট distance-এর node আগে process করে।
                            Navigation, map routing এবং network latency optimization-এ
                            এই algorithm খুব কার্যকর।
                        </>
                    ) : (
                        <>
                            <strong>Dijkstra&apos;s Algorithm</strong> finds the shortest
                            path from a source node to all other nodes in a graph
                            with non-negative weights. It uses a{' '}
                            <Link href="/data-structures/BinaryHeap">priority queue</Link>{' '}
                            to process the currently closest node first. It is
                            widely used in map routing and network optimization.
                        </>
                    )}
                </p>

                <DrawGraph
                    {...props}
                    onStart={start}
                    weighted={true}
                    onClear={() => {
                        $('#vert').html('');
                        $('#dist').html('');
                    }}
                />
                <div id="vert" className="d-flex numGrid alphaGrid" />
                <div id="dist" className="d-flex numGrid alphaGrid" />
            </div>

            {showStory && (
                <div
                    style={{
                        width: '35%',
                        padding: '20px',
                        borderLeft: '2px solid #ddd',
                        background: '#fafafa',
                        overflowY: 'auto',
                    }}
                >
                    <button
                        className="btn btn-danger btn-sm mb-3"
                        onClick={() => setShowStory(false)}
                    >
                        Close ❌
                    </button>

                    <h4>📘 Dijkstra Story (বাংলা)</h4>

                    <img
                        src="https://i.postimg.cc/xdqcd9rT/bubble.png"
                        alt="Dijkstra Story"
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
                    />

                    <p style={{ lineHeight: '1.8' }}>
                        ভাবো তুমি একটি শহরে আছো, আর বিভিন্ন রাস্তার ভাড়া আলাদা।<br />
                        তোমার লক্ষ্য: তোমার জায়গা থেকে সব জায়গায় সবচেয়ে কম খরচে পৌঁছানো।<br />
                        তুমি সবসময় সেই রাস্তাটাই আগে নাও যার মোট খরচ এখন পর্যন্ত সবচেয়ে কম।
                    </p>

                    <p style={{ lineHeight: '1.8' }}>
                        Dijkstra ঠিক এভাবেই কাজ করে:<br />
                        distance table update করে, better route পেলে আগেরটা replace করে,<br />
                        এবং একে একে shortest route স্থায়ী (final) করে দেয়।
                    </p>

                    <p>
                        সহজে মনে রাখো: <strong>Dijkstra = Cheapest Next Step First</strong>
                    </p>
                </div>
            )}
        </div>
    );
}

var n, w, cells;
var d, v, queue, prev;
var r, delay = 1000;

function start(src) {
    $('.cost').each(function () {
        this.setAttribute('value', this.value);
        this.setAttribute('readonly', true);
    });
    n = Graph.totalPoints();
    w = getCostMatrix();
    v = [src];
    d = [];
    createGrid(n, '#vert');
    createGrid(n, '#dist');
    cells = document.querySelectorAll('.cell');
    cells[src + n].textContent = 0;
    d[src] = 0;
    for (let i = 0; i < n; i++) {
        cells[i].style.border = '2px solid';
        cells[i + n].style.border = '2px solid';
        cells[i].textContent = String.fromCharCode(65 + i);
        cells[i + n].style.transition = 'opacity 0.5s';
        if (i !== src) {
            d[i] = Infinity;
            cells[i + n].innerHTML = '&infin;';
        }
    }
    queue = [src];
    prev = [];
    Timer.timeout(() => {
        $('.vrtx').eq(src).attr('stroke', Colors.visited);
        $('.vrtx').eq(src).attr('fill', Colors.visited);
        cells[src].style.backgroundColor = Colors.visited;
        Timer.timeout(dijkstra, delay, src);
    }, delay);
    return new Promise((res) => (r = res));
}

function dijkstra(i) {
    w[i] = w[i] || [];
    let flag = 1;
    for (let j = 0; j < n; j++) {
        if (v.indexOf(j) === -1) {
            let ei = Graph.edgeIndex(i, j);
            if (!hasValue(ei)) continue;
            if (d[i] + w[i][j] < d[j]) {
                d[j] = d[i] + w[i][j];
                Path('.edge').eq(ei).attr('stroke', Colors.enqueue);
                $('.vrtx').eq(j).attr('stroke', Colors.enqueue);
                $('.vrtx').eq(j).attr('fill', Colors.enqueue);
                cells[j].style.backgroundColor = Colors.enqueue;
                Timer.sleep(500).then(() => {
                    cells[j + n].style.opacity = 0;
                });
                Timer.sleep(delay).then(() => {
                    cells[j + n].textContent = d[j];
                    cells[j + n].style.opacity = 1;
                });
                prev[j] = i;
                flag = 2;
            }
        }
    }
    for (let j = 0; j < n; j++) {
        queue[j] = v.indexOf(j) === -1 ? d[j] : Infinity;
    }
    Timer.timeout(extractMin, delay * flag);
}

function extractMin() {
    let min = queue.reduce((a, b) => (b < a ? b : a), Infinity);
    if (min === Infinity) return;
    let j = queue.indexOf(min);
    let i = prev[j];
    v.push(j);
    spanEdge(i, j).then(() => {
        $('.vrtx').eq(j).attr('fill', Colors.visited);
        cells[j].style.backgroundColor = Colors.visited;
        if (v.length < n) {
            Timer.timeout(dijkstra, delay, j);
        } else r();
    });
}
