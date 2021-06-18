<template>
  <div class='d-flex flex-column'>
    <div ref='viewport' class='flex-grow-1 position-relative'>
      <div class='overlay position-absolute top-0 bottom-0 w-100 h-100'>
        <puzzle-code-box :code='puzzleCode' :solved='isSolved' />

        <playback-bar
          :operations='playbackQueue'
          :currentIndex='playbackQueueIndex - 1'
        />

        <controls-guide
          :controlsType='controlsType'
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

      @play='play()'
      @pause='pause()'
      @cancel='stop()'
      @next='next()'
      @prev='prev()'

      @updateSpeed='setSpeed'

      :solving='isSolving'
      :bestSolution='bestSolution'
      @find-solutions='findSolutions()'
      @choose-solution='chooseSolution()'

      @load-puzzle-code='loadPuzzleCode($event)'

      :inputting='isInputting'
      :inputSymmetric='inputSymmetric'
      @begin-marble-input='beginMarbleInput()'
      @cancel-marble-input='cancelMarbleInput()'
      @update-input-symmetric='updateInputSymmetric($event)'
    />
  </div>
</template>

<script>
import { ref, shallowRef } from 'vue';

import { PlaybackMode } from '@/constants';

import PuzzleCodeBox from './PuzzleCodeBox';
import ViewportControls from './ViewportControls';
import PlaybackBar from './PlaybackBar';
import ControlsGuide from './ControlsGuide';

import useRenderer from '@/composables/useRenderer';
import useCameraControls from '@/composables/useCameraControls';
import useLighting from '@/composables/useLighting';
import useChain from '@/composables/useChain';
import useMarbles from '@/composables/useMarbles';
import useAnimation from '@/composables/useAnimation';
import useKeyboard from '@/composables/useKeyboard';
import usePlayback from '@/composables/usePlayback';
import useMarbleInputter from '@/composables/useMarbleInputter';

import ChainPuzzle from '@/modules/ChainPuzzle';
import OperationSequence from '@/modules/OperationSequence';

import PuzzleSolver from '@/modules/PuzzleSolver';

export default {
  components: {
    ViewportControls,
    PuzzleCodeBox,
    PlaybackBar,
    ControlsGuide
  },
  setup() {
    const puzzle = shallowRef(new ChainPuzzle());
    const puzzleCode = ref(puzzle.value.encode());
    const isSolved = ref(puzzle.value.isSolved());

    const isSolving = ref(false);
    const bestSolution = ref(null);
    const stopSolvingFunc = shallowRef(null);

    const loadPuzzleCode = code => puzzle.value.loadPuzzleCode(code);

    puzzle.value.onTransform(() => {
      puzzleCode.value = puzzle.value.encode();
      isSolved.value = puzzle.value.isSolved();
    });

    puzzle.value.onReset(() => {
      marbleInputter.isInputting.value = false;
      marbles.setMarkerVisibility(false);

      puzzleCode.value = puzzle.value.encode();
      isSolved.value = puzzle.value.isSolved();
    });

    const renderer = useRenderer();
    const cameraControls = useCameraControls(renderer.camera, renderer.viewport, renderer.onAnimate);
    const lighting = useLighting(renderer.scene);
    const chain = useChain(renderer.scene, puzzle);
    const marbles = useMarbles(renderer.scene, puzzle);
    const animation = useAnimation(puzzle, chain, marbles.marbles, renderer);
    const playback = usePlayback(puzzle, animation);
    const marbleInputter = useMarbleInputter(marbles, chain, puzzle, loadPuzzleCode);

    useKeyboard(playback, marbleInputter, chain);
    
    return {
      puzzle,
      puzzleCode,
      isSolved,
      isSolving,
      bestSolution,
      stopSolvingFunc,
      loadPuzzleCode,

      ...renderer,
      ...cameraControls,
      ...lighting,
      ...chain,
      ...marbles,
      ...animation,
      ...playback,
      ...marbleInputter
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
    async findSolutions() {
      this.isSolving = true;

      this.stopSolvingFunc = PuzzleSolver.generateSolutions(this.puzzle, solution => {
        this.bestSolution = solution;
      });
    },
    async chooseSolution() {
      this.bestSolution = await this.stopSolvingFunc();
      await this.setPlaybackSequence(this.bestSolution); // TODO: error checking
      this.isSolving = false;
      this.bestSolution = null;
    }
  },
  computed: {
    showPlaybackControls() {
      return this.playbackMode == PlaybackMode.DEMONSTRATION
    },
    controlsType() {
      if (this.isInputting) return 'input-marbles';
      if (this.showPlaybackControls) return 'playback';

      return 'puzzle';
    }
  }
}
</script>

<style scoped>

</style>