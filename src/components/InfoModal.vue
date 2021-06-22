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
            It's awesome!
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