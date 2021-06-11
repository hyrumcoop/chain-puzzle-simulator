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

const useKeyboard = (puzzle) => {
  onMounted(() => {
    window.addEventListener('keypress', event => {
      const key = event.key.toLowerCase();
      if (key in KeyOperations) puzzle.value.transform(KeyOperations[key]);
    })
  });
}

export default useKeyboard;