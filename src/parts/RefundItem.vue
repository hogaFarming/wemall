<template>
  <div class="refund-item">
    <x-cell icon="refund" bordered>仅退款<span slot="right" style="color: red;">退款成功</span></x-cell>
    <x-media-object class="bdb" pic="/static/img/sku.png" padding>
      2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
      <div slot="secondary">提亮肌肤50ML</div>
      <x-money slot="bottom-left" :value="588" size="small"></x-money>
      <div slot="bottom-right">
        <span style="font-size: 12px;">退款金额：</span><x-money :value="588" size="small" color="red"></x-money>
      </div>
    </x-media-object>
    <x-cell>
      <div slot="right">
        <x-button pill ghost inline>查看详情</x-button>
      </div>
    </x-cell>
  </div>
</template>
<script>
  export default {

  }
</script>
