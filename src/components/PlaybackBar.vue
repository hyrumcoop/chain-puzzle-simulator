<template>
  <div class='playback-bar d-flex flex-row' ref='playbackBar' v-if='operations.length > 0'>
    <div class='operations d-flex flex-row' :style='{marginLeft: margin}' ref='operationsContainer'>
      <operation-icon v-for='(op, i) in operations' :op='op' :key='i' :selected='i == currentIndex' />
    </div>
  </div>
</template>

<script>
import OperationIcon from './OperationIcon';

const X_PADDING = 16;
const OPERATION_ICON_WIDTH = 40; // TODO: these values are subject to change based on OperationIcon
const ICON_SPACING = 4;

export default {
  name: 'PlaybackBar',
  components: {
    OperationIcon
  },
  props: {
    operations: Array,
    currentIndex: Number
  },
  methods: {
    // if the bar is overflowing, we want the current index to be centered
    calculateMargin() {
      if (!this.$refs.playbackBar || !this.$refs.operationsContainer) return '0px;';

      const barWidth = this.$refs.playbackBar.offsetWidth;
      const operationsWidth = this.$refs.operationsContainer.offsetWidth;

      if (operationsWidth <= barWidth) {
        return '0px';
      }

      const currentIndexPos = X_PADDING + ((this.currentIndex + 0.5) * OPERATION_ICON_WIDTH) + (this.currentIndex * ICON_SPACING);

      if (currentIndexPos <= barWidth / 2) {
        return '0px';
      } else if (currentIndexPos >= operationsWidth - barWidth/2) {
        return `${barWidth - operationsWidth - X_PADDING * 2 + ICON_SPACING}px`;
      }

      return `${barWidth/2 - currentIndexPos}px`;
    }
  },
  computed: {
    margin() {
      this.currentIndex;

      return this.calculateMargin();
    }
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
