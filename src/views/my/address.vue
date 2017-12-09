<template>
  <div>

    <div class="address-item" v-for="addr in addressList">
      <x-cell class="bdb">
        <x-checkbox :value="defaultAddress === addr.id" @input="setDefault"></x-checkbox>
        <span style="margin-left: 0.5em;">默认地址</span>
        <div slot="right">
          <x-button @click="editAddress(addr)" pill inline>编辑</x-button>
          <x-button @click="delAddress(addr)" pill inline>删除</x-button>
        </div>
      </x-cell>
      <x-cell>
        <p style="margin-bottom: 0.32rem;"><span style="margin-right: 2em;">{{ addr.concat }}</span><span>{{ addr.phone }}</span></p>
        <p>{{ addr.location }}</p>
      </x-cell>
    </div>
    <x-fixed-bottom style="font-size: 16px;">
      <x-button type="primary" size="full">
        <span style="margin-right: 1em;">+</span>
        <span>还可添加 6 个收货地址</span>
      </x-button>
    </x-fixed-bottom>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        defaultAddress: '1',
        addressList: [
          { id: '1', concat: '陈晓东', phone: '1388888888', location: '广东省 广州市 天河区 长福路207号 长兴智汇D4A03' }
        ]
      }
    }
  }
</script>
