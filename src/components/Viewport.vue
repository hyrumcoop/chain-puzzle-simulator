<template>
  <div class='d-flex flex-column'>
    <div ref='viewport' class='flex-grow-1'>
      <puzzle-code-box :code='puzzleCode' />
    </div>
    
    <playback-bar :operations='[3, 3, 0, 3, 4, 3, 4, 1, 5, 3, 3, 2, 5, 2, 1, 2, 1, 2, 2, 0]' />

    <viewport-controls
      @scramble='scramble'
      @reset='reset'
    />
  </div>
</template>

<script>
import { ref, shallowRef } from 'vue';

import PuzzleCodeBox from './PuzzleCodeBox';
import ViewportControls from './ViewportControls';
import PlaybackBar from './PlaybackBar';

import useRenderer from '@/composables/useRenderer';
import useCameraControls from '@/composables/useCameraControls';
import useLighting from '@/composables/useLighting';
import useChain from '@/composables/useChain';
import useMarbles from '@/composables/useMarbles';
import useAnimation from '@/composables/useAnimation';
import useKeyboard from '@/composables/useKeyboard';

import ChainPuzzle from '@/modules/ChainPuzzle';

export default {
  components: {
    ViewportControls,
    PuzzleCodeBox,
    PlaybackBar
  },
  setup() {
    const puzzle = shallowRef(new ChainPuzzle());
    const puzzleCode = ref(puzzle.value.encode());

    puzzle.value.onTransform(() => puzzleCode.value = puzzle.value.encode());
    puzzle.value.onReset(() => puzzleCode.value = puzzle.value.encode());

    const renderer = useRenderer();
    const cameraControls = useCameraControls(renderer.camera, renderer.viewport, renderer.onAnimate);
    const lighting = useLighting(renderer.scene);
    const chain = useChain(renderer.scene, puzzle);
    const marbles = useMarbles(renderer.scene, puzzle);
    const animation = useAnimation(puzzle, chain, marbles.marbles, renderer);

    useKeyboard(puzzle);
    
    return {
      puzzle,
      puzzleCode,

      ...renderer,
      ...cameraControls,
      ...lighting,
      ...chain,
      ...marbles,
      ...animation
    };
  },
  mounted() {
    this.animate();
  },
  methods: {
    scramble() {
      this.puzzle.scramble()
    },
    reset() {
      this.puzzle.reset()
    }
  }
}
</script>

<style scoped>

</style>