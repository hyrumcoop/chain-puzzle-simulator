import { ref } from 'vue';

import ChainPuzzle from '@/modules/ChainPuzzle';

import {
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS
} from '@/constants';

const useMarbleInputter = (marbles, chain, puzzle, loadPuzzleCode) => {
  const isInputting = ref(false);
  const inputSymmetric = ref(false);

  let inputMarbles = [];
  let oldPuzzleCode = puzzle.value.encode();

  const setMarkerIndex = idx => {
    const positions = inputSymmetric.value ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;
    marbles.markerMarble.value.position.copy(positions[idx]);
  }

  const updateInputSymmetric = symmetric => {
    inputSymmetric.value = symmetric;

    if (isInputting.value) {
      setMarkerIndex(inputMarbles.length);

      chain.updateChainOrientation(symmetric);
      marbles.setMarbleOrientation(symmetric, inputMarbles);
    }
  }

  const beginMarbleInput = () => {
    oldPuzzleCode = puzzle.value.encode(); // store initial state in case the user cancels
    inputSymmetric.value = puzzle.value.symmetric;

    inputMarbles = [];
    isInputting.value = true;

    chain.updateChainOrientation(inputSymmetric.value);
    marbles.clearMarbles();

    setMarkerIndex(0);
    marbles.setMarkerVisibility(true);
  }

  const cancelMarbleInput = () => {
    isInputting.value = false;
    marbles.setMarkerVisibility(false);

    loadPuzzleCode(oldPuzzleCode);
  }

  const inputMarble = marble => {
    if (!isInputting.value) return;

    inputMarbles[inputMarbles.length] = marble;
    marbles.setMarbleOrientation(inputSymmetric.value, inputMarbles);

    if (inputMarbles.length == 30) {
      isInputting.value = false;
      marbles.setMarkerVisibility(false);

      const newPuzzle = new ChainPuzzle(inputSymmetric.value, inputMarbles);
      loadPuzzleCode(newPuzzle.encode());
    } else {
      setMarkerIndex(inputMarbles.length);
    }
  }

  return {
    isInputting,
    inputSymmetric,

    updateInputSymmetric,
    beginMarbleInput,
    cancelMarbleInput,
    inputMarble
  }
}

export default useMarbleInputter;