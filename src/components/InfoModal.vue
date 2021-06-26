<template>
  <div class='modal fade' tabindex='-1'>
    <div class='modal-dialog'>
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
            question='Where can I buy one?'
            :show='selectedQuestion == 1'
            @select='selectQuestion(1)'
          >
            Online!
          </faq-question>

          <faq-question
            question='How does the simulator work?'
            :show='selectedQuestion == 2'
            @select='selectQuestion(2)'
          >
            It's magic!
          </faq-question>

          <faq-question
            question='How can I contribute?'
            :show='selectedQuestion == 3'
            @select='selectQuestion(3)'
          >
            Github!
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