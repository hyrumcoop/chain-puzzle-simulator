<template>
  <div class='key-icon d-flex justify-content-center align-items-center fw-bold'>{{ char }}</div>
</template>

<script>
import { Tooltip } from 'bootstrap';

export default {
  name: 'KeyIcon',
  props: {
    char: String,
    tooltip: String
  },
  mounted() {
    new Tooltip(this.$el, {
      title: this.tooltip
    });
  },
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
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.key-icon:hover {
  background-color: #ddd;
  border-color: #ccc;
}

</style>
