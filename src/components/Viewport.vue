<template>
  <div class='d-flex flex-column'>
    <div ref='viewport' class='flex-grow-1'></div>
    
    <viewport-controls
      @scramble='scramble'
      @reset='reset'
    />
  </div>
</template>

<script>
import { shallowRef } from 'vue';
import ViewportControls from './ViewportControls.vue';

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
    ViewportControls
  },
  setup() {
    const puzzle = shallowRef(new ChainPuzzle());

    const renderer = useRenderer();
    const cameraControls = useCameraControls(renderer.camera, renderer.viewport, renderer.onAnimate);
    const lighting = useLighting(renderer.scene);
    const chain = useChain(renderer.scene, puzzle);
    const marbles = useMarbles(renderer.scene, puzzle);
    const animation = useAnimation(puzzle, chain, marbles.marbles);

    useKeyboard(puzzle);
    
    return {
      puzzle,
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