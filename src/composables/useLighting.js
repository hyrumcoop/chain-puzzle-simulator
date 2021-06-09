import { onMounted } from 'vue';
import * as THREE from 'three';

const useLighting = scene => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);

  dirLight.position.set(0, 10, 5);
  dirLight.target.position.set(-5, 0, 0);

  const initLighting = () => {
    scene.value.add(ambientLight);
    scene.value.add(dirLight);
    scene.value.add(dirLight.target);
  }

  onMounted(initLighting);
  
  return {
    initLighting
  }
}

export default useLighting;