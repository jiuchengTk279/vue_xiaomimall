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
      res: {}
    }
  },
  mounted () {
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
  }
}
</script>


<style>
</style>
