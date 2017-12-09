<template>
  <li class="x-field-item">
    <label class="x-field-label">
      {{ label }}:
    </label>
    <span class="x-field-value">
      <slot></slot>
    </span>
  </li>
</template>
<script>
  export default {
    name: 'x-field-item',
    props: ['label']
  }
</script>
<style>
  .x-field-item {
    padding: 0.2rem 0.48rem;
    background-color: #fff;
    font-size: 14px;
    line-height: 20px;
    display: flex;
  }
  .x-field-label {
    color: #9b9b9b;
    margin-right: 5px;
    white-space: nowrap;
  }
  /*.x-field-label::after {*/
    /*content: '：'*/
  /*}*/
  .x-field-value {
    color: #333333;
    flex: 1;
    word-break: break-all;
  }
</style>
