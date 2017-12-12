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
      <!--<x-cell>-->
        <!--阅读数量 {{ article.click_num }}-->
        <!--<x-button @click.native="toggleLike" slot="right" :type="article.is_collect ? 'primary' : ''" pill inline>-->
          <!--收藏 {{ article.collect_num }}-->
        <!--</x-button>-->
      <!--</x-cell>-->
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
        this.$http.withLoading(`/api/notices/${this.id}`)
          .then(result => {
            this.article = result.data
          }, err => {
            this.error = err.message
          })
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
  .article-content img {
    max-width: 100%;
  }
</style>
