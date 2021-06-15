import Heap from 'heap';

import ChainPuzzle from './ChainPuzzle';
import Heuristic from './Heuristic';

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
  }
}

export default PuzzleSolver;