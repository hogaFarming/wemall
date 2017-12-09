<template>
  <div class="comment-short-list">
    <div class="mod bar bdb" @click="seeAllComments">
      <span>{{ '评价 (' + commentsCount + ')' }}</span>
      <div class="bar-right">
        <span>{{ '好评度' + commentsGoodPercent + '%' }}</span>
        <x-icon type="next_page"></x-icon>
      </div>
    </div>
    <div class="mod bdb">
      <ul class="comment-list">
        <li>
          <comment-item></comment-item>
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
    props: ['comments', 'commentsCount', 'commentsGoodPercent'],
    methods: {
      seeAllComments: function () {
        location.href = 'comments.html'
      }
    }
  }
</script>
