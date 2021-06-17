import { onMounted } from 'vue';

import { Operations } from '@/constants';

const KeyOperations = {
  'a': Operations.INNER_SHIFT,
  'd': Operations.INVERSE_INNER_SHIFT,
  'q': Operations.INVERSE_OUTER_SHIFT,
  'e': Operations.OUTER_SHIFT,
  'w': Operations.ROTATE,
  's': Operations.INVERSE_ROTATE
}

const KeyMarbleInputs = {
  'Digit1': 0,
  'Digit2': 1,
  'Digit3': 2,
  'Digit4': 3,
  'Digit5': 4,
  'Digit6': 5
}

const useKeyboard = (playback, marbleInputter, chain) => {
  onMounted(() => {
    window.addEventListener('keypress', event => {
      const {code} = event;

      if (code == 'KeyT') {
        return chain.toggleChainTransparent();
      }

      if (marbleInputter.isInputting.value) {
        if (code in KeyMarbleInputs) return marbleInputter.inputMarble(KeyMarbleInputs[code]);
      } else {
        const key = event.key.toLowerCase();
        if (key in KeyOperations) return playback.pushOperation(KeyOperations[key]);
      }
    });

    window.addEventListener('keydown', event => {
      if (event.code == 'ArrowRight') {
        playback.next();
      } else if (event.code == 'ArrowLeft') {
        playback.prev();
      } else if (event.code == 'Space') {
        playback.togglePlay();
      }
    });
  });
}

export default useKeyboard;