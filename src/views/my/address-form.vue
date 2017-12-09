<template>
  <div>

    <form class="address-form">
      <x-field class="bdb" label="收货人" v-model="concat"></x-field>
      <x-field class="bdb" label=" 手机号码" v-model="phone"></x-field>
      <x-field class="bdb" label="选择地区" v-model="area"></x-field>
      <x-field class="bdb" label="详细地址" v-model="street"></x-field>
      <x-field label="邮编" v-model="code"></x-field>
    </form>
    <x-fixed-bottom><x-button size="full" type="primary" @click.native="submit">确认修改</x-button></x-fixed-bottom>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        concat: 'hoga',
        phone: '135',
        area: '广东省广州市天河区',
        street: '一会据',
        code: '510000'
      }
    },
    methods: {
      submit: function () {

      }
    }
  }
</script>
