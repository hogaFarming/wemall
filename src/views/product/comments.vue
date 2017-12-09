<template>
  <div>
    <x-cell>好评度 <span v-html="commentsGoodPercent"></span>%</x-cell>
    <div class="mod grade">
      <ul>
        <li v-for="item in grades"><span v-html="item.label"></span><br>(<span v-html="item.count"></span>)</li>
      </ul>
    </div>
    <comment-item class="mgb"></comment-item>
    <comment-item class="mgb"></comment-item>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        commentsGoodPercent: 100,
        grades: [
          { label: '全部评价', count: 128 },
          { label: '好评', count: 108 },
          { label: '中评', count: 18 },
          { label: '差评', count: 2 },
          { label: '晒图', count: 2 }
        ]
      }
    }
  }
</script>
