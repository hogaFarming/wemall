<template>
  <div>
    <x-cell>
      <x-search v-model.trim="keyword" @search="onSearch"></x-search>
    </x-cell>
    <div class="pd">
      <div style="color: #999999;margin-bottom: 15px;">热搜商品</div>
      <div class="label-list">
        <x-label
          v-for="item in hotWords"
          :key="item"
          style="background-color: #dddddd;"
          @click.native="onHotSearch(item)">
          {{ item }}
        </x-label>
      </div>
    </div>
    <div class="pd">
      <div style="color: #999999;margin-bottom: 15px;">搜索历史</div>
      <div class="label-list">
        <x-label
          v-for="item in historySearch"
          :key="item.keyword"
          style="background-color: #dddddd;"
          @click.native="onSearch(item.keyword)">
          {{ item.label }}
        </x-label>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        keyword: '',
        hotWords: [],
        historySearch: []
      }
    },
    mounted () {
      this.fetchHotWords()
    },
    methods: {
      fetchHotWords () {
        this.$http('/api/goods/hotwords').then(result => {
          this.hotWords = result.data.value
        }, err => {
          this.$toast(err.data.error_msg)
        })
      },
      queryHistorySearch () {
        this.$service.queryHistorySearch().then(result => {
          this.historySearch = result
        })
      },
      onSearch () {
        if (!this.keyword) {
          return this.$toast('请输入您要搜索的商品')
        }
        this.$router.push({ path: '/product/list', query: { goods_name: this.keyword } })
      },
      onHotSearch (keyword) {
        this.$router.push({ path: '/product/list', query: { goods_name: keyword } })
      }
    }
  }
</script>
