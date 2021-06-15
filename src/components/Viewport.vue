<template>
  <div class='d-flex flex-column'>
    <div ref='viewport' class='flex-grow-1 position-relative'>
      <div class='overlay position-absolute top-0 bottom-0 w-100 h-100'>
        <puzzle-code-box :code='puzzleCode' />

        <playback-bar
          :operations='playbackQueue'
          :currentIndex='playbackQueueIndex - 1'
        />
      </div>
    </div>
    
    <viewport-controls
      :showPlaybackControls='showPlaybackControls'
      :playing='playing'
      :operations='playbackQueue'
      :currentIndex='playbackQueueIndex'
      :speed='speed'

      @scramble='scramble'
      @reset='reset'
      @solve='solve'

      @play='play()'
      @pause='pause()'
      @cancel='stop()'
      @next='next()'
      @prev='prev()'

      @updateSpeed='setSpeed'
    />
  </div>
</template>

<script>
import { ref, shallowRef } from 'vue';

import { PlaybackMode } from '@/constants';

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
import usePlayback from '@/composables/usePlayback';

import ChainPuzzle from '@/modules/ChainPuzzle';
import OperationSequence from '@/modules/OperationSequence';

import PuzzleSolver from '@/modules/PuzzleSolver';

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
    const playback = usePlayback(puzzle, animation);

    useKeyboard(playback);
    
    return {
      puzzle,
      puzzleCode,

      ...renderer,
      ...cameraControls,
      ...lighting,
      ...chain,
      ...marbles,
      ...animation,
      ...playback
    };
  },
  mounted() {
    this.animate();
  },
  methods: {
    async scramble() {
      await this.setPlaybackSequence(OperationSequence.scramble());
      this.play();
    },
    reset() {
      this.puzzle.reset()
    },
    solve() {
      this.setPlaybackSequence(PuzzleSolver.solve(this.puzzle, 60));
    }
  },
  computed: {
    showPlaybackControls() {
      return this.playbackMode == PlaybackMode.DEMONSTRATION // TODO: BAD, USE ENUM
    }
  }
}
</script>

<style scoped>

</style>