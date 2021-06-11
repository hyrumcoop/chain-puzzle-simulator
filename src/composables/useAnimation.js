import {
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS, 
  Operations
} from '@/constants';

const useAnimation = (puzzle, chain, marbles) => {
  let symmetric = false; // TODO: get from puzzle state

  const transform = op => {
    switch(op) {
      case Operations.ROTATE:
        return rotate();
      case Operations.INNER_SHIFT:
        return innerShift();
      case Operations.OUTER_SHIFT:
        return outerShift();
      case Operations.INVERSE_ROTATE:
        return inverseRotate();
      case Operations.INVERSE_INNER_SHIFT:
        return inverseInnerShift();
      case Operations.INVERSE_OUTER_SHIFT:
        return inverseOuterShift();
    }
  }

  const mapMarbles = mapping => {
    const temp = marbles.value.slice(0);

    for (let i = 0; i < 30; i++) {
      marbles.value[i] = temp[mapping[i]]
    }
  }

  const updateMarblePositions = () => {
    const positions = symmetric ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;

    marbles.value.forEach((marble, i) => {
      const pos = positions[i];

      marble.position.x = pos.x;
      marble.position.y = pos.y;
      marble.position.z = pos.z;
    });
  }

  const updateChainOrientation = () => {
    if (symmetric) {
      chain.chainRight.value.rotation.x = 0;
    } else {
      chain.chainRight.value.rotation.x = Math.PI / 2;
    }
  }

  const innerShift = () => {
    if (symmetric) {
      mapMarbles([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
      ]);
    } else {
      mapMarbles([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
      ]);
    }

    updateMarblePositions();
  }

  const inverseInnerShift = () => {
    if (symmetric) {
      mapMarbles([
        17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
      ]);
    } else {
      mapMarbles([
        14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
      ]);
    }

    updateMarblePositions();
  }

  const outerShift = () => {
    if (symmetric) {
      mapMarbles([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        29, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
      ]);
    } else {
      mapMarbles([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        29, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
      ]);
    }

    updateMarblePositions();
  }

  const inverseOuterShift = () => {
    if (symmetric) {
      mapMarbles([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 18
      ]);
    } else {
      mapMarbles([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 15
      ]);
    }

    updateMarblePositions();
  }

  const rotate = () => {
    if (symmetric) {
      mapMarbles([
        23, 22, 21, 20, 19, 18, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 24, 25, 26, 27, 28, 29
      ])
    } else {
      mapMarbles([
        23, 22, 21, 20, 19, 18, 17, 16, 15, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 0, 1, 2, 3, 4, 5, 24, 25, 26, 27, 28, 29
      ])
    }

    symmetric = !symmetric;
    updateChainOrientation();
    updateMarblePositions();
  }

  const inverseRotate = () => {
    if (symmetric) {
      mapMarbles([
        18, 19, 20, 21, 22, 23, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        8, 7, 6, 5, 4, 3, 2, 1, 0, 24, 25, 26, 27, 28, 29,
      ])
    } else {
      mapMarbles([
        15, 16, 17, 18, 19, 20, 21, 22, 23, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 5, 4, 3, 2, 1, 0, 24, 25, 26, 27, 28, 29,
      ])
    }

    symmetric = !symmetric;
    updateChainOrientation();
    updateMarblePositions();
  }

  puzzle.value.onTransform(transform);

  return {
    transform,

    innerShift,
    inverseInnerShift,

    outerShift,
    inverseOuterShift,

    rotate,
    inverseRotate
  }
}

export default useAnimation;