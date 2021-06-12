<template>
  <div class='playback-bar d-flex flex-row'>
    <operation-icon v-for='(op, i) in operations' :op='op' :key='i' />
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
    operations: Array
  }
}
</script>

<style scoped>

.playback-bar {
  padding: 8px 16px;

  background-color:#f4f4f4;
  border-top: 1px solid #eee;
}

</style>
