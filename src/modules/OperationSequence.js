import { Operations } from '@/constants';

const DEFAULT_SCRAMBLE = 60;

const SORT_ORDER = {
  [Operations.INNER_SHIFT]: 0,
  [Operations.INVERSE_INNER_SHIFT]: 1,
  [Operations.OUTER_SHIFT]: 2,
  [Operations.INVERSE_OUTER_SHIFT]: 3
}

const OperationSequence = {
  scramble(iterations = DEFAULT_SCRAMBLE) {
    const operations = [];
    let lastOperation = Operations.INNER_SHIFT;

    for (let i = 0; i < iterations; i++) {
      let operation;
      
      do {
        operation = Math.floor(Math.random() * 6);
      } while(operation != lastOperation && (operation%3 == lastOperation%3));

      operations.push(operation);
      lastOperation = operation;
    }

    return operations;
  },

  // reorders sequence so inner shifts always come before outer shifts
  reorder(sequence) {
    let newSequence = [];
    let start = 0;

    const sortFunc = (a, b) => SORT_ORDER[a] - SORT_ORDER[b];
    
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] == Operations.ROTATE || sequence[i] == Operations.INVERSE_ROTATE) {
        newSequence = newSequence.concat(sequence.slice(start, i).sort(sortFunc));
        newSequence.push(sequence[i]);

        start = i + 1;
      }
    }

    newSequence = newSequence.concat(sequence.slice(start).sort(sortFunc));

    return newSequence;
  }
}

export default OperationSequence;