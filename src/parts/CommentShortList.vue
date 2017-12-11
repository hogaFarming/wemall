<template>
  <div class="comment-short-list">
    <div class="mod bar bdb" @click="seeAllComments">
      <span>{{ '评价 (' + total + ')' }}</span>
      <div class="bar-right">
        <span>好评度{{ goodPercent | percent }}</span>
        <x-icon type="next_page"></x-icon>
      </div>
    </div>
    <div class="mod bdb">
      <ul class="comment-list">
        <li v-for="comment in comments.slice(0, 1)">
          <comment-item :data="comment"></comment-item>
        </li>
      </ul>
    </div>
    <div class="mod mgb center" @click="seeAllComments">
      <x-icon type="evaluate"></x-icon>
      <span>全部评价</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['comments', 'total', 'goodPercent', 'goodsId'],
    methods: {
      seeAllComments: function () {
        this.$router.push(`/product/${this.goodsId}/comments`)
      }
    }
  }
</script>
