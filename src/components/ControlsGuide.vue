<template>
  <div class='controls-guide' :class='{playback: showPlaybackControls}'>
    <h5 class='title'>{{ title }}</h5>

    <div class='puzzle-controls' v-if='showPuzzleControls'>
      <div class='key-desc'>
        <key-icon char='Q' tooltip='Inverse Outer Shift' />
        <small>Shift outer ring counter-clockwise</small>
      </div>

      <div class='key-desc'>
        <key-icon char='E' tooltip='Outer Shift' />
        <small>Shift outer ring clockwise</small>
      </div>

      <div class='key-desc'>
        <key-icon char='A' tooltip='Inner Shift' />
        <small>Shift inner ring clockwise</small>
      </div>

      <div class='key-desc'>
        <key-icon char='D' tooltip='Inverse Inner Shift' />
        <small>Shift inner ring counter-clockwise</small>
      </div>

      <div class='key-desc'>
        <key-icon char='W' tooltip='Rotate' />
        <small>Rotate right-half clockwise</small>
      </div>

      <div class='key-desc'>
        <key-icon char='S' tooltip='Inverse Rotate' />
        <small>Rotate right-half counter-clockwise</small>
      </div>
    </div>

    <div class='input-marbles-controls d-flex flex-column' v-if='showInputMarbleControls'>
      <small class='mb-3'>Input a marble into the highlighted position by pressing the key associated with the color of the marble.</small>

      <div class='d-flex flex-row'>
        <div class='d-flex flex-grow-1 justify-content-center' v-for='(color, i) in keyColors' :key='i'>
          <key-icon :char='String(i + 1)' :color='color' />
        </div>
      </div>
    </div>

    <div class='playback-controls' v-if='showPlaybackControls'>
      <div class='key-desc'>
        <key-icon icon='bi-caret-left-fill' tooltip='Arrow Left' />
        <small>Step back</small>
      </div>

      <div class='key-desc'>
        <key-icon icon='bi-caret-right-fill' tooltip='Arrow Right' />
        <small>Step forward</small>
      </div>

      <div class='key-desc'>
        <key-icon char=' ' tooltip='Spacebar' />
        <small>Toggle playback</small>
      </div>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js';
import KeyIcon from './KeyIcon';

import { MARBLE_COLORS } from '@/constants';

export default {
  name: 'ControlsGuide',
  components: {
    KeyIcon
  },
  props: {
    controlsType: String
  },
  computed: {
    keyColors() {
      return MARBLE_COLORS.map(col => chroma(col).css());
    },
    title() {
      switch(this.controlsType) {
        case 'puzzle': return 'Puzzle Controls';
        case 'input-marbles': return 'Input Controls';
        case 'playback': return 'Playback Controls';
        default: return 'Controls';
      }
    },
    showPuzzleControls() {
      return this.controlsType == 'puzzle'
    },
    showInputMarbleControls() {
      return this.controlsType == 'input-marbles'
    },
    showPlaybackControls() {
      return this.controlsType == 'playback';
    }
  }
}
</script>

<style scoped>

.controls-guide {
  position: absolute;
  bottom: 0px;
  right: 0px;

  width: 300px;
  padding: 12px;

  background-color: #ffffffcc;

  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-top-left-radius: 4px;
}

.controls-guide.playback {
  bottom: 57px; /* this must change if the playback bar height changes */
}

.controls-guide .title {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.key-desc {
  display: flex;
  align-items: center;

  margin-bottom: 6px;
}

.key-desc small {
  padding-left: 12px;
}

</style>
