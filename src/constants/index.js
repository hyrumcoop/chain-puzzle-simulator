import * as THREE from 'three';

import { Operations, InverseOperations, OperationMappings } from './operations';

export { Operations, InverseOperations, OperationMappings };

export const MARBLE_COLORS = [
  0xf44336,
  0xffeb3b,
  0x4caf50,
  0x2196f3,
  0x9c27b0,
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

export const PlaybackMode = {
  FREE: 0, // user is in control
  DEMONSTRATION: 1, // simulator is in control
}