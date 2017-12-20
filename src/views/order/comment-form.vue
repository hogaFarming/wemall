<template>
  <div>
    <div class="comment-form mgb" v-for="item in commentList" :key="item.id">
      <x-cell bordered>
        <div class="comment-image-wrap" style="display: inline-block;vertical-align: middle;border: 1px solid #f0f0f0;margin-right: 0.3rem;">
          <div class="image" style="width: 1.07rem;height: 1.07rem;">
            <img :src="item.goods_cover" alt="pic">
          </div>
        </div>
        <x-praise-input v-model="item.star"></x-praise-input>
      </x-cell>
      <x-textarea v-model="item.content" placeholder="说说宝贝的优点和美中不足的地方吧…"></x-textarea>
      <x-image-upload style="padding: 0.2rem 0.48rem 0.4267rem;"></x-image-upload>
    </div>
    <x-fixed-bottom>
      <x-button @click.native="submit" type="primary" size="full">发布</x-button>
    </x-fixed-bottom>
  </div>
</template>
<script>
  // TODO upload images
  export default {
    data () {
      return {
        id: this.$route.params.id,
        commentList: []
      }
    },
    mounted () {
      this.queryGoodsList()
    },
    methods: {
      queryGoodsList () {
        this.$http.withLoading(`/api/order/goods/${this.id}`).then(res => {
          this.commentList = res.list.map(item => {
            return {
              ...item,
              star: 5,
              content: ''
            }
          })
        })

        // let that = this;
        // tools.ajax({
        //   url: '/api/order/goods/'+that.order_id,
        //   ajaxData: {},
        //   successFun: function (res) {
        //
        //     let arr = [];
        //
        //     for(let item in res.list){
        //
        //       res.list[item].imgs = [];
        //
        //       var push={
        //         'order_goods_id':res.list[item].id,
        //         'star':5,
        //         'content':'',
        //         'is_anonymous':0
        //       };
        //
        //       that.comment.push(push);
        //
        //       that.$nextTick(function () {
        //         setTimeout(function(){
        //           arr[item] = new upload({
        //             container: 'container' + item,     //容器ID
        //             browse_button: 'pickfiles' + item, //按钮ID
        //             progress:'progress' + item,        //进度条ID
        //             type: 'goods_comment',       //请求接口时的传参，upload_type
        //             setting : 'local',          //local：本地，cloud：云
        //             chunk_size : '200kb',       //分段传输的大小
        //             group: ['img'],
        //             url: '/api/upload',   //上传路径
        //             callback: function (re) {
        //               res.list[item].imgs.push(re.data);
        //             }
        //           });
        //         },0);
        //       })
        //
        //     }
        //
        //     that.list = res.list;
        //
        //   }
        // })
      },
      validateForm () {
        const isContentEmpty = this.commentList.some(item => !item.content)
        if (isContentEmpty) {
          return '评价内容不能为空'
        }
      },
      submit () {
        const msg = this.validateForm()
        if (msg) {
          this.$toast(msg)
          return
        }
        this.$messagebox.confirm('确认发布评价吗?').then(action => {
          if (action === 'cancel') return

          const data = {
            order_id: this.id,
            comment: this.commentList.map(item => {
              const upload_ids = ''
              return {
                order_goods_id: item.id,
                star: item.star,
                content: item.content,
                is_anonymous: 0
              }
            })
          }
          this.$http.withLoading({
            url: '/api/goods/comments',
            data: data,
            method: 'post'
          }).then(res => {
            this.$toast('发布成功')
            this.$router.back()
          })
        })
      }
    }
  }
</script>
