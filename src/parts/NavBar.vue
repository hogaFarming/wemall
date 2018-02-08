<template>
  <x-fixed-bottom>
    <div class="bottom-nav">
      <div class="bottom-nav-item" v-for="item in items" :key="item.path" @click="$router.push(item.path)">
        <x-icon :type="current === item.path ? item.activeIcon : item.icon"></x-icon>
        <br>
        {{ item.label }}
      </div>
    </div>
  </x-fixed-bottom>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { label: '首页', path: '/home', icon: 'nor_home', activeIcon: 'ele_home' },
          { label: '分类', path: '/product/category', icon: 'nor_category', activeIcon: 'ele_category' },
          { label: '购物车', path: '/cart', icon: 'nor_shopping', activeIcon: 'ele_shopping' },
          { label: '我的', path: '/my/home', icon: 'nor_me', activeIcon: 'ele_me' }
        ]
      }
    },
    computed: {
      current () {
        return this.$route.path
      }
    }
  }
</script>
<style>
  .bottom-nav {
    display: flex;
    width: 100%;
    /*padding: 0 0.48rem;*/
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.05) 0px 0px 15px;
  }
  .bottom-nav-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding: 0.15rem 0 0.1rem;
  }
  .bottom-nav-item .x-icon {
    height: 20px;
  }
</style>
