import { onMounted, ref, shallowRef } from 'vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const useChain = (scene) => {
  const loader = new GLTFLoader();
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00});

  const chainLeft = shallowRef(null);
  const chainRight = shallowRef(null);

  const chainSymmetric = ref(false);

  const loadListeners = [];
  const onChainLoad = func => loadListeners.push(func);

  const initChain = async () => {
    const loadedData = await loader.loadAsync('./chain.glb');
    const chainGeometry = loadedData.scene.children[0].geometry;

    chainLeft.value = new THREE.Mesh(chainGeometry, material);
    chainRight.value = new THREE.Mesh(chainGeometry, material);

    chainRight.value.rotation.y = Math.PI;

    scene.value.add(chainLeft.value);
    scene.value.add(chainRight.value);

    loadListeners.forEach(func => func());
  }

  onMounted(initChain);

  return {
    chainLeft,
    chainRight,
    chainSymmetric,

    initChain,
    onChainLoad
  }
}

export default useChain;