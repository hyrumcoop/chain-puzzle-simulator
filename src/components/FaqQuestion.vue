<template>
  <div class='question-container'>
    <a href='#' class='text-reset text-decoration-none' @click='$emit("select")'>
      <div class='question'>
        <span class='flex-grow-1'>{{ question }}</span>

        <i class='bi-caret-down-fill' v-if='!show' />
        <i class='bi-caret-up-fill' v-else />
      </div>
    </a>

    <div class='collapse' ref='answerCollapse'>
      <div class='answer'>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';

export default {
  name: 'FaqQuestion',
  props: {
    question: String,
    show: Boolean
  },
  data() {
    return {
      collapse: null
    }
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.answerCollapse, {
      toggle: this.show
    });
  },
  watch: {
    show(newShow) {
      if (!this.collapse) return;

      if (newShow) {
        this.collapse.show();
      } else {
        this.collapse.hide();
      }
    }
  }
}
</script>

<style scoped>

.question-container {
  margin-bottom: 8px;
}

.question {
  display: flex;
  padding: 16px;

  color: #424242;
  font-size: 1rem;
  font-weight: 700;

  background-color: #f8f8f8;
  border-radius: 4px;
}

.answer {
  padding: 8px 16px;
}

</style>