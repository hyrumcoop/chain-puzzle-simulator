<template>
  <div class='bar d-flex align-items-center px-3'>
    <h2 class='title m-0 flex-grow-1'>Astrolabicon</h2>

    <div class='icon-buttons fs-3'>
      <a href='#' class='text-reset mx-2'><i class='bi-github'></i></a>
      <a href='#' class='text-reset' @click='openInfo()'><i class='bi-question-circle-fill'></i></a>
    </div>
  </div>

  <info-modal ref='infoModal' />
</template>

<script>
import InfoModal from './InfoModal';

export default {
  name: 'Navbar',
  components: {
    InfoModal
  },
  methods: {
    openInfo() {
      this.$refs.infoModal.toggle()
    }
  }
}
</script>


<style scoped>

.bar {
  height: 60px;
  border-bottom: 1px solid #eee;
}

</style>