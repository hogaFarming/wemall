<template>
  <div class="page message-page">
    <x-navbar v-model="currentTab" class="mgb">
      <mt-tab-item :id="1">商城消息</mt-tab-item>
      <mt-tab-item :id="2">系统公告</mt-tab-item>
    </x-navbar>
    <div v-if="currentTab === 1" class="message-list">
      <x-cell v-for="item in list" :key="item.id" class="bdb" @click.native="onClickMessage(item)">
        <p class="mgb">订单已发货！</p>
        <p class="black-3 mgb fs-sm">
          <time>2017-04-01 16:19</time>
        </p>
        <p class="black-3">您的订单 20170401101012080912 已经发货，点此查看。</p>
      </x-cell>
    </div>
    <div v-if="currentTab === 2" class="message-list">
      <x-cell v-for="item in list" :key="item.id" class="bdb" @click.native="gotoNotice(item)">
        <p class="mgb" style="line-height: 1.25;">{{ item.title }}</p>
        <p class="black-3 mgb fs-sm">
          <time>{{ item.updated_at * 1000 | fullTime }}</time>
        </p>
      </x-cell>
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
        const url = nextPage || (this.currentTab === 1 ? '/api/message' : '/api/notices')
        this.$http.withLoading(url).then(res => {
          this.setListData(res.list)
        })
      },
      onClickMessage (obj) {
        if (obj.type === 5) {
          this.$router.push('/refund' + obj.refund_id)
        } else if (obj.type === 4) {
          this.$router.push('/my/score')
        } else {
          this.$router.push('/order/' + obj.order_id)
        }
      },
      gotoNotice (item) {
        this.$router.push(`/notice/${item.id}`)
      }
    }
  }
</script>
