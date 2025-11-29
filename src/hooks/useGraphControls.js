import { useContext } from 'react';
import { showToast } from '@/components/toast';
import Graph, { Path } from '@/common/graph';
import $ from 'jquery';
import { drawGraph, switchGraph } from '@/helpers/drawGraph';
import { randomGraph } from '@/helpers/randomGraph';
import { clearGraph, createGraph } from '@/common/utils';
import { Colors } from '@/common/constants';
import AppContext from '@/common/context';
import Timer from '@/common/timer';

function useGraphControls(config = {}, props = {}) {
  const { isDirGraph, playStatus, setContext } = useContext(AppContext);
  const { source = 'A', weighted = false, directed = false } = config;

  // Validate before starting
  const validate = () => {
    const np = Graph.totalPoints();
    const maxChar = String.fromCharCode(64 + np);
    let message = '';

    if (np <= 1) message = 'Graph cannot be empty.';
    else if (source < 'A' || source > maxChar) message = 'Please enter a valid source.';
    else if (!Graph.isConnected()) message = 'Please draw connected graph.';

    if (message) {
      showToast({ message, variant: 'error' });
      return false;
    }

    return true;
  };

  // Play or resume the graph algorithm
  const handlePlay = async () => {
    try {
      const plane = $('#plane');
      const vertices = $('.vrtx');

      switch (playStatus) {
        case 0:
          if (!validate()) return;
          plane.off();
          setContext({ playStatus: 1 });
          await props.onStart(source.charCodeAt(0) - 65);
          setContext({ playStatus: -2 });
          break;

        case -1: // paused
          setContext({ playStatus: 1 });
          Timer.resume();
          break;

        case -2: // finished
          resetGraph(vertices);
          setContext({ playStatus: 1 });
          await Timer.sleep(1000);
          await props.onStart(source.charCodeAt(0) - 65);
          setContext({ playStatus: -2 });
          break;

        default: // running
          setContext({ playStatus: -1 });
          Timer.pause();
          break;
      }
    } catch (err) {
      console.error('Error in handlePlay:', err);
    }
  };

  // Clear the graph and redraw
  const handleClear = () => {
    props.onClear?.();
    clearGraph();
    drawGraph(config);
    setContext({ playStatus: 0 });
  };

  // Toggle directed graph
  const setDirected = () => {
    refresh();
    switchGraph();
    setContext({ isDirGraph: !isDirGraph });
  };

  // Refresh the graph with random generation
  const refresh = () => {
    props.onClear?.();
    clearGraph();

    // Generate random graph until no cycles
    let skeleton;
    do {
      Graph.initialize(randomGraph(5));
    } while (Graph.hasCycle());

    skeleton = Graph.skeleton();
    createGraph(skeleton, weighted);

    drawGraph(config);

    if (directed) switchGraph();
    setContext({ playStatus: 0 });
  };

  // Reset vertices colors and edges
  const resetGraph = (vertices) => {
    props.onClear?.();
    vertices.attr('stroke', Colors.stroke).attr('fill', Colors.vertex);
    Path('.edge').attr('stroke', Colors.stroke);
  };

  return { handlePlay, handleClear, refresh, setDirected };
}

export default useGraphControls;
