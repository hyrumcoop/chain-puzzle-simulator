<template>
  <div class='d-flex flex-column h-100'>
    <Navbar />
    <Viewport class='flex-grow-1' />
  </div>
  
</template>

<script>
import Navbar from './components/Navbar';
import Viewport from './components/Viewport.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Viewport
  }
}
</script>

<style>

html, body, #app {
  width: 100%;
  height: 100%;

  margin: 0;
}

</style>
