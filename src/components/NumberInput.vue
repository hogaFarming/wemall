<template>
  <div class="number-input" :class="{'number-input--disabled': disabled}">
    <span
      class="number-input-op"
      :class="{ disabled: isMin }"
      @click="add(-1)">
      -
    </span>
    <span class="number-input-num">{{ displayValue }}</span>
    <span
      class="number-input-op"
      :class="{ disabled: isMax }"
      @click="add(1)">
      +
    </span>
  </div>
</template>
<script>
  export default {
    name: 'x-number-input',
    props: {
      value: [Number, String],
      min: [Number, String],
      max: [Number, String],
      disabled: Boolean
    },
    computed: {
      displayValue () {
        const num = parseInt(this.value, 10)
        return isNaN(num) ? 0 : num
      },
      isMin () {
        return this.value <= (this.min || 1)
      },
      isMax () {
        return this.max ? (this.value >= this.max) : false
      }
    },
    methods: {
      add (num) {
        if (this.disabled) return false
        if (num < 0 && this.isMin) return false
        if (num > 0 && this.isMax) return false
        const result = parseInt(this.value + num, 10)
        const newValue = isNaN(result) ? 0 : result
        this.$emit('input', newValue)
      }
    }
  }
</script>
<style>
  .number-input {
    display: inline-block;
    position: relative;
    padding: 0 0.83rem;
    line-height: 0.6933rem;
    height: 0.6933rem;
  }
  .number-input span {
    text-align: center;
    display: block;
  }
  .number-input-num {
    color: #333333;
    background-color: #eaeaea;
    min-width: 0.8rem;
  }
  .number-input-op {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0.8rem;
    color: #999999;
    background-color: #eaeaea;
  }
  .number-input-op:first-child {
    left: 0;
  }
  .number-input-op:last-child {
    right: 0;
  }
  .number-input-op.disabled {
    background-color: #f4f4f4;
    color: #dddddd;
  }
  .number-input--disabled .number-input-op,
  .number-input--disabled .number-input-num {
    background-color: #f4f4f4;
    color: #dddddd;
  }
</style>
