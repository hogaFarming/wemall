<template>
  <div class="page article-page">
    <div v-if="article">
      <x-cell class="article-title bdb">
        <p class="mgb" style="line-height: 1.25;">{{ article.title }}</p>
        <p class="black-3 fs-sm"><time>{{ article.created_at * 1000 | fullTime }}</time></p>
      </x-cell>
      <div class="article-content">
        <div v-html="article.content"></div>
      </div>
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
              this.article.collect_num -= 1
              this.$toast({ message: '取消收藏', duration: 500 })
            })
        } else {
          this.$http.post('/api/article/collects', { article_id: this.id })
            .then(() => {
              this.article.is_collect = 1
              this.article.collect_num += 1
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
    background-color: #fff;
    padding: 0.4267rem 0.48rem;
  }
</style>
