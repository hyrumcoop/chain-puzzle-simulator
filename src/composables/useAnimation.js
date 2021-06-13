import {
  SYMMETRIC_MARBLE_POSITIONS,
  ASYMMETRIC_MARBLE_POSITIONS, 
  Operations,
  OperationMappings
} from '@/constants';

import { OperationInterpolations, ChainInterpolations } from '@/helpers/interpolation';

import * as THREE from 'three';

const ANIMATION_DURATION = 0.25;

const useAnimation = (puzzle, chain, marbles, renderer) => {
  const { chainRight, chainSymmetric, updateChainOrientation } = chain;

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
  
  let animationPromise = null;
  let animateFunc = () => {};

  const cancelAnimation = async () => {
    if (animationPromise) {
      await animationPromise.cancel();
      updateMarblePositions();
      updateChainOrientation();
    }
  }

  const animateOperation = async (op, duration = ANIMATION_DURATION) => {
    const clock = new THREE.Clock();
    clock.start();

    let shouldCancel = false;

    const interpolations = (
      chainSymmetric.value ? OperationInterpolations.Symmetric : OperationInterpolations.Asymmetric
    )[op];

    let chainInterpolation = null;

    if (op == Operations.ROTATE || op == Operations.INVERSE_ROTATE) {
      chainInterpolation = (chainSymmetric.value ? ChainInterpolations.Symmetric : ChainInterpolations.Asymmetric)[op];
    }

    const animateMarbles = marbles.value.slice(0);

    animationPromise = new Promise(res => {
      animateFunc = () => {
        if (shouldCancel) {
          animationPromise = null;
          animateFunc = () => {};

          return res();
        }

        const elapsedTime = clock.getElapsedTime();
        const pos = Math.min(elapsedTime / duration, 1);

        interpolations.forEach((interpolation, i) => {
          if (!interpolation) return;

          animateMarbles[i].position.copy(interpolation(pos));
        });

        if (chainInterpolation) {
          chainRight.value.rotation.copy(chainInterpolation(pos));
        }

        if (elapsedTime >= duration) {
          animationPromise = null;
          animateFunc = () => {};

          res();
        }
      }
    });

    animationPromise.cancel = async function() {
      shouldCancel = true;
      await this;
    }

    return animationPromise;
  }

  // a somewhat hacky alternative to constantly registering and unregistering new render handlers
  renderer.onAnimate(() => animateFunc());
  
  return {
    cancelAnimation,
    animateOperation,
    transform
  }
}

export default useAnimation;