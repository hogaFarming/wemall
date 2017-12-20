<template>
  <div>
    <x-navbar v-model="currentTab" class="mgb">
      <mt-tab-item :id="1">全部评价</mt-tab-item>
      <mt-tab-item :id="2">有图评价</mt-tab-item>
    </x-navbar>
    <comment-item class="mgb" v-for="item in list" :key="item.id" :comment="item"></comment-item>
  </div>
</template>
<script>
  import { scrollListMixin } from 'core/mixins'
  export default {
    mixins: [scrollListMixin],
    data: function () {
      return {
        cacheList: [],
        cacheNextPage: '',
        currentTab: 1
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
        const options = nextPage || {
          url: '/api/user/comments',
          params: {
            is_image: this.currentTab === 2 ? 1 : undefined
          }
        }
        this.$http.withLoading(options).then(res => {
          this.setListData(res.list)
        })
      }
    }
  }
</script>
