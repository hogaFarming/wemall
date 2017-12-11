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
          {{ queries.goods_name }}-找到 {{ total }} 个结果
        </div>
        <div
          class="search-result"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="infiniteScrollDisabled"
          infinite-scroll-distance="10">
          <x-card
            class="result-item"
            v-for="item in list"
            :key="item.id"
            :pic="thumbnail(item.cover, 300)"
            @click.native="toProdDetail(item)"
            pic-width="4.53rem"
            pic-height="4.2667rem">
            <span>{{ item.name }}</span>
            <x-money :value="item.sale_price" slot="meta" color="red"></x-money>
          </x-card>
        </div>
      </div>
    </div>
    <mt-popup class="filter-popup" position="right" :value="filterVisible" @input="onFilterVisibleChange">
      <div class="filter-popup-content">
        <div class="filter-section" v-for="cat in categories">
          <div class="filter-section-title">{{ cat.name }}</div>
          <div class="filter-section-body">
            <x-label-radio
              :options="cat.children"
              :value="cat.next_selected"
              :keys="['name', 'id']"
              @input="cat.next_selected = $event">
            </x-label-radio>
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
        nextPage: '',
        searchText: this.$route.query.goods_name || '',
        currentTab: 1,
        priceDir: 1,
        selectedBrands: undefined,
        startPrice: undefined,
        endPrice: undefined,

        queries: {},
        total: 0,
        list: [],

        filterVisible: false,
        filterBrands: [],
        categories: []
      }
    },
    mounted: function () {
      this.search(this.searchText)
    },
    computed: {
      infiniteScrollDisabled () {
        return !this.nextPage
      }
    },
    methods: {
      search () {
        this.queries = {
          goods_name: this.searchText || undefined,
          goods_brand_id: this.selectedBrands,
          // start_price: this.startPrice * 100 || undefined,
          // end_price: this.endPrice * 100 || undefined,
          status: this.currentTab === 1 ? 2 : 3, // 1根据评价分数排序2根据销量3根据价格4根据上架时间
          sort: this.priceDir
        }
        if (this.startPrice > 0) {
          this.queries.start_price = this.startPrice * 100
        }
        if (this.endPrice > 0) {
          this.queries.end_price = this.endPrice * 100
          if (!this.startPrice) {
            this.queries.start_price = 0
          }
        }
        this.queryList()
      },
      loadMore () {
        this.queryList(this.nextPage)
      },
      reloadList () {
        this.queryList()
      },
      /**
       * 查询列表
       */
      queryList (nextPage) {
        const options = {
          url: nextPage || '/api/goodses',
          params: nextPage ? undefined : this.queries
        }
        if (this.queries.goods_name) {
          this.$service.pushHistorySearch(this.queries.goods_name)
        }
        this.$http.withLoading(options)
          .then(result => {
            if (result.list.current_page === 1) {
              this.list = result.list.data
            } else {
              this.list = this.list.concat(result.list.data)
            }
            this.total = result.list.total
            this.nextPage = result.list.next_page_url
          })
      },
      queryCategories () {
        return this.$http.withLoading('/api/goods/categorys')
          .then(result => {
            this.categories = result.list
          })
      },
      onTabChange: function (tabId) {
        switch (tabId) {
          case 1:
            if (this.currentTab === 1) return
            this.currentTab = 1
            this.search()
            break
          case 2:
            if (this.currentTab === 2) {
              this.priceDir = this.priceDir === 1 ? 2 : 1
            } else {
              this.currentTab = 2
            }
            this.search()
            break
          case 3:
            this.showFilter()
            break
        }
      },
      /**
       * 弹出筛选器
       */
      showFilter () {
        this.queryCategories().then(() => {
          this.filterVisible = true
        })
      },
      onFilterVisibleChange (visible) {
        this.filterVisible = visible
      },
      confirmFilter () {
        this.$refs.startPrice.value = this.startPrice = this.startPrice > 0 ? this.startPrice : ''
        this.$refs.endPrice.value = this.endPrice = this.endPrice > 0 ? this.endPrice : ''
        this.filterVisible = false
        this.search()
      },
      resetFilter () {
        this.selectedBrands = []
        this.$refs.startPrice.value = ''
        this.$refs.endPrice.value = ''
      },
      toProdDetail (item) {
        this.$router.push(`/product/${item.id}`)
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
  .filter-popup-content {
    height: 100%;
    overflow: auto;
    padding-bottom: 70px;
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
