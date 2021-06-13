import { ref } from 'vue';

import { InverseOperations } from '@/constants';

const PlaybackMode = {
  FREE: 0, // user is in control
  DEMONSTRATION: 1, // simulator is in control
}

const usePlayback = (puzzle, animation) => {
  let playbackQueue = ref([]);
  let playbackQueueIndex = ref(0);
  let playbackMode = ref(PlaybackMode.FREE);
  let playing = false;

  // enters an out-of-sequence input, such as a user input
  const pushOperation = async op => {
    if (playbackMode.value == PlaybackMode.DEMONSTRATION) {
      if (playing) {
        return await pause(); // pause playback but ignore move
      } else {
        await stop(); // stop playback and perform move
      }
    }
    
    puzzle.value.transform(op);
    
    await animation.cancelAnimation();
    animation.animateOperation(op);
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
    if (playbackMode.value == PlaybackMode.FREE || playing) return;

    playing = true;

    const recursivePlay = async () => {
      if (!playing) return;
      if (playbackQueueIndex.value >= playbackQueue.value.length) return pause();

      await internalNext();
      recursivePlay();
    };

    recursivePlay();
  }

  const pause = async () => {
    playing = false;
    await animation.cancelAnimation();
  }

  const togglePlay = async () => {
    if (playing) {
      await pause()
    } else {
      await play()
    }
  }

  const stop = async () => {
    playbackMode.value = PlaybackMode.FREE;
    playbackQueue.value = [];
    playing = false;

    await animation.cancelAnimation();
  }

  // only safe to call from within this composable
  const internalNext  = async () => {
    if (playbackMode.value == PlaybackMode.FREE || playbackQueueIndex.value >= playbackQueue.value.length) return;

    const op = playbackQueue.value[playbackQueueIndex.value++];
    puzzle.value.transform(op);

    await animation.cancelAnimation();
      
    const promise = animation.animateOperation(op);
    animation.transform(op);

    await promise;
  }

  // safe to call from outside
  const next = async () => {
    if (playing) return;
    await internalNext();
  }

  const prev = async () => {
    if (playbackMode.value == PlaybackMode.FREE || playbackQueueIndex.value <= 0) return;
    if (playing) return await pause();
    
    const op = InverseOperations[playbackQueue.value[--playbackQueueIndex.value]];
    puzzle.value.transform(op);

    await animation.cancelAnimation();

    const promise = animation.animateOperation(op);
    animation.transform(op);

    await promise;
  }

  return {
    playbackQueue,
    playbackQueueIndex,
    playbackMode,

    pushOperation,
    setPlaybackSequence: setSequence,

    play,
    pause,
    togglePlay,
    stop,
    next,
    prev
  }
}

export default usePlayback;