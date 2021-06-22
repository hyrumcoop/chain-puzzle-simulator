import { onMounted } from 'vue';
import * as THREE from 'three';

const useLighting = scene => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);

  keyLight.position.set(10, 10, 10);
  fillLight.position.set(-10, -10, 10);
  rimLight.position.set(0, -2, -10);

  const initLighting = () => {
    scene.value.add(ambientLight);

    [keyLight, fillLight, rimLight].forEach(light => {
      light.target.position.set(0, 0, 0);
      scene.value.add(light);
    });
  }

  onMounted(initLighting);
  
  return {
    initLighting
  }
}

export default useLighting;