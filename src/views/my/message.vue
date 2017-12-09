<template>
  <div>

    <x-navbar v-model="selectedTab" class="mgb">
      <mt-tab-item id="1">商城消息</mt-tab-item>
      <mt-tab-item id="2">系统公告</mt-tab-item>
    </x-navbar>
    <div v-if="selectedTab === '1'">
      <x-cell class="bdb">
        <p class="mgb">订单已发货！</p>
        <p class="black-3 mgb fs-sm"><time>2017-04-01 16:19</time></p>
        <p class="black-3">您的订单 20170401101012080912 已经发货，点此查看。</p>
      </x-cell>
      <x-cell>
        <p class="mgb">订单已发货！</p>
        <p class="black-3 mgb"><time>2017-04-01 16:19</time></p>
        <p class="black-3">您的订单 20170401101012080912 已经发货，点此查看。</p>
      </x-cell>
    </div>
    <div v-if="selectedTab === '2'">
      <x-cell class="bdb">
        <p class="mgb">6.18星期六狂欢节。</p>
        <p class="black-3 mgb fs-sm"><time>2017-04-01 16:19</time></p>
      </x-cell>
      <x-cell>
        <p class="mgb">6.18星期六狂欢节。</p>
        <p class="black-3 mgb fs-sm"><time>2017-04-01 16:19</time></p>
      </x-cell>
    </div>
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
