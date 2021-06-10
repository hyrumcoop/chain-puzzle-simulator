import { onMounted } from 'vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const useChain = (scene) => {
  const loader = new GLTFLoader();
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00});

  const initChain = async () => {
    const loadedData = await loader.loadAsync('./chain.glb');
    const chainGeometry = loadedData.scene.children[0].geometry;

    const chainLeft = new THREE.Mesh(chainGeometry, material);
    const chainRight = new THREE.Mesh(chainGeometry, material);

    chainRight.rotation.y = Math.PI;

    const symmetric = true; // TODO: puzzle state value

    if (!symmetric) {
      chainRight.rotation.x = Math.PI / 2;
    }

    scene.value.add(chainLeft);
    scene.value.add(chainRight);
  }

  onMounted(initChain);

  return {
    initChain
  }
}

export default useChain;