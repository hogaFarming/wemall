<template>
  <div class="page my-views-page">
    <x-cell>
      共找到{{ itemTotal }}个足迹
      <x-button slot="right" @click.native="toggleEdit" inline pill>{{ isEdit ? '完成' : '编辑' }}</x-button>
    </x-cell>
    <template v-if="!loading">
      <div v-if="list.length">
        <div v-for="item in list">
          <div style="margin: 0.3733rem 0.48rem;font-size: 12px;color: #999999">{{ item.month }}</div>
          <x-card-list>
            <x-card v-for="goods in item.list" :key="goods.id" :pic="goods.cover" pic-height="4.2667rem">
              <span>{{ goods.name }}</span>
              <x-money :value="goods.price" slot="meta"></x-money>
              <div slot="extra">
                <x-checkbox v-if="isEdit" :value="selectedItems[goods.id]" @input="toggleSelect(goods.id)"></x-checkbox>
                <x-icon v-else type="delete_goods" @click.native="deleteGoods(goods.id)" style="width: 25px;height: 25px;"></x-icon>
              </div>
            </x-card>
          </x-card-list>
        </div>
      </div>
      <div v-else class="page-empty">
        <p class="page-empty-img"><img src="/static/icon/ic_footstep.png" alt="icon"></p>
        <p class="page-empty-text">一个足迹都没有，快去寻找你喜欢的商品吧！</p>
        <x-button class="page-empty-btn" @click.native="$router.push({ path: '/product/list' })" type="primary" inline pill>随便逛逛</x-button>
      </div>
      <x-fixed-bottom v-if="isEdit" style="font-size: 14px;">
        <x-cell slot="content">
          <x-checkbox :value="isAllSelected" @input="toggleSelectAll"></x-checkbox>
          <span>全选</span>
        </x-cell>
        <x-button type="primary" @click.native="deleteAll">删除</x-button>
      </x-fixed-bottom>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: true,
        isEdit: false,
        list: [],
        selectedItems: {}
      }
    },
    computed: {
      isAllSelected () {
        const result = this.list.every(item => item.list.every(i => !!this.selectedItems[i.id]))
        return result
      },
      itemTotal () {
        if (!this.list) return 0
        let ret = 0
        this.list.forEach(item => {
          ret += item.list.length
        })
        return ret
      }
    },
    mounted () {
      this.queryList()
    },
    methods: {
      queryList () {
        this.$http.withLoading('/api/history/goodses').then(res => {
          this.loading = false
          this.list = res.list
        })
      },
      deleteGoods (id) {
        this.$http.withLoading({
          url: '/api/history/goodses',
          data: { history_ids: id },
          method: 'delete'
        }).then(res => {
          this.$toast('删除成功')
          this.queryList()
        })
      },
      toggleEdit () {
        this.isEdit = !this.isEdit
      },
      deleteAll () {
        const ids = Object.keys(this.selectedItems).filter(key => this.selectedItems[key])
        if (!ids.length) return this.$toast('未选中足迹')
        this.$messagebox.confirm('确认删除足迹?').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: '/api/history/goodses',
            data: { history_ids: ids.join(',') },
            method: 'delete'
          }).then(res => {
            this.$toast('删除成功')
            this.queryList()
            this.isEdit = false
          })
        })
      },
      toggleSelect (id) {
        this.selectedItems = {
          ...this.selectedItems,
          [id]: !this.selectedItems[id]
        }
      },
      toggleSelectAll (val) {
        const selectedItems = {}
        this.list.forEach(item => {
          item.list.forEach(i => {
            selectedItems[i.id] = val
          })
        })
        this.selectedItems = selectedItems
      }
    }
  }
</script>
<style>
  .page {
    font-size: 14px;
  }
</style>
