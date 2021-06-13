import { ref } from 'vue';

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

      await next();
      recursivePlay();
    };

    recursivePlay();
  }

  const pause = async () => {
    playing = false;
    await animation.cancelAnimation();
  }

  const stop = async () => {
    playbackMode.value = PlaybackMode.FREE;
    playbackQueue.value = [];
    playing = false;

    await animation.cancelAnimation();
  }

  const next = async () => {
    if (playbackMode.value == PlaybackMode.FREE || playbackQueueIndex.value >= playbackQueue.value.length) return;

    const op = playbackQueue.value[playbackQueueIndex.value++];
    puzzle.value.transform(op);
      
    const promise = animation.animateOperation(op);
    animation.transform(op);

    await promise;
  }

  return {
    playbackQueue,
    playbackQueueIndex,
    playbackMode,

    pushOperation,
    setSequence,

    play,
    pause,
    stop,
    next
  }
}

export default usePlayback;