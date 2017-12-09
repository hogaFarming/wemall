<template>
  <mt-popup class="x-modal" :value="value" @input="visibleChange">
    <div class="x-modal-inner">
      <div class="x-modal-content">
        <slot></slot>
      </div>
      <x-button class="x-modal-confirm" v-if="confirmText" @click.native="onConfirm" type="primary" size="full" pill>{{ confirmText }}</x-button>
      <x-icon class="x-modal-close" type="close" @click.native="onCancel"></x-icon>
    </div>
  </mt-popup>
</template>

<script>
  export default {
    name: 'x-modal',
    props: ['value', 'confirmText'],
    methods: {
      visibleChange (value) {
        if (!value) this.$emit('cancel')
      },
      onConfirm () {
        this.$emit('confirm')
      },
      onCancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style>
  .x-modal {
    width: 8.8rem;
    border-radius: 10px;
  }
  .x-modal-inner {
    padding: 0.64rem 0.53rem;
  }
  .x-modal-confirm {
    margin-top: 0.4rem;
  }
  .x-modal-close {
    position: absolute;
    top: 0.64rem;
    right: 0.53rem;
  }
</style>
