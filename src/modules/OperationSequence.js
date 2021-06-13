import { Operations } from '@/constants';

const DEFAULT_SCRAMBLE = 60;

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
  }
}

export default OperationSequence;