<template>
  <div>

    <x-media-object class="mgb" style="margin-top: 0.12rem;" icon="pay_success" size="0.69rem" pull="0.12rem" padding>
      <span style="font-size: 14px;">退款成功</span>
      <div slot="secondary">退款成功</div>
      <div slot="secondary">退款时间：2017-04-01 10:23</div>
    </x-media-object>
    <x-field-set class="bdb">
      <x-field-item label="售后类型">仅退款</x-field-item>
      <x-field-item label="退款金额"><x-money :value="138" size="small"></x-money></x-field-item>
      <x-field-item label="退款原因">买多了/不想要</x-field-item>
      <x-field-item label="备注原因">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque dicta exercitationem harum maiores maxime necessitatibus nihil nobis omnis, pariatur, perspiciatis placeat possimus quaerat quidem quis sapiente tempore tenetur voluptatem!</x-field-item>
      <x-field-item label="售后编号">440123654789</x-field-item>
      <x-field-item label="申请时间">2017-03-22 20:48</x-field-item>
    </x-field-set>
    <x-cell>
      <p class="fs-me mgb">凭证附件</p>
      <ul class="picrow">
        <li><img src="/static/img/comment.png" alt="comemnt"></li>
        <li><img src="/static/img/comment.png" alt="comemnt"></li>
        <li><img src="/static/img/comment.png" alt="comemnt"></li>
        <li><img src="/static/img/comment.png" alt="comemnt"></li>
      </ul>
    </x-cell>
  </div>
</template>
