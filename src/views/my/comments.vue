<template>
  <div>
    <x-navbar v-model="selectedTab" class="mgb">
      <mt-tab-item id="1">全部评价</mt-tab-item>
      <mt-tab-item id="2">有图评价</mt-tab-item>
    </x-navbar>
    <comment-item class="mgb"></comment-item>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        selectedTab: '1'
      }
    }
  }
</script>
