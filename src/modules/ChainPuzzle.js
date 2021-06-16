
import { Operations, OperationMappings } from '@/constants';

const DEFAULT_MARBLES = [
  0, 0, 0, 0, 0,
  1, 1, 1, 1, 1,
  2, 2, 2, 2, 2,
  3, 3, 3, 3, 3,
  4, 4, 4, 4, 4,
  5, 5, 5, 5, 5
];

const ENCODE_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij';
const DEFAULT_SCRAMBLE = 60; // default number of iterations to scramble

function ChainPuzzle(symmetric = false, marbles = DEFAULT_MARBLES.slice(0)) {
  this.symmetric = symmetric;
  this.marbles = marbles;
  
  this.listeners = {
    transform: [],
    reset: [],
    solve: []
  }
}

ChainPuzzle.prototype.encode = function() {
  let str = this.symmetric ? 'S' : 'A'; // S = symmetric, A = asymmetric

  for (let i = 0; i < 30; i += 2) {
    let val = this.marbles[i] * 6 + this.marbles[i + 1];
    str += ENCODE_STR[val];
  }

  return str;
}

ChainPuzzle.decode = str => {
  // TODO: validation

  const symmetric = str[0] == 'S';
  const marbles = [];

  str.slice(1).split('').forEach((char, i) => {
    const val = ENCODE_STR.indexOf(char);
    marbles[i*2] = Math.floor(val / 6);
    marbles[i*2 + 1] = val % 6;
  });

  return new ChainPuzzle(symmetric, marbles);
}

ChainPuzzle.prototype.map = function(mapping) {
  const temp = this.marbles.slice(0);

  for (let i = 0; i < 30; i++) {
    this.marbles[i] = temp[mapping[i]]
  }

  return this;
}

ChainPuzzle.prototype.equals = function(puzzle) {
  // TODO: check if input is of type ChainPuzzle
  return this.symmetric == puzzle.symmetric && arraysEqual(this.marbles, puzzle.marbles);
}

ChainPuzzle.prototype.copy = function() {
  return new ChainPuzzle(this.symmetric, [...this.marbles]);
}

ChainPuzzle.prototype.isSolved = function() {
  return !this.symmetric &&
      isSubchainSolved(this.marbles.slice(0, 15)) &&
      isSubchainSolved(this.marbles.slice(15));
}

ChainPuzzle.prototype.normalize = function() {
  const mapping = {};
  let index = 0;

  for (let i = 0; i < 30; i++) {
    const cur = this.marbles[i];

    if (mapping[cur] == null) {
      mapping[cur] = index++;
    }

    this.marbles[i] = mapping[cur];
  }

  return this;
}

ChainPuzzle.prototype.scramble = function(iterations) {
  if (!iterations) iterations = DEFAULT_SCRAMBLE;

  let lastOperation = Operations.INNER_SHIFT;

  for (let i = 0; i < iterations; i++) {
    let operation;
    
    do {
      operation = Math.floor(Math.random() * 6);
    } while(operation != lastOperation && (operation%3 == lastOperation%3));

    this.transform(operation);
    lastOperation = operation;
  }

  return this;
}

ChainPuzzle.prototype.operationMappings = function() {
  return this.symmetric ? OperationMappings.Symmetric : OperationMappings.Asymmetric;
}

ChainPuzzle.prototype.transform = function(operation, checkSolved = true) {
  // TODO: check if operation is valid

  this.map(this.operationMappings()[operation]);

  if (operation == Operations.ROTATE || operation == Operations.INVERSE_ROTATE) {
    this.symmetric = !this.symmetric;
  }

  this.fireEvent('transform', [operation]);

  if (checkSolved && this.isSolved()) {
    this.fireEvent('solve', []);
  }

  return this;
}

ChainPuzzle.prototype.rotate = function() {
  return this.transform(Operations.ROTATE);
}

ChainPuzzle.prototype.innerShift = function() {
  return this.transform(Operations.INNER_SHIFT);
}

ChainPuzzle.prototype.outerShift = function() {
  return this.transform(Operations.OUTER_SHIFT);
}

ChainPuzzle.prototype.inverseRotate = function() {
  return this.transform(Operations.INVERSE_ROTATE);
}

ChainPuzzle.prototype.inverseInnerShift = function() {
  return this.transform(Operations.INVERSE_INNER_SHIFT);
}

ChainPuzzle.prototype.inverseOuterShift = function() {
  return this.transform(Operations.INVERSE_OUTER_SHIFT);
}

ChainPuzzle.prototype.reset = function(symmetric = false, marbles = DEFAULT_MARBLES.slice(0)) {
  this.symmetric = symmetric;
  this.marbles = marbles;

  this.fireEvent('reset', []);

  return this;
}

ChainPuzzle.prototype.loadPuzzleCode = function(code) {
  // TODO: validation

  const newPuzzle = ChainPuzzle.decode(code);
  return this.reset(newPuzzle.symmetric, newPuzzle.marbles);
}

ChainPuzzle.prototype.fireEvent = async function(event, params) {
  // TODO: check if event is valid

  this.listeners[event].forEach(async func => func(...params));
}

ChainPuzzle.prototype.onTransform = function(func) {
  this.listeners.transform.push(func);
}

ChainPuzzle.prototype.onReset = function(func) {
  this.listeners.reset.push(func);
}

ChainPuzzle.prototype.onSolve = function(func) {
  this.listeners.solve.push(func);
}

// checks if 15-marble array is solved
function isSubchainSolved(chain) {
  let end = 14;

  while (chain[end] == chain[0]) {
    end--;
  }

  let consecutive = 15 - end;
  for (let i = 1; i <= end; i++) {
    if (chain[i] != chain[i - 1]) {
      if (consecutive != 5) {
        return false;
      }

      consecutive = 1;
    } else {
      consecutive++;
    }
  }

  return true;
}

// TODO: move to helper function file
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

export default ChainPuzzle;