import { onMounted, ref, shallowRef } from 'vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const CHAIN_LEFT_COLOR = 0xe0e0e0;
const CHAIN_RIGHT_COLOR = 0x0d47a1;

const useChain = (scene, puzzle) => {
  const loader = new GLTFLoader();
  const materialLeft = new THREE.MeshLambertMaterial({color: CHAIN_LEFT_COLOR});
  const materialRight = new THREE.MeshLambertMaterial({color: CHAIN_RIGHT_COLOR});

  const chainLeft = shallowRef(null);
  const chainRight = shallowRef(null);

  const chainSymmetric = ref(puzzle.value.symmetric);

  let chainTransparent = false;

  const loadListeners = [];
  const onChainLoad = func => loadListeners.push(func);

  const initChain = async () => {
    const loadedData = await loader.loadAsync('./chain.glb');
    const chainGeometry = loadedData.scene.children[0].geometry;

    chainLeft.value = new THREE.Mesh(chainGeometry, materialLeft);
    chainRight.value = new THREE.Mesh(chainGeometry, materialRight);

    chainRight.value.rotation.y = Math.PI;

    updateChainOrientation();
    setChainTransparent(false);

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

  const setChainTransparent = transparent => {
    chainTransparent = transparent;

    if (transparent) {
      [materialLeft, materialRight].forEach(mat => {
        mat.transparent = true;
        mat.color = new THREE.Color(0xffffff);
        mat.opacity = 0.4;
      });
    } else {
      [materialLeft, materialRight].forEach(mat => {
        mat.transparent = false;
        mat.opacity = 1;
      });

      materialLeft.color = new THREE.Color(CHAIN_LEFT_COLOR);
      materialRight.color = new THREE.Color(CHAIN_RIGHT_COLOR);
    }
  }

  const toggleChainTransparent = () => {
    setChainTransparent(!chainTransparent);
  }

  puzzle.value.onReset(() => {
    chainSymmetric.value = puzzle.value.symmetric;
    updateChainOrientation();
    setChainTransparent(false);
  })

  onMounted(initChain);

  return {
    chainLeft,
    chainRight,
    chainSymmetric,

    initChain,
    onChainLoad,
    updateChainOrientation,
    setChainTransparent,
    toggleChainTransparent
  }
}

export default useChain;