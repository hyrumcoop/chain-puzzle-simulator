<template>
  <div class='controls-guide'>
    <h5 class='title'>Controls</h5>

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
</template>

<script>
import KeyIcon from './KeyIcon';

export default {
  name: 'ControlsGuide',
  components: {
    KeyIcon
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
