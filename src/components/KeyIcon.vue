<template>
  <div class='key-icon d-flex justify-content-center align-items-center fw-bold' :style='colorStyle'>{{ char }}</div>
</template>

<script>
import { Tooltip } from 'bootstrap';
import chroma from 'chroma-js';

export default {
  name: 'KeyIcon',
  props: {
    char: String,
    tooltip: String,
    color: String
  },
  mounted() {
    if (this.tooltip) {
      new Tooltip(this.$el, {
        title: this.tooltip
      });
    }
   
  },
  computed: {
    colorStyle() {
      if (!this.color) return {};

      const style = {};

      if (chroma(this.color).luminance() < 0.179) {
        style.color = '#fff';
      }

      style.backgroundColor = this.color;
      style.borderColor = chroma(this.color).darken().css();

      return style;
    }
  }
}

</script>

<style scoped>

.key-icon {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  background-color: #f0f0f0;
  border-radius: 5px;
  border-bottom: 3px solid #ddd;

  cursor: pointer;
  transition: filter 0.2s ease;
}

.key-icon:hover {
  background-color: #ddd;
  border-color: #ccc;
  filter: brightness(90%);
}

</style>
