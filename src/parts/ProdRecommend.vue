<template>
  <div class="prod-recommend" v-if="_items && _items.length">
    <div class="mod bar bdb">
      同类推荐
    </div>
    <div class="mod suggest">
      <x-slider class="bdb" style="padding-bottom: 0.8rem;" indicator="dots" :length="slides.length">
        <x-slider-item v-for="slide in slides">
          <div class="grid">
            <div class="row" v-for="row in slide">
              <div class="col col-8" v-for="item in row">
                <div class="card">
                  <div class="image">
                    <img :src="item.cover" alt="pic">
                  </div>
                  <p class="black-3 fs-sm card-title">{{ item.name }}</p>
                  <p class="fs-sm price"><x-money :value="item.sale_price"></x-money></p>
                </div>
              </div>
            </div>
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
    }
  }
</script>
<style>
  .prod-recommend {

  }
  .prod-recommend .image {
    width: 2.67rem;
    height: 2.67rem;
  }
</style>
