import { onMounted, shallowRef } from 'vue';
import * as THREE from 'three';

import {
  MARBLE_COLORS,
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS
} from '@/constants';

const useMarbles = (scene) => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);

  const materials = [];
  const marbles = shallowRef([]);

  for (let color of MARBLE_COLORS) {
    materials.push(new THREE.MeshStandardMaterial({color}))
  }

  const symmetric = false; // TODO: use puzzle state value
  const positions = symmetric ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const marble = new THREE.Mesh(geometry, materials[Math.floor(i / 5)]);

    marble.position.x = pos.x;
    marble.position.y = pos.y;
    marble.position.z = pos.z;

    marbles.value.push(marble);
  }

  const initMarbles = () => {
    for (let marble of marbles.value) {
      scene.value.add(marble);
    }
  }

  onMounted(initMarbles);

  return {
    marbles,

    initMarbles
  }
}

export default useMarbles;