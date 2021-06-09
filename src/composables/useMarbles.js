import { onMounted } from 'vue';
import * as THREE from 'three';

const MARBLE_COLORS = [
  0xff0000,
  0xffff00,
  0x00ff00,
  0x0000ff,
  0xff00ff
]

const SYMMETRIC_MARBLE_POSITIONS = [
  new THREE.Vector3(0.5, 0, 1.36),
  new THREE.Vector3(1.5, 0, 1.36),
  new THREE.Vector3(2.5, 0, 1.36),
  new THREE.Vector3(3.368, 0, 0.918),
  new THREE.Vector3(3.725, 0, 0),
  new THREE.Vector3(3.368, 0, -0.918),
  new THREE.Vector3(2.5, 0, -1.36),
  new THREE.Vector3(1.5, 0, -1.36),
  new THREE.Vector3(0.5, 0, -1.36),
  new THREE.Vector3(-0.5, 0, -1.36),
  new THREE.Vector3(-1.5, 0, -1.36),
  new THREE.Vector3(-2.5, 0, -1.36),
  new THREE.Vector3(-3.368, 0, -0.918),
  new THREE.Vector3(-3.725, 0, 0),
  new THREE.Vector3(-3.368, 0, 0.918),
  new THREE.Vector3(-2.5, 0, 1.36),
  new THREE.Vector3(-1.5, 0, 1.36),
  new THREE.Vector3(-0.5, 0, 1.36),
  
  new THREE.Vector3(0.5, 1.36, 0),
  new THREE.Vector3(1.4611, 1.2296, 0),
  new THREE.Vector3(2.145, 0.5, 0),
  new THREE.Vector3(2.145, -0.5, 0),
  new THREE.Vector3(1.4611, -1.2296, 0),
  new THREE.Vector3(0.5, -1.36, 0),
  new THREE.Vector3(-0.5, -1.36, 0),
  new THREE.Vector3(-1.4611, -1.2296, 0),
  new THREE.Vector3(-2.145, -0.5, 0),
  new THREE.Vector3(-2.145, 0.5, 0),
  new THREE.Vector3(-1.4611, 1.2296, 0),
  new THREE.Vector3(-0.5, 1.36, 0),
]

const useMarbles = (scene) => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);

  const materials = [];
  const marbles = [];

  for (let color of MARBLE_COLORS) {
    materials.push(new THREE.MeshStandardMaterial({color}))
  }

  for (let i = 0; i < SYMMETRIC_MARBLE_POSITIONS.length; i++) {
    const pos = SYMMETRIC_MARBLE_POSITIONS[i];
    const marble = new THREE.Mesh(geometry, materials[Math.floor(i / 6)]);

    marble.position.x = pos.x;
    marble.position.y = pos.y;
    marble.position.z = pos.z;

    marbles.push(marble);
  }

  const initMarbles = () => {
    for (let marble of marbles) {
      scene.value.add(marble);
    }
  }

  onMounted(initMarbles);

  return {
    initMarbles
  }
}

export default useMarbles;