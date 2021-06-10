import { onMounted, shallowRef } from 'vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const useChain = (scene) => {
  const loader = new GLTFLoader();
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00});

  const chainLeft = shallowRef(null);
  const chainRight = shallowRef(null);

  const initChain = async () => {
    const loadedData = await loader.loadAsync('./chain.glb');
    const chainGeometry = loadedData.scene.children[0].geometry;

    chainLeft.value = new THREE.Mesh(chainGeometry, material);
    chainRight.value = new THREE.Mesh(chainGeometry, material);

    chainRight.value.rotation.y = Math.PI;

    const symmetric = false; // TODO: puzzle state value

    if (!symmetric) {
      chainRight.value.rotation.x = Math.PI / 2;
    }

    scene.value.add(chainLeft.value);
    scene.value.add(chainRight.value);
  }

  onMounted(initChain);

  return {
    chainLeft,
    chainRight,

    initChain
  }
}

export default useChain;