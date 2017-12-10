import utils from 'utils/common'

export const popupMixin = {
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

export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        /* 默认图片过滤 */
        thumbnail: utils.thumbnail,
        toThumbnail: utils.toThumbnail,
        /* 查看大图 */
        seeImg (imgUrl, arr) {
          utils.seeImg(imgUrl, arr || [imgUrl])
        }
      }
    })
  }
}
