<template>
  <x-cell class="x-field">
    <div class="x-field-inner">
      <span class="x-field-label" v-if="label">{{ label }}</span>
      <span class="x-field-label" v-if="iconLabel">
        <x-icon :type="iconLabel" style="width: 0.58rem;height: 0.64rem;"></x-icon>
      </span>
      <input
        class="x-field-input"
        :value="value"
        :type="type || 'text'"
        @input="$emit('input', $event.target.value)"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled">
      <div class="x-field-extra">
        <slot name="extra"></slot>
      </div>
    </div>
  </x-cell>
</template>

<script>
  export default {
    name: 'x-field',
    props: {
      type: String,
      label: String,
      iconLabel: String,
      value: [String, Number],
      placeholder: String,
      maxlength: String,
      readonly: Boolean,
      disabled: Boolean
    }
  }
</script>

<style>
  .x-field-inner {
    display: -webkit-box;
    display: flex;
    align-items: center;
  }
  .x-field-label {
    flex: none;
    margin-right: 10px;
  }
  .x-field-input {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    flex: 1;
    outline: 0;
    font-size: inherit;
    width: 100%;
    background-color: transparent;
  }
</style>
