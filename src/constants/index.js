import * as THREE from 'three';

export const Operations = {
  ROTATE: 0,
  INNER_SHIFT: 1,
  OUTER_SHIFT: 2,
  INVERSE_ROTATE: 3,
  INVERSE_INNER_SHIFT: 4,
  INVERSE_OUTER_SHIFT: 5,
}

export const MARBLE_COLORS = [
  0xff0000,
  0xffff00,
  0x00ff00,
  0x0000ff,
  0xff00ff,
  0xff69b4
]

export const SYMMETRIC_MARBLE_POSITIONS = [
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

export const ASYMMETRIC_MARBLE_POSITIONS = [
  new THREE.Vector3(0.5, 0, 1.36),
  new THREE.Vector3(1.4611, 0, 1.2296),
  new THREE.Vector3(2.145, 0, 0.5),
  new THREE.Vector3(2.145, 0, -0.5),
  new THREE.Vector3(1.4611, 0, -1.2296),
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
  new THREE.Vector3(1.5, 1.36, 0),
  new THREE.Vector3(2.5, 1.36, 0),
  new THREE.Vector3(3.368, 0.918, 0),
  new THREE.Vector3(3.725, 0, 0),
  new THREE.Vector3(3.368, -0.918, 0),
  new THREE.Vector3(2.5, -1.36, 0),
  new THREE.Vector3(1.5, -1.36, 0),
  new THREE.Vector3(0.5, -1.36, 0),

  new THREE.Vector3(-0.5, -1.36, 0),
  new THREE.Vector3(-1.4611, -1.2296, 0),
  new THREE.Vector3(-2.145, -0.5, 0),
  new THREE.Vector3(-2.145, 0.5, 0),
  new THREE.Vector3(-1.4611, 1.2296, 0),
  new THREE.Vector3(-0.5, 1.36, 0),
]