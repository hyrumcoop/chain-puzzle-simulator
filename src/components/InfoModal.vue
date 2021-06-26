<template>
  <div class='modal fade' tabindex='-1'>
    <div class='modal-dialog modal-lg'>
      <div class='modal-content'>
        <div class='modal-header'>
          <h5 class='modal-title'>Info</h5>
          <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
        </div>
        <div class='modal-body'>
          <faq-question
            question='What is this?'
            :show='selectedQuestion == 0'
            @select='selectQuestion(0)'
          >
            <p>
              The <a href='https://www.myminifactory.com/users/makeanything' target='_blank'>Chain Puzzle</a>
              is a puzzle designed by <a href='https://www.devinmontes.com/' target='_blank'>Devin Montes</a>
              and can be purchased at his <a href='https://www.myminifactory.com/users/makeanything' target='_blank'>
              store</a> or can be 3D printed using the models on
              <a href='https://www.myminifactory.com/object/3d-print-the-chain-puzzle-razor-118798' target='_blank'>
              MyMiniFactory</a>. The puzzle consists of two inter-looping tracks which hold 30 marbles that mix up
              when you twist the halves into alternating positions. In a “symmetric” position, there is
              a large 18 marble track looping around a smaller 12 marble track, while in the
              “asymmetric” position there are two 15 marble tracks locked together. Rotate the two halves
              of the puzzle and shift the marbles along their tracks until all like colors touch.
            </p>

            <p>This simulator was developed independently by <a href='https://github.com/hyrumcoop' target='_blank'>
            Hyrum Cooper</a> who can be reached at <a href='mailto:hyrumcoop@gmail.com'>hyrumcoop@gmail.com.</a></p>
          </faq-question>

          <faq-question
            question='How does the simulator work?'
            :show='selectedQuestion == 1'
            @select='selectQuestion(1)'
          >
            <p>
              The simulator uses a heuristic-guided graph traversal algorithm known as the
              <a href='https://en.wikipedia.org/wiki/A*_search_algorithm' target='_blank'>A* search
              algorithm</a> to solve the puzzle. It begins at a node representing the starting puzzle
              state and expands it by creating a new node for each puzzle state that is one
              transformation away from the parent node. The algorithm then uses a heuristic to judge
              the favorability of each new puzzle state, chooses the most favorable node from the graph,
              and continues the process of expanding until it reaches a solved state.
            </p>

            <p>
              The heuristic used by the simulator assesses the number of contiguous groups of color in
              the puzzle. A puzzle state with a lower score is a more favorable state than one with a
              higher score. For example, when the puzzle is solved, there are 6 groups of contiguous
              color (1 for each color), the highest score the heuristic can give. When each marble in the
              chain is different from the ones next to it (seemingly very scrambled), there are 30
              contiguous groups, one for each marble. The intuition driving the heuristic is that the
              puzzle seems to be closer to being solved when the number of contiguous groups are low,
              and that it seems to be far away from being solved when this number is large. A brief
              statistical analysis has shown that this correlation does exist, but it’s not perfect and
              the heuristic will often overestimate or underestimate.
            </p>

            <p>
              Because the heuristic often overestimates the favorability of certain chain states, the
              algorithm rarely finds the most efficient solution on its first pass. To improve the
              efficiency of the solutions generated, the algorithm is capped at a certain depth (a depth
              of 100 nodes was picked arbitrarily for the first pass) and run iteratively. When a solution
              is found, the algorithm repeats, this time with a depth capped lower than the solution below
              it. While this approach works, there is no way to guarantee that the algorithm has reached
              the best solution. A better solution would be to design a “consistent heuristic”, a heuristic
              never overestimates the favorability of a position. Achieving this would likely require a
              deeper mathematical analysis of the chain puzzle.
            </p>
          </faq-question>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import FaqQuestion from './FaqQuestion';

export default {
  name: 'InfoModal',
  components: {
    FaqQuestion
  },
  data() {
    return {
      modal: null,
      selectedQuestion: -1,
    }
  },
  mounted() {
    this.modal = new Modal(this.$el);
  },
  methods: {
    toggle() {
      this.modal.toggle()
    },
    selectQuestion(questionNo) {
      if (questionNo == this.selectedQuestion) {
        this.selectedQuestion = -1;
      } else {
        this.selectedQuestion = questionNo;
      }
    }
  }
}
</script>


<style scoped>

</style>