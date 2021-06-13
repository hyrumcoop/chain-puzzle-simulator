<template>
  <div class='playback-bar d-flex flex-row'  v-if='operations.length > 0'>
    <operation-icon v-for='(op, i) in operations' :op='op' :key='i' :selected='i == currentIndex' />
  </div>
</template>

<script>
import OperationIcon from './OperationIcon';

export default {
  name: 'PlaybackBar',
  components: {
    OperationIcon
  },
  props: {
    operations: Array,
    currentIndex: Number
  }
}
</script>

<style scoped>

.playback-bar {
  position: absolute;
  width: 100%;
  overflow: hidden;
  bottom: 0;

  padding: 8px 16px;

  background-color:#f4f4f4;
  border-top: 1px solid #eee;
}

</style>
