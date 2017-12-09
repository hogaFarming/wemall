<template>
  <button :class="buttonCls" :disabled="disabled"><slot></slot></button>
</template>
<script>
  export default {
    name: 'x-button',
    props: {
      type: String,
      size: String,
      pill: Boolean,
      disabled: Boolean,
      inline: Boolean,
      ghost: Boolean
    },
    computed: {
      buttonCls () {
        const prefix = name => ('x-button--' + name)
        return {
          'x-button': true,
          [prefix(this.size || 'medium')]: true,
          [prefix(this.type || 'normal')]: true,
          [prefix('pill')]: this.pill || false,
          [prefix('inline')]: this.inline || false,
          [prefix('ghost')]: this.ghost || false
        }
      }
    }
  }
</script>
<style>
  .x-button {
    display: block;
    font-size: 16px;
    text-align: center;
    line-height: 1.227rem;
    /*height: 1.227rem;*/
    color: inherit;
    border: none;
    width: auto;
    padding: 0 0.56rem;
  }
  .x-button--normal {
    color: #333333;
    background-color: #fff;
    border: 1px solid #cccccc;
  }
  .x-button--primary {
    background-color: #FFC935;
    color: #ffffff;
  }
  .x-button--danger {
    background-color: #F55B5B;
    color: #ffffff;
  }

  .x-button--pill {
    border-radius: 2.667rem;
  }

  .x-button--medium {

  }

  .x-button--full {
    width: 100%;
  }

  .x-button--inline {
    display: inline-block;
    padding: 0 0.37rem;
    line-height: 0.6933rem;
    min-width: 2rem;
    height: 0.6933rem;
    font-size: 12px;
    width: auto;
  }
  .x-button--inline:not(:last-of-type) {
    margin-right: 0.4rem;
  }

  .x-button--ghost {
    color: #333333;
    background-color: transparent;
    border: 1px solid #cccccc;
  }

  .x-button--ghost.x-button--primary {
    color: #FFC935;
    background-color: transparent;
    border: 1px solid #FFC935;
  }

  .x-button[disabled] {
    background-color: #cccccc;
  }
</style>
