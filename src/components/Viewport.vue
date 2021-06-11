<template>
  <div class='d-flex flex-column'>
    <div ref='viewport' class='flex-grow-1'></div>
    
    <viewport-controls />
  </div>
</template>

<script>
import ViewportControls from './ViewportControls.vue';

import useRenderer from '@/composables/useRenderer';
import useCameraControls from '@/composables/useCameraControls';
import useLighting from '@/composables/useLighting';
import useChain from '@/composables/useChain';
import useMarbles from '@/composables/useMarbles';
import useAnimation from '@/composables/useAnimation';
import useKeyboard from '@/composables/useKeyboard';

export default {
  components: {
    ViewportControls
  },
  setup() {
    const renderer = useRenderer();
    const cameraControls = useCameraControls(renderer.camera, renderer.viewport, renderer.onAnimate);
    const lighting = useLighting(renderer.scene);
    const chain = useChain(renderer.scene);
    const marbles = useMarbles(renderer.scene);
    const animation = useAnimation(chain, marbles.marbles);

    useKeyboard(animation);
    
    return {
      ...renderer,
      ...cameraControls,
      ...lighting,
      ...chain,
      ...marbles,
      ...animation
    };
  },
  mounted() {
    this.animate();
  }
}
</script>

<style scoped>

</style>