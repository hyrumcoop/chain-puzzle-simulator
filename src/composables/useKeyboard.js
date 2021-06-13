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

const useKeyboard = (playback) => {
  onMounted(() => {
    window.addEventListener('keypress', event => {
      const key = event.key.toLowerCase();
      if (key in KeyOperations) playback.pushOperation(KeyOperations[key]);
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