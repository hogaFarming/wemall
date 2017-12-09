<template>
  <div>

    <x-cell>
      共找到4个足迹
      <x-button slot="right" @click.native="toggleEdit" inline pill>{{ isEdit ? '完成' : '编辑' }}</x-button>
    </x-cell>
    <div style="margin: 0.3733rem 0.48rem;font-size: 12px;color: #999999">11月15日</div>
    <div class="myfoot-list">
      <x-card class="myfoot-item" pic="/static/img/order.png" pic-width="4.53rem" pic-height="4.2667rem">
        <span>2017年新款茶灵春季茶灵茶灵面膜50ml 提...</span>
        <x-money :value="158" slot="meta"></x-money>
        <div slot="extra">
          <x-checkbox v-if="isEdit" :value="selectedItems[0]" @input="toggleSelect(0)"></x-checkbox>
          <x-icon v-else type="delete_goods" @click.native="deleteGoods(0)" style="width: 25px;height: 25px;"></x-icon>
        </div>
      </x-card>
    </div>
    <x-fixed-bottom v-if="isEdit" style="font-size: 14px;">
      <x-cell slot="content">
        <x-checkbox :value="isAllSelected" @input="toggleSelectAll"></x-checkbox>
        <span>全选</span>
      </x-cell>
      <x-button type="primary" @click.native="deleteAll">删除</x-button>
    </x-fixed-bottom>
  </div>
</template>
<style>
  .page {
    font-size: 14px;
  }
  .myfoot-list {
    overflow: hidden;
    padding: 0 0.27rem;
    /*margin-bottom: -0.25rem;*/
  }
  .myfoot-item {
    float: left;
    margin-right: 0.4rem;
    margin-bottom: 0.25rem;
  }
  .myfoot-item:nth-child(2n) {
    margin-right: 0;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        isEdit: false,
        selectedItems: {
          0: false
        }
      }
    },
    computed: {
      isAllSelected: function () {
        for (var key in this.selectedItems) {
          if (!this.selectedItems[key]) return false
        }
        return true
      }
    },
    methods: {
      deleteGoods: function (id) {
        console.log('delete ' + id)
      },
      toggleEdit: function () {
        this.isEdit = !this.isEdit
      },
      deleteAll: function () {

      },
      toggleSelect: function (id) {
        // var newSelectedItems = {}
        // newSelectedItems[id] = !this.selectedItems[id]
        // this.selectedItems = newSelectedItems
        this.selectedItems[id] = !this.selectedItems[id]
      },
      toggleSelectAll: function (flag) {
        for (var key in this.selectedItems) {
          this.selectedItems[key] = flag
        }
      }
    }
  }
</script>
