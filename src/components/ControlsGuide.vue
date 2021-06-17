<template>
  <div class='controls-guide'>
    <h5 class='title'>Controls</h5>

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
    showPuzzleControls() {
      return this.controlsType == 'puzzle'
    },
    showInputMarbleControls() {
      return this.controlsType == 'input-marbles'
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
