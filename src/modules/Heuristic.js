
const countContiguousGroups = marbles => {
  let end = marbles.length - 1;

  while (marbles[end] == marbles[0]) {
    end--;
  }

  let groups = 1;
  for (let i = 1; i <= end; i++) {
    if (marbles[i] != marbles[i - 1]) {
      groups++
    }
  }

  return groups;
}

const Heuristic = {
  ContiguousGroups(puzzle) {
    if (puzzle.symmetric) {
      return countContiguousGroups(puzzle.marbles.slice(0, 18)) + countContiguousGroups(puzzle.marbles.slice(18));
    } else {
      return countContiguousGroups(puzzle.marbles.slice(0, 15)) + countContiguousGroups(puzzle.marbles.slice(15));
    }
  }
}

export default Heuristic;