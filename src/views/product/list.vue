<template>
  <div class="page product-list-page">
    <x-cell class="bdb">
      <x-search v-model="searchText" @search="search"></x-search>
    </x-cell>
    <x-navbar :value="currentTab" @input="onTabChange" class="mgb">
      <mt-tab-item :id="1">销量</mt-tab-item>
      <mt-tab-item :id="2">价格
        <x-icon type="arrow_price"></x-icon>
      </mt-tab-item>
      <mt-tab-item :id="3">筛选
        <x-icon type="filter"></x-icon>
      </mt-tab-item>
    </x-navbar>
    <div v-if="!loading">
      <div v-if="list.length">
        <div class="black-3" style="padding: 0 0.27rem 0.32rem;">
          {{ queries.goods_name }}-找到 {{ total }} 个结果
        </div>
        <x-card-list
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="infiniteScrollDisabled"
          infinite-scroll-distance="10">
          <x-card
            v-for="item in list"
            :key="item.id"
            :pic="thumbnail(item.cover, 300)"
            @click.native="toProdDetail(item)"
            pic-height="4.2667rem">
            <span>{{ item.name }}</span>
            <x-money :value="item.sale_price" slot="meta" color="red"></x-money>
          </x-card>
        </x-card-list>
      </div>
      <div v-else style="text-align: center;">
        <p style="padding: 1rem 0 0.4rem"><img src="/static/icon/img_list_empty.png" alt=""></p>
        <p class="black-3">什么都没有找到，换个词再试试！</p>
      </div>
    </div>
    <mt-popup class="filter-popup" position="right" :value="filterVisible" @input="onFilterVisibleChange">
      <div class="filter-popup-content">
        <div class="filter-section" v-for="cat in categories" :key="cat.id" v-show="cat.children && cat.children.length > 0">
          <div class="filter-section-title">{{ cat.name }}</div>
          <div class="filter-section-body">
            <x-label-radio
              :options="cat.children"
              :value="selectedCatIds[cat.id]"
              :keys="['name', 'id']"
              @input="catSelectChange(cat, $event)">
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
  import { scrollListMixin } from 'core/mixins'

  export default {
    mixins: [scrollListMixin],
    data: function () {
      return {
        loading: true,
        searchText: this.$route.query.goods_name || '',
        selectedCatIds: {},
        currentTab: 1,
        priceDir: 1,
        startPrice: undefined,
        endPrice: undefined,

        queries: {},

        filterVisible: false,
        filterBrands: [],
        categories: []
      }
    },
    mounted: function () {
      this.search(this.searchText)
    },
    computed: {
    },
    methods: {
      search () {
        this.queries = {
          goods_name: this.searchText || undefined,
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
        // 分类
        let goods_cat_id_second
        if (this.categories && this.categories.length) {
          goods_cat_id_second = Object.keys(this.selectedCatIds).map(key => this.selectedCatIds[key]).filter(i => !!i)
        } else {
          let cat_ids = this.$route.query.cat_ids
          goods_cat_id_second = cat_ids ? cat_ids.split(',').map(i => +i) : []
        }
        // for (let i in this.categories) {
        //   if (this.categories[i].next_selected) {
        //     goods_cat_id_second.push(this.categories[i].next_selected)
        //   }
        // }
        if (goods_cat_id_second.length > 0) {
          this.queries.goods_cat_id_second = goods_cat_id_second.join(',')
        }
        this.$service.pushHistorySearch(this.queries.goods_name)
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
            this.loading = false
            this.setListData(result.list)
          })
      },
      queryCategories () {
        return this.$http.withLoading('/api/goods/categorys')
          .then(res => {
            if (res && res.list) {
              for (let i in res.list) {
                res.list[i].next_selected = undefined
              }
              this.categories = res.list

              const cat_ids = this.$route.query.cat_ids || ''
              const selectedCatIds = {}
              cat_ids.split(',').forEach(catId => {
                this.categories.forEach(cat => {
                  if (cat.children && cat.children.some(subCat => subCat.id == catId)) {
                    selectedCatIds[cat.id] = +catId
                  }
                })
              })
              this.selectedCatIds = selectedCatIds
            }
          })
      },
      onTabChange (tabId) {
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
      catSelectChange (cat, val) {
        // cat.next_selected = val
        this.selectedCatIds = {
          ...this.selectedCatIds,
          [cat.id]: val
        }
      },
      /**
       * 弹出筛选器
       */
      showFilter () {
        if (this.categories.length) {
          this.filterVisible = true
          return
        }
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
        for (let i in this.categories) {
          this.categories[i].next_selected = undefined
        }
        this.$refs.startPrice.value = ''
        this.$refs.endPrice.value = ''
        this.filterVisible = false
        this.$nextTick(this.search)
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
