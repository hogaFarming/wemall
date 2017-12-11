<template>
  <div class="comment">
    <div class="media">
      <div class="media-left">
        <x-avatar size="small" :src="data.headimg"></x-avatar>
      </div>
      <div class="media-content">
        <div class="title">{{ data.username }}</div>
        <div :class="starCls"></div>
      </div>
      <time class="media-right">{{ data.created_at * 1000 | fullTime }}</time>
    </div>
    <div class="content">
      {{ data.content }}
    </div>
    <div class="picrow" v-if="data.img_arr && data.img_arr.length">
      <ul>
        <li v-for="item in data.img_arr" @click="seeImg(item, data.img_arr)">
          <img :src="item" alt="pic">
        </li>
      </ul>
    </div>
    <ul class="meta grey">
      <li>规格：<span>{{ data | goodsSkuName }}</span></li>
      <li>购买日期：<span>{{ data.order_sn | orderNs }}</span></li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    computed: {
      starCls () {
        return {
          star: true,
          ['star-' + this.data.star]: true
        }
      }
    }
  }
</script>
