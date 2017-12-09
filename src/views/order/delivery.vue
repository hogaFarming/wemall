<template>
  <div>

    <x-media-object class="mgb" pic="/static/img/order.png" padding>
      物流状态： <span class="primary">物流运输中</span>
      <div slot="secondary">承运公司：顺丰快递</div>
      <div slot="secondary">运单编号：884911751999364256</div>
    </x-media-object>
    <x-timeline :events="events"></x-timeline>
  </div>
</template>
<script>
  export default {
    el: '#root',
    data: function () {
      return {
        events: [
          { content: '江西省信丰县工业园公司 签收人：本人签收', time: '2017-11-22 20:30:15' },
          { content: '江西省信丰县工业园公司 签收人：本人签收', time: '2017-11-22 20:30:15' },
          { content: '江西省信丰县工业园公司 签收人：本人签收', time: '2017-11-22 20:30:15' },
          { content: '江西省信丰县工业园公司 签收人：本人签收', time: '2017-11-22 20:30:15' }
        ]
      }
    }
  }
</script>
