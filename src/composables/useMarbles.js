import { onMounted, shallowRef } from 'vue';
import * as THREE from 'three';

import {
  MARBLE_COLORS,
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS
} from '@/constants';

const useMarbles = (scene, puzzle) => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const materials = [];

  for (let color of MARBLE_COLORS) {
    materials.push(new THREE.MeshStandardMaterial({color}))
  }

  const marbles = shallowRef([]);

  const setMarbleOrientation = (symmetric, order) => {
    const positions = symmetric ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;

    order.forEach((color, i) => {
      const pos = positions[i];
      const marble = new THREE.Mesh(geometry, materials[color]);

      marble.position.x = pos.x;
      marble.position.y = pos.y;
      marble.position.z = pos.z;

      if (marbles.value[i]) scene.value.remove(marbles.value[i]);

      scene.value.add(marble);
      marbles.value[i] = marble;
    });
  }

  const initMarbles = () => {
    setMarbleOrientation(puzzle.value.symmetric, puzzle.value.marbles);
  }

  onMounted(initMarbles);
  puzzle.value.onReset(initMarbles);

  return {
    marbles,

    initMarbles,
    setMarbleOrientation
  }
}

export default useMarbles;