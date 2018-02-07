<template>
  <div class="prod-recommend" v-if="_items && _items.length">
    <div class="mod bar bdb">
      同类推荐
    </div>
    <div class="mod suggest">
      <x-slider class="bdb" style="padding-bottom: 0.8rem;" indicator="dots" :length="slides.length">
        <x-slider-item v-for="(slide, i) in slides" :key="i">
          <div v-for="(row, j) in slide" :key="j">
            <x-card-list :cols="3">
              <x-card
                v-for="(item, k) in row" :key="k"
                :pic="thumbnail(item.cover, 300)"
                @click.native="gotoDetail(item.id)">
                <span>{{ item.name }}</span>
                <x-money :value="item.sale_price" slot="meta"></x-money>
              </x-card>
            </x-card-list>
          </div>
        </x-slider-item>
      </x-slider>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['items'],
    computed: {
      _items () {
        const len = this.items.length
        let cut
        if (len < 3) {
          cut = 0
        } else if (len >= 3 && len < 6) {
          cut = 3
        } else if (len >= 6 && len < 12) {
          cut = 6
        } else if (len >= 12) {
          cut = len - len % 6
        }
        return this.items.slice(0, cut)
      },
      rows () {
        const rows = []
        let currRow
        this._items.forEach((item, index) => {
          if (index % 3) {
            currRow.push(item)
          } else {
            currRow = [item]
            rows.push(currRow)
          }
        })
        return rows
      },
      slides () {
        const slides = []
        let currSlide
        this.rows.forEach((row, index) => {
          if (index % 2) {
            currSlide.push(row)
          } else {
            currSlide = [row]
            slides.push(currSlide)
          }
        })
        return slides
      }
    },
    methods: {
      gotoDetail (prodId) {
        // this.$router.push('/product/' + prodId)
        let url = location.origin + '/product/' + prodId
        if (location.search) url += location.search
        location.href = url
      }
    }
  }
</script>
<style>
  .prod-recommend {

  }
  .prod-recommend .image {
    height: 2.67rem;
    border: 1px solid #f0f0f0;
  }
  .prod-recommend .x-card {
    margin-bottom: 0;
  }
</style>
