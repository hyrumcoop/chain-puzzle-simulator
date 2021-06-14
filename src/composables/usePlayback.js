import { ref } from 'vue';

import { InverseOperations, PlaybackMode } from '@/constants';

const DEFAULT_SPEED = 0.25;

const usePlayback = (puzzle, animation) => {
  const playbackQueue = ref([]);
  const playbackQueueIndex = ref(0);
  const playbackMode = ref(PlaybackMode.FREE);
  const playing = ref(false);
  const speed = ref(DEFAULT_SPEED);

  // enters an out-of-sequence input, such as a user input
  const pushOperation = async op => {
    if (playbackMode.value == PlaybackMode.DEMONSTRATION) {
      if (playing.value) {
        return await pause(); // pause playback but ignore move
      } else {
        await stop(); // stop playback and perform move
      }
    }
    
    puzzle.value.transform(op);
    
    await animation.cancelAnimation();
    animation.animateOperation(op, speed.value);
    animation.transform(op);
  }

  const setSequence = async sequence => {
    // TODO: validation

    await pause();

    playbackQueue.value = sequence.slice(0);
    playbackQueueIndex.value = 0;
    playbackMode.value = PlaybackMode.DEMONSTRATION;
  }

  const play = () => {
    if (playbackMode.value == PlaybackMode.FREE || playing.value) return;

    playing.value = true;

    const recursivePlay = async () => {
      if (!playing.value) return;
      if (playbackQueueIndex.value >= playbackQueue.value.length) return pause();

      await internalNext();
      recursivePlay();
    };

    recursivePlay();
  }

  const pause = async () => {
    playing.value = false;
    await animation.cancelAnimation();
  }

  const togglePlay = async () => {
    if (playing.value) {
      await pause()
    } else {
      await play()
    }
  }

  const stop = async () => {
    playbackMode.value = PlaybackMode.FREE;
    playbackQueue.value = [];
    playing.value = false;

    await animation.cancelAnimation();
  }

  // only safe to call from within this composable
  const internalNext  = async () => {
    if (playbackMode.value == PlaybackMode.FREE || playbackQueueIndex.value >= playbackQueue.value.length) return;

    const op = playbackQueue.value[playbackQueueIndex.value++];
    puzzle.value.transform(op);

    await animation.cancelAnimation();
      
    const promise = animation.animateOperation(op, speed.value);
    animation.transform(op);

    await promise;
  }

  // safe to call from outside
  const next = async () => {
    if (playing.value) return;
    await internalNext();
  }

  const prev = async () => {
    if (playbackMode.value == PlaybackMode.FREE || playbackQueueIndex.value <= 0) return;
    if (playing.value) return await pause();
    
    const op = InverseOperations[playbackQueue.value[--playbackQueueIndex.value]];
    puzzle.value.transform(op);

    await animation.cancelAnimation();

    const promise = animation.animateOperation(op, speed.value);
    animation.transform(op);

    await promise;
  }

  const setSpeed = newSpeed => {
    speed.value = newSpeed;
  }

  return {
    playbackQueue,
    playbackQueueIndex,
    playbackMode,
    playing,
    speed,

    pushOperation,
    setPlaybackSequence: setSequence,

    play,
    pause,
    togglePlay,
    stop,
    next,
    prev,

    setSpeed
  }
}

export default usePlayback;