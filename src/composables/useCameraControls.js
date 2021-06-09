import { onMounted, shallowRef } from 'vue';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const useCameraControls = (camera, viewport, onAnimate) => {
  const controls = shallowRef(null);

  const initCameraControls = () => {
    camera.value.position.x = 9.63787 * 0.75;
    camera.value.position.z = 7.74324 * 0.75;
    camera.value.position.y = 7.03379 * 0.75;

    camera.value.lookAt(new THREE.Vector3(0, 0, 0));
    controls.value = new OrbitControls(camera.value, viewport.value);
  }

  onAnimate(() => {
    controls.value.update();
  });

  onMounted(initCameraControls);

  return {
    controls,

    initCameraControls
  }
}

export default useCameraControls;