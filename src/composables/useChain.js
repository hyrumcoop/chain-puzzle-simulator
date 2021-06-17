import { onMounted, ref, shallowRef } from 'vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const useChain = (scene, puzzle) => {
  const loader = new GLTFLoader();
  const materialLeft = new THREE.MeshLambertMaterial({color: 0xe0e0e0});
  const materialRight = new THREE.MeshLambertMaterial({color: 0x0d47a1});

  const chainLeft = shallowRef(null);
  const chainRight = shallowRef(null);

  const chainSymmetric = ref(puzzle.value.symmetric);

  const loadListeners = [];
  const onChainLoad = func => loadListeners.push(func);

  const initChain = async () => {
    const loadedData = await loader.loadAsync('./chain.glb');
    const chainGeometry = loadedData.scene.children[0].geometry;

    chainLeft.value = new THREE.Mesh(chainGeometry, materialLeft);
    chainRight.value = new THREE.Mesh(chainGeometry, materialRight);

    chainRight.value.rotation.y = Math.PI;

    updateChainOrientation();

    scene.value.add(chainLeft.value);
    scene.value.add(chainRight.value);

    loadListeners.forEach(func => func());
  }

  const updateChainOrientation = symmetric => {
    if (symmetric == null) symmetric = chainSymmetric.value; 

    if (symmetric) {
      chainRight.value.rotation.x = 0;
    } else {
      chainRight.value.rotation.x = Math.PI / 2;
    }
  }

  puzzle.value.onReset(() => {
    chainSymmetric.value = puzzle.value.symmetric;
    updateChainOrientation();
  })

  onMounted(initChain);

  return {
    chainLeft,
    chainRight,
    chainSymmetric,

    initChain,
    onChainLoad,
    updateChainOrientation
  }
}

export default useChain;