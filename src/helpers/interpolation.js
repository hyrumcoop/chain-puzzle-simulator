import * as THREE from 'three';

import { Operations, OperationMappings, ASYMMETRIC_MARBLE_POSITIONS } from '@/constants';
import { SYMMETRIC_MARBLE_POSITIONS } from '../constants';

// indices of marbles that physically move during rotation
// (excludes marbles that change indices but remain stationary)
const SYMMETRIC_ROTATE_MOVERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23];
const ASYMMETRIC_ROTATE_MOVERS = [0, 1, 2, 3, 4, 5, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export const lerp = (start, end) => pos => {
  return start.clone().add(end.clone().sub(start).multiplyScalar(pos));
}

export const lerpEuler = (start, end) => pos => {
  return new THREE.Euler(
    start.x + (end.x - start.x) * pos,
    start.y + (end.y - start.y) * pos,
    start.z + (end.z - start.z) * pos
  );
}

export const circleInterpolate = cw => start => {
  const radius = Math.max(Math.abs(start.y), Math.abs(start.z));
  let phi = 0;

  if (start.y == 0) {
    if (start.z > 0) {
      phi = 0;
    } else {
      phi = Math.PI;
    }
  } else {
    if (start.y > 0) {
      phi = Math.PI / 2;
    } else {
      phi = Math.PI * 3 / 2;
    }
  }

  return pos => {
    let theta = (pos * Math.PI / 2);
    if (!cw) theta = -theta;

    theta += phi;

    return new THREE.Vector3(
      start.x,
      Math.sin(theta) * radius,
      Math.cos(theta) * radius
    );
  }
}

export const OperationInterpolations = {
  Symmetric: {
    [Operations.ROTATE]: createRotateInterpolations(Operations.ROTATE, true),
    [Operations.INNER_SHIFT]: createShiftInterpolations(Operations.INNER_SHIFT, true),
    [Operations.OUTER_SHIFT]: createShiftInterpolations(Operations.OUTER_SHIFT, true),
    [Operations.INVERSE_ROTATE]: createRotateInterpolations(Operations.INVERSE_ROTATE, true),
    [Operations.INVERSE_INNER_SHIFT]: createShiftInterpolations(Operations.INVERSE_INNER_SHIFT, true),
    [Operations.INVERSE_OUTER_SHIFT]: createShiftInterpolations(Operations.INVERSE_OUTER_SHIFT, true),
  },
  Asymmetric: {
    [Operations.ROTATE]: createRotateInterpolations(Operations.ROTATE, false),
    [Operations.INNER_SHIFT]: createShiftInterpolations(Operations.INNER_SHIFT, false),
    [Operations.OUTER_SHIFT]: createShiftInterpolations(Operations.OUTER_SHIFT, false),
    [Operations.INVERSE_ROTATE]: createRotateInterpolations(Operations.INVERSE_ROTATE, false),
    [Operations.INVERSE_INNER_SHIFT]: createShiftInterpolations(Operations.INVERSE_INNER_SHIFT, false),
    [Operations.INVERSE_OUTER_SHIFT]: createShiftInterpolations(Operations.INVERSE_OUTER_SHIFT, false),
  }
};

export const ChainInterpolations = {
  Symmetric: {
    [Operations.ROTATE]: lerpEuler(new THREE.Euler(0, Math.PI, 0), new THREE.Euler(-Math.PI / 2, Math.PI, 0)),
    [Operations.INVERSE_ROTATE]: lerpEuler(new THREE.Euler(0, Math.PI, 0), new THREE.Euler(Math.PI / 2, Math.PI, 0))
  },
  Asymmetric: {
    [Operations.ROTATE]: lerpEuler(new THREE.Euler(Math.PI / 2, Math.PI, 0), new THREE.Euler(0, Math.PI, 0)),
    [Operations.INVERSE_ROTATE]: lerpEuler(new THREE.Euler(-Math.PI / 2, Math.PI, 0), new THREE.Euler(0, Math.PI, 0))
  }
}

function createShiftInterpolations(op, symmetric) {
  const interpolations = [];
  const mappings = symmetric ? OperationMappings.Symmetric : OperationMappings.Asymmetric;
  
  const fromPositions = symmetric ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;
  let toPositions;

  if (op == Operations.ROTATE || op == Operations.INVERSE_ROTATE) {
    toPositions = symmetric ? ASYMMETRIC_MARBLE_POSITIONS : SYMMETRIC_MARBLE_POSITIONS;
  } else {
    toPositions = fromPositions;
  }

  mappings[op].forEach((mapping, i) => {
    if (i == mapping) {
      interpolations[i] = null;
    }

    const start = fromPositions[mapping];
    const end = toPositions[i];

    interpolations[mapping] = lerp(start, end);
  });

  return interpolations;
}

function createRotateInterpolations(op, symmetric) {
  const mapping = (symmetric ? OperationMappings.Symmetric : OperationMappings.Asymmetric)[op];
  const movers = symmetric ? SYMMETRIC_ROTATE_MOVERS : ASYMMETRIC_ROTATE_MOVERS;
  const currier = circleInterpolate(op == Operations.ROTATE);
  const interpolations = [];

  const fromPositions = symmetric ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;
  const toPositions = symmetric ? ASYMMETRIC_MARBLE_POSITIONS : SYMMETRIC_MARBLE_POSITIONS;

  movers.forEach(idx => {
    const start = fromPositions[idx];
    const end = toPositions[mapping.find(n => n == idx)];

    interpolations[idx] = currier(start, end);
  });

  return interpolations;
}