<template>
  <div class="page address-list-page">
    <template v-if="!loading">
      <div class="address-item mgb" v-for="addr in list">
        <x-cell class="bdb">
          <x-checkbox :value="defaultAddress === addr.id" @input="setDefault(addr, $event)"></x-checkbox>
          <span style="margin-left: 0.5em;">默认地址</span>
          <div slot="right">
            <x-button @click.native="editAddress(addr)" pill inline>编辑</x-button>
            <x-button @click.native="delAddress(addr)" pill inline>删除</x-button>
          </div>
        </x-cell>
        <x-cell @click.native="selectAddress(addr)">
          <p style="margin-bottom: 0.32rem;"><span style="margin-right: 2em;">{{ addr.consignee }}</span><span>{{ addr.phone }}</span></p>
          <p>{{ addr | address }}</p>
        </x-cell>
      </div>
      <x-fixed-bottom style="font-size: 16px;">
        <x-button @click.native="createAddress" type="primary" size="full">
          <span style="margin-right: 1em;">+</span>
          <span>还可添加 {{ canCreateCount }} 个收货地址</span>
        </x-button>
      </x-fixed-bottom>
    </template>
  </div>
</template>
<script>
  export default {
    data: function () {
      const query = this.$route.query
      return {
        loading: true,
        list: [],
        query: query,
        defaultAddress: undefined
      }
    },
    computed: {
      canCreateCount () {
        return 10 - this.list.length
      }
    },
    mounted () {
      this.fetchList()
    },
    methods: {
      fetchList () {
        this.$http.withLoading('/api/user/address').then(res => {
          this.loading = false
          this.list = res.list
          const addr = this.list.filter(item => item.is_default)[0]
          if (addr) this.defaultAddress = addr.id
        })
      },
      selectAddress (addr) {
        if (!this.query.type) return

        const query = {
          ...this.query,
          type: undefined,
          address_id: addr.id
        }
        // query.data = decodeURIComponent(this.url.params('data'));
        this.$router.replace({path: '/cart/order', query})
      },
      setDefault (addr, checked) {
        if (checked) {
          this.$http.withLoading({
            url: `/api/user/address/${addr.id}`,
            data: {is_default: 1},
            method: 'put'
          }).then(res => {
            this.fetchList()
          })
        }
      },
      editAddress (addr) {
        this.$router.push({
          path: '/my/address/edit',
          query: {
            ...this.query,
            id: addr.id
          }
        })
      },
      createAddress () {
        this.$router.push({
          path: '/my/address/edit',
          query: this.query
        })
      },
      delAddress (addr) {
        this.$http.withLoading({
          url: `/api/user/address/${addr.id}`,
          method: 'delete'
        }).then(res => {
          this.fetchList()
        })
      }
    }
  }
</script>
