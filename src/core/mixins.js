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

export const scrollListMixin = {
  data () {
    return {
      nextPage: '',
      list: [],
      total: 0
    }
  },
  computed: {
    infiniteScrollDisabled () {
      return !this.nextPage
    }
  },
  methods: {
    loadMore () {
      this.queryList(this.nextPage)
    },
    setListData (list) {
      if (list.current_page === 1) {
        this.list = list.data
      } else {
        this.list = this.list.concat(list.data)
      }
      this.total = list.total
      this.nextPage = list.next_page_url
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        routeQueryId (key) {
          const val = this.$route.query[key]
          if (!val) return undefined
          if (val === 'null' || val === 'undefined') return undefined
          return +val
        },
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
