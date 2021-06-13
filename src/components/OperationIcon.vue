<template>
  <div
    class='op-icon'
    :class='opClass'
  >{{ opText }}</div>
</template>

<script>
import { Operations } from '@/constants';
import { Tooltip } from 'bootstrap';

const OperationClass = {
  [Operations.ROTATE]: 'rotate',
  [Operations.INNER_SHIFT]: 'inner-shift',
  [Operations.OUTER_SHIFT]: 'outer-shift',
  [Operations.INVERSE_ROTATE]: 'inv-rotate',
  [Operations.INVERSE_INNER_SHIFT]: 'inv-inner-shift',
  [Operations.INVERSE_OUTER_SHIFT]: 'inv-outer-shift'
}

const OperationText = {
  [Operations.ROTATE]: 'R',
  [Operations.INNER_SHIFT]: 'I',
  [Operations.OUTER_SHIFT]: 'O',
  [Operations.INVERSE_ROTATE]: ' R`',
  [Operations.INVERSE_INNER_SHIFT]: ' I`',
  [Operations.INVERSE_OUTER_SHIFT]: ' O`'
}

const OperationTooltip = {
  [Operations.ROTATE]: 'Rotate',
  [Operations.INNER_SHIFT]: 'Inner Shift',
  [Operations.OUTER_SHIFT]: 'Outer Shift',
  [Operations.INVERSE_ROTATE]: 'Inverse Rotate',
  [Operations.INVERSE_INNER_SHIFT]: 'Inverse Inner Shift',
  [Operations.INVERSE_OUTER_SHIFT]: 'Inverse Outer Shift'
}

export default {
  name: 'OperationIcon',
  props: {
    op: Number,
    selected: Boolean
  },
  mounted() {
    new Tooltip(this.$el, {
      title: OperationTooltip[this.op]
    });
  },
  computed: {
    opClass() {
      return {
        [OperationClass[this.op]]: true,
        selected: this.selected
      }
    },
    opText() {
      return OperationText[this.op];
    }
  }
}
</script>


<style scoped>

.op-icon {
  display: flex;

  width: 40px;
  height: 40px;

  min-width: 40px;
  min-height: 40px;

  margin-right: 4px;

  justify-content: center;
  align-items: center;

  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;

  font-weight: 900;
  color: #424242;

  transition: background-color 0.4 ease;
  cursor: pointer;
}

.selected {
  background-color: #2e7d32;
  color: white;
  border-color: #005005;
}

.op-icon:hover {
  background-color: #fafafa;
}

.rotate, .inv-rotate {
  border-radius: 20px;
}

.inv-rotate, .inv-inner-shift, .inv-outer-shift {
  white-space: pre;
}

</style>