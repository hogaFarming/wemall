<template>
  <div class="x-textarea">
    <textarea
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)">
    </textarea>
  </div>
</template>
<script>
  export default {
    name: 'x-textarea',
    props: ['value', 'placeholder']
  }
</script>
<style>
  .x-textarea {
    padding: 0.1867rem 0.48rem;
    background-color: #ffffff;
  }
  .x-textarea textarea {
    width: 100%;
    border: none;
    resize: none;
    font-size: 14px;
    line-height: 20px;
    height: 100px;
  }
</style>
