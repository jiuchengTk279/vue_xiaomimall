<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      // res: {}
    }
  },
  mounted () {
    this.getUser();
    this.getCartCount();
    // // 本地加载请求静态 json 文件的格式
    // // this.axios.get('/mock/user/login.json').then((res) => {
    // //   this.res = res
    // // })

    // // 通过 easy-mock 平台实现数据 mock
    // this.axios.get('/user/login').then((res) => {
    //   this.res = res
    // })

    // // 本地集成 mockjs 实现数据 mock
    // this.axios.get('/user/login').then((res) => {
    //   this.res = res
    // })
  },
  methods: {
    // 获取用户信息
    getUser () {
      this.axios.get('/user').then(() => {
        // to-do 保存到 vuex 里面
      })
    },
    // 拉取购物车中的数量
    getCartCount() {
      this.axios.get('/carts/products/sum').then(() => {
        // to-do 保存到 vuex 里面
      })
    }
  }
}
</script>


<style lang="scss">
@import './assets/scss/config.scss';
@import './assets/scss/reset.scss';
@import './assets/scss/mixin.scss';
@import './assets/scss/modal.scss';
@import './assets/scss/button.scss';
</style>
