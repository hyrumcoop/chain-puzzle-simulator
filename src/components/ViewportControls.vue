<template>
  <div class='bottom-bar container-fluid'>
    <div class='row align-items-center h-100'  v-if='showPlaybackControls'>
      <div class='col'></div>

      <div class='col col-auto fs-1'>
        <a href='#' class='text-reset me-4' @click='$emit("skip-start")'><i class='bi-skip-start-fill'></i></a>
        <a href='#' class='text-reset' @click='$emit("prev")'><i class='bi-skip-backward-fill'></i></a>
        <a href='#' class='text-reset mx-4' v-if='playing' @click='$emit("pause")'><i class='bi-pause-circle-fill'></i></a>
        <a href='#' class='text-reset mx-4' v-else @click='$emit("play")'><i class='bi-play-circle-fill'></i></a>
        <a href='#' class='text-reset' @click='$emit("next")'><i class='bi-skip-forward-fill'></i></a>
        <a href='#' class='text-reset ms-4' @click='$emit("skip-end")'><i class='bi-skip-end-fill'></i></a>
      </div>

      <div class='col d-flex justify-content-end align-items-center'>
        <div class='flex-grow-1 text-center'>
          <span class='fw-bold'>{{currentIndex}}</span><span class='text-secondary'> / {{operations.length}} moves</span>
        </div>
        <button class='btn btn-outline-dark' @click='$emit("cancel")'>Cancel</button>
      </div>
    </div>

    <div class='row align-items-center h-100' v-else>
      <div class='bar d-flex justify-content-center py-3'>
        <button type='button' class='btn btn-outline-dark' @click='$emit("scramble")'>Scramble</button>
        <button type='button' class='btn btn-outline-primary mx-2'>Solve</button>
        <button type='button' class='btn btn-outline-dark' @click='$emit("reset")'>Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewportControls',
  props: {
    showPlaybackControls: Boolean,
    playing: Boolean,
    operations: Array,
    currentIndex: Number
  }
}
</script>

<style scoped>

.bottom-bar {
  height: 75px;

  border-top: 1px solid #eee;
}

</style>
