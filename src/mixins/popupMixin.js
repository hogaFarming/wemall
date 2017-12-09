export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onVisibleChange (visible) {
      this.$emit('visible-change', visible)
    },
    close () {
      this.$emit('visible-change', false)
    }
  }
}
