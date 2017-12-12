<template>
  <div class="page address-form-page">
    <form class="address-form">
      <x-field class="bdb" placeholder="收货人" v-model.trim="form.consignee"></x-field>
      <x-field class="bdb" placeholder="手机号码" v-model.trim="form.phone"></x-field>
      <x-field
        class="bdb"
        placeholder="选择地区"
        @click.native="addrPickerVisible = true"
        :value="addressText"
        disabled>
        <x-icon slot="extra" type="next_page"></x-icon>
      </x-field>
      <x-field class="bdb" placeholder="详细地址" v-model.trim="form.address"></x-field>
      <!--TODO 邮编-->
      <!--<x-field label="邮编" v-model="form.code"></x-field>-->
    </form>
    <x-fixed-bottom>
      <x-button size="full" type="primary" @click.native="submit">{{ id ? '确认修改' : '确认添加' }}</x-button>
    </x-fixed-bottom>
    <mt-popup v-model="addrPickerVisible" position="bottom" class="mint-popup-addr">
      <!-- <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
      </div>   -->
      <!-- <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="3"></mt-picker>  -->
      <mt-picker :slots="addrSlots" value-key="name" @change="onAddressChange" :showToolbar="true">
        <div>
          <span class="pull-left" @click="addrCancel">取消</span>
          <span class="pull-right" @click="addrOk">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        id: this.$route.query.id,
        form:{
          phone: '',
          province: '',
          city: '',
          district: '',
          address: '',
          consignee: ''
        },
        addrPickerVisible: false,
        addrSlots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        province: {
          id: 0,
          name: ''
        },
        city: {
          id: 0,
          name: ''
        },
        district: {
          id: 0,
          name: ''
        }
      }
    },
    computed: {
      addressText () {
        const text = [
          this.form.province,
          this.form.city,
          this.form.district
        ].filter(i => !!i).join(' ')
        return text
      }
    },
    mounted () {
      if (this.id) {
        this.fetchAddress()
      } else {
        this.getArea(1)
      }
    },
    methods: {
      fetchAddress () {
        this.$http.withLoading(`/api/user/address/${this.id}`).then(res => {
          this.form = {
            phone: res.data.phone,
            province: res.data.province,
            city: res.data.city,
            district: res.data.district,
            address: res.data.address,
            consignee: res.data.consignee
          }

          this.province.name = res.data.province
          this.city.name = res.data.city
          this.district.name = res.data.district

          this.getArea(1)
        })
      },
      /* 获取地区列表 */
      getArea (level, pid) {
        if (pid === 0) {
          return false
        }

        const params = {}
        if (level === 1) {
          params.level = level
        } else if (level === 2) {
          params.parent_id = pid
        } else if (level === 3) {
          params.parent_id = pid
        }
        this.$http('/api/area', {params}).then(res => {
          if (level === 1) {
            this.province.list = res.list
            this.addrSlots[0].values = this.province.list
          } else if (level === 2) {
            this.city.list = res.list
            this.addrSlots[2].values = this.city.list
          } else if (level === 3) {
            this.district.list = res.list
            this.addrSlots[4].values = this.district.list
          }
        })
      },
      onAddressChange (picker, values) {
        let that = this
        if (values.length > 0) {
          /* if(!that.province.id && that.province.name !== ''){
              picker.setSlotValue(0, that.province.name);
          } */
          if (values[0] && that.province.id !== values[0].id) {
            that.province.id = values[0].id
            that.province.name = values[0].name
            that.getArea(2, that.province.id)
          }
          else if (values[1] && that.city.id !== values[1].id) {
            that.city.id = values[1].id
            that.city.name = values[1].name
            that.getArea(3, that.city.id)
          }
          else if (values[2] && that.district.id !== values[2].id) {
            that.district.id = values[2].id
            that.district.name = values[2].name
          }
        }
      },
      addrCancel () {
        this.addrPickerVisible = false
      },
      addrOk () {
        let that = this
        that.form.province = that.province.name
        that.form.city = that.city.name
        that.form.district = that.district.name

        that.addrPickerVisible = false
      },
      submit: function () {
        if (!this.form.province) return this.$toast('请选择省份')
        if (!this.form.address) return this.$toast('请填写详细地址')
        if (!this.form.consignee) return this.$toast('请填写收货人')
        if (!/^1[0-9]{10}$/.test(this.form.phone)) return this.$toast('手机号码格式有误')

        let url = '/api/user/address'
        let method = 'post'
        const data = {...this.form, is_default: 0}
        if (this.id) {
          url = '/api/user/address/' + this.id
          method = 'PUT'
          data.is_default = undefined
        }
        this.$http.withLoading({url, data, method}).then(res => {
          this.$toast(this.id ? '修改成功' : '添加成功')
          this.$router.back()
        })
      }
    }
  }
</script>
<style>
  .mint-popup-addr {
    width: 100%;
  }

  .mint-popup-addr .picker-toolbar {
    border-bottom: 1px solid #eaeaea;
  }

  .mint-popup-addr .picker-toolbar span {
    font-size: 18px;
    display: inline-block;
    width: 60px;
    text-align: center;
    line-height: 40px;
  }
</style>
