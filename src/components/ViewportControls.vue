<template>
  <div class='bar d-flex justify-content-center py-3'>
    <button type='button' class='btn btn-lg btn-light' @click='$emit("scramble")'>Scramble</button>
    <button type='button' class='btn btn-lg btn-primary mx-2'>Solve</button>
    <button type='button' class='btn btn-lg btn-light'>Reset</button>
  </div>
</template>

<script>
export default {
  name: 'ViewportControls'
}
</script>

<style scoped>

.bar {
  border-top: 1px solid #eee;
}

</style>
