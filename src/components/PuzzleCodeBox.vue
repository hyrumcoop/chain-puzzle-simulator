<template>
  <span class='puzzleCode font-monospace' :class='{solved}'>
    <a href='#' @click='copy()'><i class='bi-clipboard'></i></a>
    <span>{{ code }}</span>
  </span>

  <div class='position-fixed start-50 translate-middle-x p-3' style='z-index: 5'>
    <div class='toast align-items-center' role='status' aria-live='polite' aria-atomic='true' ref='toastElement'>
      <div class='d-flex'>
        <div class='toast-body'>
          Copied puzzle code to clipboard.
        </div>
        <button type='button' class='btn-close me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Toast } from 'bootstrap';

export default {
  props: {
    code: String,
    solved: Boolean
  },
  data() {
    return {
      toast: null
    }
  },
  setup() {
    return {
      toastElement: ref(null)
    }
  },
  mounted() {
    this.toast = new Toast(this.toastElement, {
      delay: 2500,
    });
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.code);
      this.toast.show();
    }
  }
}
</script>

<style scoped>

.puzzleCode {
  position: fixed;
  right: 0;

  padding: 4px 10px 2px 8px;

  color: #636363;
  background-color: #f8f8f8;

  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-bottom-left-radius: 6px;

  z-index: 2;
}

.puzzleCode.solved {
  background-color: #c8e6c9;
  border-color: #a5d6a7;
}

.puzzleCode a {
  position:relative;
  bottom: -2px;

  padding-right: 6px;

  font-size: 1.25rem;
  color: #212121;
}

</style>