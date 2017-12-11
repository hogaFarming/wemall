<template>
  <div class="page shares-page">
    <x-navbar v-model="currentTab" class="mgb">
      <mt-tab-item :id="1">晒单</mt-tab-item>
      <mt-tab-item :id="2">文章</mt-tab-item>
    </x-navbar>
    <div v-if="currentTab === 1" class="card-list">
      <x-card
        class="card-list-item"
        v-for="item in list"
        :key="item.id"
        :pic="item.goods_cover"
        @click.native="gotoProduct(item)"
        pic-width="4.53rem"
        pic-height="4.2667rem">
        <p class="black-3 mgb">{{ item.comment }}</p>
        <x-media-object :pic="item.headimg" size="30px">
          <div>{{ item.username }}</div>
          <div class="star" :class="{['star-' + item.star]: true}"></div>
        </x-media-object>
        <div>{{ item.goods_name }}</div>
      </x-card>
    </div>
    <div v-if="currentTab === 2" class="card-list">
      <x-card
        class="card-list-item"
        v-for="item in list"
        :key="item.id"
        :pic="item.cover"
        pic-width="4.53rem"
        pic-height="4.2667rem">
        <p class="black-3 mgb" @click="gotoArticle(item)">{{ item.author }}</p>
        <div>
          <x-icon @click.native="toggleLike(item)" type="praise"></x-icon>
          <span style="vertical-align: middle">{{ item.collect_num }}</span>
        </div>
      </x-card>
    </div>
  </div>
</template>
<script>
  import { scrollListMixin } from 'core/mixins'
  export default {
    mixins: [scrollListMixin],
    data () {
      return {
        cacheList: [],
        cacheNextPage: '',
        currentTab: 2
      }
    },
    watch: {
      currentTab (val, oldVal) {
        const tempList = this.list
        const tempNextPage = this.nextPage
        this.list = this.cacheList
        this.nextPage = this.cacheNextPage
        this.cacheList = tempList
        this.cacheNextPage = tempNextPage

        if (!this.list.length) {
          this.queryList()
        }
      }
    },
    mounted () {
      this.queryList()
    },
    methods: {
      queryList (nextPage) {
        const url = nextPage || (this.currentTab === 1 ? '/api/post/comments' : '/api/article/choiceness')
        this.$http.withLoading(url).then(res => {
          this.setListData(res.list)
        })
      },
      toggleLike (item) {
        // if (item.hasLike) {
        //   this.$toast({ message: '取消收藏', duration: 500 })
        // } else {
        //   this.$toast({ message: '收藏成功', duration: 500 })
        // }
      },
      gotoProduct (item) {
        this.$router.push(`/product/${item.goods_id}`)
      },
      gotoArticle (item) {
        this.$router.push(`/shares/article/${item.id}`)
      }
    }
  }
</script>
