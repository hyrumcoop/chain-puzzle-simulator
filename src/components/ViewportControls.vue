<template>
  <div class='bottom-bar container-fluid'>
    <div class='row align-items-center h-100'  v-if='showPlaybackControls'>
      <div class='col d-flex justify-content-end'>
        <input type='range' class='form-range w-25' @change='updateSpeed' :value='sliderValue'>
      </div>

      <div class='col col-auto fs-1'>
        <a href='#' class='text-reset me-4' @click='$emit("skip-start")'><i class='bi-skip-start-fill'></i></a>
        <a href='#' class='text-reset' @click='$emit("prev")'><i class='bi-skip-backward-fill'></i></a>
        <a href='#' class='text-reset mx-4' v-if='playing' @click='$emit("pause")'><i class='bi-pause-circle-fill'></i></a>
        <a href='#' class='text-reset mx-4' v-else @click='$emit("play")'><i class='bi-play-circle-fill'></i></a>
        <a href='#' class='text-reset' @click='$emit("next")'><i class='bi-skip-forward-fill'></i></a>
        <a href='#' class='text-reset ms-4' @click='$emit("skip-end")'><i class='bi-skip-end-fill'></i></a>
      </div>

      <div class='col d-flex justify-content-end align-items-center'>
        <div class='flex-grow-1 text-center'>
          <span class='fw-bold'>{{currentIndex}}</span><span class='text-secondary'> / {{operations.length}} moves</span>
        </div>

        <button type='button' class='icon-button btn btn-outline-dark' @click='$emit("cancel")'>
          <i class='bi-x fs-5' />
          <span>Cancel</span>
        </button>
      </div>
    </div>

    <div class='row align-items-center h-100' v-if='solving'>
      <div class='col text-center'>
        <small class='fw-light text-muted'>Solutions become iteratively better with time</small>
      </div>

      <div class='col col-auto d-flex align-items-center justify-content-center'>
        <button
          class='btn position-relative'
          :class='{"btn-success": solveReady, "btn-outline-success": !solveReady}'
          :disabled='!solveReady || !bestSolution'
          @click='$emit("choose-solution")'
        >
          <div class='button-loading-overlay' id='solve-button-overlay'></div>
          <span v-if='bestSolution'>Solve in {{ bestSolution.length }} steps</span>
          <span v-else>Finding solutions...</span>
        </button>
      </div>

      <div class='col'></div>
    </div>

    <div class='row align-items-center h-100' v-if='inputting'>
      <div class='col'></div>

      <div class='col col-auto d-flex flex-row'>
        <div class='btn-group' role='group' aria-label='Symmetric toggle'>
          <input type='radio' name='input-symmetric' class='btn-check' id='input-symmetric' autocomplete='off' @click='$emit("update-input-symmetric", true)' :checked='inputSymmetric'>
          <label class='btn btn-outline-dark' for='input-symmetric'>Symmetric</label>

          <input type='radio' name='input-symmetric' class='btn-check' id='input-asymmetric' autocomplete='off' @click='$emit("update-input-symmetric", false)' :checked='!inputSymmetric'>
          <label class='btn btn-outline-dark' for='input-asymmetric'>Asymmetric</label>
        </div>
      </div>

      <p class='vertical-separator'><span>or</span></p>

      <div class='col col-auto'>
        <div class='input-group'>
          <input type='text' v-model='puzzleCode' class='form-control' placeholder='Puzzle Code' aria-label='Puzzle Code' aria-describedby='load-code-button'>
          <button class='btn btn-outline-secondary' type='button' @click='loadPuzzleCode()' id='load-code-button'>Load</button>
        </div>
      </div>

      <div class='col d-flex justify-content-end'>
        <button type='button' class='icon-button btn btn-outline-dark' @click='$emit("cancel-marble-input")'>
          <i class='bi-x fs-5' />
          <span>Cancel</span>
        </button>
      </div>
    </div>

    <div class='row align-items-center h-100' v-if='!inputting && !solving && !showPlaybackControls'>
      <div class='col d-flex'>
        <button type='button' class='icon-button btn btn-outline-dark' @click='$emit("reset")'>
          <i class='bi-arrow-clockwise fs-5' />
          <span>Reset</span>
        </button>

        <button type='button' class='icon-button btn btn-outline-dark ms-2' @click='$emit("scramble")'>
          <i class='bi-shuffle fs-5' />
          <span>Scramble</span>
        </button>

        <button type='button' class='icon-button btn btn-success ms-2' @click='$emit("find-solutions")'>
          <i class='bi-lightbulb fs-5' />
          <span>Solve</span>
        </button>
      </div>

      <div class='col d-flex justify-content-end'>
        <button type='button' class='icon-button btn btn-outline-dark' @click='$emit("begin-marble-input")'>
          <i class='bi-upload fs-5' />
          <span>Load Puzzle</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import $ from 'jquery';

const MIN_SPEED = 1;
const MAX_SPEED = 0.1;

const SOLUTION_WAIT = 7500; // milliseconds user is required to wait for solutions to generate

export default {
  name: 'ViewportControls',
  props: {
    showPlaybackControls: Boolean,
    playing: Boolean,
    operations: Array,
    currentIndex: Number,
    speed: Number,

    solving: Boolean,
    bestSolution: Array,

    inputting: Boolean,
    inputSymmetric: Boolean
  },
  data() {
    return {
      puzzleCode: '',
      solveReady: false
    }
  },
  methods: {
    updateSpeed(event) {
      const val = parseInt(event.target.value);
      const speed = ((100 - val) / 100) * (MIN_SPEED - MAX_SPEED) + MAX_SPEED;

      this.$emit('updateSpeed', speed);
    },
    loadPuzzleCode() {
      this.$emit('load-puzzle-code', this.puzzleCode);
    }
  },
  computed: {
    sliderValue() {
      const val = 100 - ((this.speed - MAX_SPEED) / (MIN_SPEED - MAX_SPEED) * 100);
      return val;
    }
  },
  watch: {
    async solving(newSolving, oldSolving) {
      if (newSolving == oldSolving) return;

      if (newSolving) {
        this.solveReady = false;
        await nextTick();

        $('#solve-button-overlay').animate({height: '100%'}, SOLUTION_WAIT, 'linear', () => {
          this.solveReady = true;
          $('#solve-button-overlay').height('0%');
        });
      }
    }
  }
}
</script>

<style scoped>

.bottom-bar {
  height: 75px;

  border-top: 1px solid #eee;
}

.icon-button {
  display: flex;
  align-items: center;
}

.icon-button span {
  max-width: 0px;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 0.4s ease, padding 0.4s ease;
}

.icon-button:hover span {
  max-width: 200px;
  padding-left: 8px;
}

.button-loading-overlay {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 0%;

  background-color: #19875440;
}

.vertical-separator {
  display: flex;
  align-items: center;

  width: 0;
  height: 80%;

  margin: 0px 8px;
  padding: 0px;

  border-left: 1px solid #d0d0d0;
  color: #9e9e9e;

  font-weight: 300;
}

.vertical-separator span {
  position: relative;
  background-color: white;
  right: 8px;
}

</style>
