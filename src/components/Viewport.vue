<template>
  <div ref='viewport'></div>
</template>

<script>
import useRenderer from '@/composables/useRenderer';
import useCameraControls from '@/composables/useCameraControls';
import useLighting from '@/composables/useLighting';
import useChain from '@/composables/useChain';
import useMarbles from '@/composables/useMarbles';

export default {
  setup() {
    const renderer = useRenderer();
    const cameraControls = useCameraControls(renderer.camera, renderer.viewport, renderer.onAnimate);
    const lighting = useLighting(renderer.scene);
    const chain = useChain(renderer.scene);
    const marbles = useMarbles(renderer.scene);
    
    return {
      ...renderer,
      ...cameraControls,
      ...lighting,
      ...chain,
      ...marbles
    };
  },
  mounted() {
    this.animate();
  }
}
</script>

<style scoped>

div {
  height: 100%;
}

</style>