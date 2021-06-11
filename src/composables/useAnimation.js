import {
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS, 
  Operations,
  OperationMappings
} from '@/constants';

const useAnimation = (puzzle, chain, marbles) => {
  const { chainRight, chainSymmetric } = chain;
  chainSymmetric.value = puzzle.value.symmetric; // set physical chain state to equal puzzle state

  const curMappings = () => {
    return chainSymmetric.value ? OperationMappings.Symmetric : OperationMappings.Asymmetric;
  }

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
    const positions = chainSymmetric.value ? SYMMETRIC_MARBLE_POSITIONS : ASYMMETRIC_MARBLE_POSITIONS;

    marbles.value.forEach((marble, i) => {
      const pos = positions[i];

      marble.position.x = pos.x;
      marble.position.y = pos.y;
      marble.position.z = pos.z;
    });
  }

  const updateChainOrientation = () => {
    if (chainSymmetric.value) {
      chainRight.value.rotation.x = 0;
    } else {
      chainRight.value.rotation.x = Math.PI / 2;
    }
  }

  const innerShift = () => {
    mapMarbles(curMappings()[Operations.INNER_SHIFT]);
    updateMarblePositions();
  }

  const inverseInnerShift = () => {
    mapMarbles(curMappings()[Operations.INVERSE_INNER_SHIFT]);
    updateMarblePositions();
  }

  const outerShift = () => {
    mapMarbles(curMappings()[Operations.OUTER_SHIFT]);
    updateMarblePositions();
  }

  const inverseOuterShift = () => {
    mapMarbles(curMappings()[Operations.INVERSE_OUTER_SHIFT]);
    updateMarblePositions();
  }

  const rotate = () => {
    mapMarbles(curMappings()[Operations.ROTATE]);

    chainSymmetric.value = !chainSymmetric.value;
    updateChainOrientation();
    updateMarblePositions();
  }

  const inverseRotate = () => {
    mapMarbles(curMappings()[Operations.INVERSE_ROTATE]);

    chainSymmetric.value = !chainSymmetric.value;
    updateChainOrientation();
    updateMarblePositions();
  }

  chain.onChainLoad(updateChainOrientation);
  puzzle.value.onTransform(transform);

  return {}
}

export default useAnimation;