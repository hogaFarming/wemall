<template>
  <div>

    <x-cell class="bdb">
      <x-search v-model="searchText" @search="search"></x-search>
    </x-cell>
    <x-navbar :value="currentTab" @input="onTabChange" class="mgb">
      <mt-tab-item :id="1">销量</mt-tab-item>
      <mt-tab-item :id="2">价格 <x-icon type="arrow_price"></x-icon></mt-tab-item>
      <mt-tab-item :id="3">筛选 <x-icon type="filter"></x-icon></mt-tab-item>
    </x-navbar>
    <div>
      <div v-if="list.length">
        <div class="black-3" style="padding: 0 0.27rem 0.32rem;">
          {{ queries.keyword }}-找到 {{ total }} 个结果
        </div>
        <div class="search-result">
          <x-card
            class="result-item"
            v-for="item in list"
            :key="item.id"
            :pic="item.pic"
            pic-width="4.53rem"
            pic-height="4.2667rem">
            <span>{{ item.title }}</span>
            <x-money :value="item.price" slot="meta" color="red"></x-money>
          </x-card>
        </div>
      </div>
    </div>
    <mt-popup class="filter-popup" position="right" :value="filterVisible" @input="onFilterVisibleChange">
      <div class="filter-section">
        <div class="filter-section-title">品牌</div>
        <div class="filter-section-body">
          <x-label-check :options="filterBrands" v-model="selectedBrands"></x-label-check>
        </div>
      </div>
      <div class="filter-section">
        <div class="filter-section-title">价格区间</div>
        <div class="filter-section-body">
          <input class="filter-price-input" type="number" placeholder="最低价" v-model="startPrice" ref="startPrice">
          <span style="margin: 0 0.27rem;">-</span>
          <input class="filter-price-input" type="number" placeholder="最高价" v-model="endPrice" ref="endPrice">
        </div>
      </div>
      <div class="filter-btns">
        <x-button type="primary" @click.native="resetFilter">重置</x-button>
        <x-button type="danger" @click.native="confirmFilter">确认</x-button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        pageIndex: 1,
        searchText: this.$route.query.goods_name || '',
        currentTab: 1,
        priceDir: 1,
        selectedBrands: [],
        startPrice: undefined,
        endPrice: undefined,

        queries: {},
        total: 0,
        list: [],

        filterVisible: false,
        filterBrands: []
      }
    },
    mounted: function () {
      this.search(this.searchText)
    },
    methods: {
      search () {
        this.queryList({
          ...this.queries,
          pageIndex: 1,
          goods_name: this.searchText,
          goods_brand_id: this.selectedBrands,
          start_price: this.startPrice || undefined,
          end_price: this.endPrice || undefined,
          status: this.currentTab === 1 ? 2 : 3, // 1根据评价分数排序2根据销量3根据价格4根据上架时间
          sort: this.priceDir
        })
      },
      loadMore () {
        this.queryList(this.queries)
      },
      reloadList () {
        this.queryList({
          ...this.queries,
          pageIndex: 1
        })
      },
      /**
       * 查询列表
       */
      queryList (queries) {
        const params = this.queries = queries
        this.$http.withLoading('/api/goodses', { params })
          .then(result => {
            if (queries.pageIndex === 1) {
              this.list = result.data
            } else {
              this.list = this.list.concat(result.data)
            }
          })
      },
      onTabChange: function (tabId) {
        switch (tabId) {
          case 1:
            if (this.currentTab === 1) return
            this.currentTab = 1
            this.reloadList()
            break
          case 2:
            if (this.currentTab === 2) {
              this.priceDir = this.priceDir === 1 ? 2 : 1
            } else {
              this.currentTab = 2
            }
            this.reloadList()
            break
          case 3:
            this.showFilter()
            break
        }
      },
      /**
       * 弹出筛选器
       */
      showFilter: function () {
        var self = this
        self.$loading()
        setTimeout(function () {
          self.$hideLoading()
          self.filterVisible = true
          self.filterBrands = [
            { label: '水密码', value: 1 },
            { label: '韩后', value: 2 },
            { label: '欧诗漫', value: 3 },
            { label: '百雀羚', value: 4 }
          ]
        }, 300)
      },
      onFilterVisibleChange: function (visible) {
        this.filterVisible = visible
      },
      confirmFilter: function () {
        this.$refs.startPrice.value = this.startPrice = this.startPrice > 0 ? this.startPrice : ''
        this.$refs.endPrice.value = this.endPrice = this.endPrice > 0 ? this.endPrice : ''
        this.filterVisible = false
        this.search()
      },
      resetFilter: function () {
        this.selectedBrands = []
        this.$refs.startPrice.value = ''
        this.$refs.endPrice.value = ''
      }
    }
  }
</script>
<style>
  .search-result {
    overflow: hidden;
    padding: 0 0.27rem;
    /*margin-bottom: -0.25rem;*/
  }
  .result-item {
    float: left;
    margin-right: 0.4rem;
    margin-bottom: 0.25rem;
  }
  .result-item:nth-child(2n) {
    margin-right: 0;
  }
  .filter-popup {
    width: 80%;
    height: 100%;
    background-color: #ffffff;
    font-size: 14px;
  }
  .filter-section {
    padding: 0.5333rem 0.32rem;
    border-top: 1px solid #f0f0f0;
  }
  .filter-section:first-child {
    border-top: none;
  }
  .filter-section-title {
    line-height: 20px;
    margin-bottom: 0.2667rem;
    color: #999999;
  }
  .filter-btns {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    display: flex;
  }
  .filter-btns > button {
    flex: 1;
  }
  .filter-price-input {
    border: 1px solid #CCCCCC;
    border-radius: 8px;
    outline: none;
    width: 2.67rem;
    font-size: 12px;
    line-height: 17px;
    padding: 0.1067rem 0.27rem;
  }
</style>
