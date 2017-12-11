<template>
  <div class="page product-comments-page">
    <template v-if="stats">
      <x-cell>好评度 <span v-html="goodsPercent"></span>%</x-cell>
      <div class="mod grade">
        <ul>
          <li>全部评价<br>({{ stats.count }})</li>
          <li>好评<br>({{ stats.good_colmment }})</li>
          <li>中评<br>({{ stats.medium_colmment }})</li>
          <li>差评<br>({{ stats.bad_colmment }})</li>
          <li>晒图<br>({{ stats.image_num }})</li>
        </ul>
      </div>
      <ul
        class="comment-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="infiniteScrollDisabled"
        infinite-scroll-distance="10">
        <li v-for="comment in list" :key="comment.id" class="mgb">
          <comment-item :data="comment"></comment-item>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        goodsId: this.$route.params.id,
        nextPage: '',
        list: [],
        stats: null
      }
    },
    computed: {
      goodsPercent () {
        return parseInt(parseInt(this.stats.good_colmment) / parseInt(this.stats.count) * 100)
      },
      infiniteScrollDisabled () {
        return !this.nextPage
      }
    },
    mounted () {
      this.queryList()
      this.fetchStats()
    },
    methods: {
      loadMore () {
        this.queryList(this.nextPage)
      },
      queryList (nextPage) {
        const params = {
          goods_id: this.goodsId
        }
        this.$http.withLoading('/api/goods/comments', { params }).then(res => {
          if (res.list.current_page === 1) {
            this.list = res.list.data
          } else {
            this.list = this.list.concat(res.list.data)
          }
          this.nextPage = res.list.next_page_url
        })
      },
      fetchStats () {
        const params = { goods_id: this.goodsId }
        this.$http('/api/comments/data', { params }).then(res => {
          this.stats = res.data
        }, err => {
          this.$toast(err.message)
        })
      }
    }
  }
</script>
