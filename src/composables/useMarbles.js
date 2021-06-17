import { onMounted, shallowRef } from 'vue';
import * as THREE from 'three';

import {
  MARBLE_COLORS,
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS
} from '@/constants';

const MARKER_MARBLE_COLOR = 0xffffff;
const MARKER_MARBLE_OPACITY = 0.6;

const useMarbles = (scene, puzzle) => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const materials = [];

  for (let color of MARBLE_COLORS) {
    materials.push(new THREE.MeshStandardMaterial({color, roughness: 0.05}))
  }

  const marbles = shallowRef([]);
  const markerMarble = shallowRef(null);

  const markerMaterial = new THREE.MeshStandardMaterial({color: MARKER_MARBLE_COLOR, roughness: 0.05});
  markerMaterial.transparent = true;
  markerMaterial.opacity = MARKER_MARBLE_OPACITY;

  markerMarble.value = new THREE.Mesh(geometry, markerMaterial);

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

  const clearMarbles = () => {
    marbles.value.forEach(marble => {
      scene.value.remove(marble);
    });
  }

  const setMarkerVisibility = isVisible => {
    if (isVisible) {
      scene.value.add(markerMarble.value);
    } else {
      scene.value.remove(markerMarble.value);
    }
  }

  const initMarbles = () => {
    setMarbleOrientation(puzzle.value.symmetric, puzzle.value.marbles);
  }

  onMounted(initMarbles);
  puzzle.value.onReset(initMarbles);

  return {
    marbles,
    markerMarble,

    initMarbles,
    setMarbleOrientation,
    clearMarbles,
    setMarkerVisibility
  }
}

export default useMarbles;