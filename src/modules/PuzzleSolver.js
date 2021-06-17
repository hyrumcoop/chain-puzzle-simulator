import Heap from 'heap';

import ChainPuzzle from './ChainPuzzle';
import Heuristic from './Heuristic';
import OperationSequence from './OperationSequence';

function Node(position, parent, operation, priority, depth) {
  this.position = position;
  this.parent = parent;
  this.operation = operation;
  this.priority = priority;
  this.depth = depth;

  this.children = [];
}

const getPathOperations = node => {
  const operations = [];

  while (node.parent) {
    operations.unshift(node.operation);
    node = node.parent;
  }

  return operations;
}

const pruneQueueDepth = (queue, maxDepth) => {
  const newQueue = new Heap((a, b) => a.priority - b.priority);

  queue.toArray().forEach(node => {
    if (node.depth <= maxDepth) {
      newQueue.push(node);
    }
  });

  return newQueue;
}

const GeneratorDefaultOptions = {
  initialDepth: 100
}

const PuzzleSolver = {
  // returns OperationSequence
  solve(puzzle, maxDepth) {
    const root = new Node(puzzle.copy().normalize().encode(), null, -1, Heuristic.ContiguousGroups(puzzle), 0);
    
    const queue = new Heap((a, b) => a.priority - b.priority);
    queue.push(root);

    const seen = {};

    while (queue.size() > 0) {
      const cur = queue.pop();

      if (seen[cur.position]) {
        continue;
      }

      const puzzle = ChainPuzzle.decode(cur.position);

      if (puzzle.isSolved()) {
        return getPathOperations(cur);
      }

      if (cur.depth >= maxDepth) {
        continue;
      }

      for (let op = 0; op < 6; op++) {
        if (op != cur.operation && (op%3 == cur.operation%3)) {
          continue
        }

        const newPuzzle = puzzle.copy().transform(op).normalize();
        const newPosition = newPuzzle.encode();

        if (seen[newPosition]) {
          continue;
        }

        const newNode = new Node(newPosition, cur, op, Heuristic.ContiguousGroups(newPuzzle), cur.depth + 1);

        cur.children.push(newNode);
        queue.push(newNode);
      }

      seen[cur.position] = true;
    }

    return null;
  },

  // returns a stop function
  generateSolutions(puzzle, onSolution, options) {
    const opts = Object.assign({}, GeneratorDefaultOptions, options);
    let maxDepth = opts.initialDepth;

    let shouldStop = false;
    let bestSolution = null;

    const root = new Node(puzzle.copy().normalize().encode(), null, -1, Heuristic.ContiguousGroups(puzzle), 0);
    
    let queue = new Heap((a, b) => a.priority - b.priority);
    queue.push(root);

    const seen = {};

    const solveLoop = new Promise(res => {
      const processQueue = async () => {
        if (queue.empty() || shouldStop) return res();
  
        const cur = queue.pop();
  
        if (seen[cur.position]) {
          return setImmediate(processQueue);
        }
  
        const puzzle = ChainPuzzle.decode(cur.position);
  
        if (puzzle.isSolved()) {
          const solution = OperationSequence.reorder(getPathOperations(cur));

          onSolution(solution);
          bestSolution = solution;
  
          queue = pruneQueueDepth(queue, cur.depth - 1); // TODO: might not be necessary if the cost of this function is greater than checking if all current-depth nodes are solved
          maxDepth = cur.depth - 1;
  
          return setImmediate(processQueue);
        }
  
        if (cur.depth >= maxDepth) {
          return setImmediate(processQueue);
        }
  
        for (let op = 0; op < 6; op++) {
          if (op != cur.operation && (op%3 == cur.operation%3)) {
            continue;
          }
  
          const newPuzzle = puzzle.copy().transform(op).normalize();
          const newPosition = newPuzzle.encode();
  
          if (seen[newPosition]) {
            continue;
          }
  
          const newNode = new Node(newPosition, cur, op, Heuristic.ContiguousGroups(newPuzzle), cur.depth + 1);
  
          cur.children.push(newNode);
          queue.push(newNode);
        }
  
        seen[cur.position] = true;
  
        setImmediate(processQueue);
      }

      processQueue();
    });

    return async () => {
      shouldStop = true;
      await solveLoop;

      return bestSolution;
    };
  }
}

export default PuzzleSolver;