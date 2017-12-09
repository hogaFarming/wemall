<template>
  <div>
    <div v-if="article">
      <x-cell class="article-title bdb">
        <p class="mgb">{{ article.title }}</p>
        <p class="black-3 fs-sm"><time>{{ article.created_at }}</time></p>
      </x-cell>
      <x-cell class="article-content">
        <div v-html="article.content"></div>
      </x-cell>
      <x-cell>
        阅读数量 {{ article.click_num }}
        <x-button @click.native="toggleLike" slot="right" :type="article.is_collect ? 'primary' : ''" pill inline>
          收藏 {{ article.collect_num }}
        </x-button>
      </x-cell>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        article: null,
        error: ''
      }
    },
    mounted () {
      this.queryArticleDetail()
    },
    methods: {
      queryArticleDetail () {
        this.$http.withLoading(`/api/articles/${this.id}`)
          .then(result => {
            this.article = result.data
          }, err => {
            this.error = err.message
          })
      },
      toggleLike () {
        if (this.article.is_collect) {
          this.$http.delete(`/api/article/collects/${this.id}`)
            .then(() => {
              this.article.is_collect = 0
              this.$toast({ message: '取消收藏', duration: 500 })
            })
        } else {
          this.$http.post('/api/article/collects', { article_id: this.id })
            .then(() => {
              this.article.is_collect = 1
              this.$toast({ message: '收藏成功', duration: 500 })
            })
        }
      }
    }
  }
</script>
<style>
  .article-content {
    font-size: 14px;
    line-height: 20px;
  }
</style>
