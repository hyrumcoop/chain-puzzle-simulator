import { onMounted } from 'vue';

const useKeyboard = (animation) => {
  onMounted(() => {
    window.addEventListener('keypress', event => {
      switch(event.key.toLowerCase()) {
        case 'a':
          return animation.innerShift();
        case 'd':
          return animation.inverseInnerShift();
        case 'q':
          return animation.inverseOuterShift();
        case 'e':
          return animation.outerShift();
        case 'w':
          return animation.rotate();
        case 's':
          return animation.inverseRotate();
      }
    })
  });
}

export default useKeyboard;