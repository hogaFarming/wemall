<template>
  <div>
    <x-navbar :value="currentTab" @input="onTabChange" class="mgb">
      <mt-tab-item :id="1">晒单</mt-tab-item>
      <mt-tab-item :id="2">文章</mt-tab-item>
    </x-navbar>
    <div v-if="currentTab === 1" class="card-list">
      <x-card
        class="card-list-item"
        v-for="item in comments.list"
        :key="item.id"
        :pic="item.pic"
        pic-width="4.53rem"
        pic-height="4.2667rem">
        <p class="black-3 mgb">{{ item.comment }}</p>
        <x-media-object :pic="item.avatar" size="30px">
          <div>{{ item.username }}</div>
          <div class="star star-5"></div>
        </x-media-object>
        <div>{{ item.info }}</div>
      </x-card>
    </div>
    <div v-if="currentTab === 2" class="card-list">
      <x-card
        class="card-list-item"
        v-for="item in articles.list"
        :key="item.id"
        :pic="item.pic"
        @click.native="gotoArticle(item)"
        pic-width="4.53rem"
        pic-height="4.2667rem">
        <p class="black-3 mgb">{{ item.content }}</p>
        <div>
          <x-icon @click.native="toggleLike(item)" type="praise"></x-icon>
          <span style="vertical-align: middle">{{ item.likes }}</span>
        </div>
      </x-card>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        comments: {
          pageIndex: 1,
          list: [],
          total: 0
        },
        articles: {
          pageIndex: 1,
          list: [],
          total: 0
        },
        currentTab: 1
      }
    },
    mounted () {
      this.queryList()
    },
    methods: {
      onTabChange (tabId) {
        this.currentTab = tabId
        var list = tabId === 1 ? this.comments.list : this.articles.list
        if (!list.length) {
          this.queryList()
        }
      },
      queryList () {
        let state, url
        if (this.currentTab === 1) {
          state = this.comments
          url = '/api/article/choiceness'
        } else {
          state = this.articles
          url = '/api/post/comments'
        }
        this.$http.withLoading(url).then(result => {
          state.list = result.list.data
          state.total = result.list.total
        })
      },
      toggleLike (item) {
        if (item.hasLike) {
          this.$toast({ message: '取消收藏', duration: 500 })
        } else {
          this.$toast({ message: '收藏成功', duration: 500 })
        }
      },
      gotoArticle (item) {
        this.$navigateTo('article/articles', { id: item.id })
      }
    }
  }
</script>
