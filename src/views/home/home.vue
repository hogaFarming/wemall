<template>
  <div class="page home-page">
    <x-cell class="bdb" @click.native="gotoList">
      <x-icon type="search"></x-icon> 搜索
    </x-cell>
    <!--轮播图-->
    <div class="top-slider-wrap bdb">
      <x-slider class="bdb" indicator="number" :length="banners.length">
        <x-slider-item v-for="item in banners" :key="item.id">
          <img :src="item.cover" alt="item.title" @click="toLink(item.link)">
        </x-slider-item>
      </x-slider>
    </div>
    <ul class="cover-list">
      <li v-for="item in covers">
        <img @click="toLink(item.link)" :src="item.cover" alt="cover">
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        banners: [],
        covers: []
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$http.withLoading('/api/indexs?device_platform=2').then(res => {
          this.banners = res.list.banner_list
          this.covers = res.list.cover_list
        })
      },
      gotoList () {
        this.$router.push('/product/list')
      },
      toLink (link) {
        if (!link) return
        location.href = link
      }
    }
  }
</script>
<style>
  .cover-list li {

  }
  .cover-list li > img {
    max-width: 100%;
  }
</style>
