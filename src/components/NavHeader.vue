<template>
    <div class="header">
        <div class="nav-topbar">
            <!-- 加 container 是为了页面的安全区域 -->
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in phoneList" :key="index">
                                    <!-- 打开新窗口 -->
                                    <a :href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <img :src="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'">
                                        </div>
                                        <div class="pro-name">小米壁画电视 65英寸</div>
                                        <div class="pro-price">6999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'">
                                        </div>
                                        <div class="pro-name">小米全面屏电视E55A</div>
                                        <div class="pro-price">1999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-3.png'">
                                        </div>
                                        <div class="pro-name">小米电视4A 32英寸</div>
                                        <div class="pro-price">699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'">
                                        </div>
                                        <div class="pro-name">小米电视4A 55英寸</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'">
                                        </div>
                                        <div class="pro-name">小米电视4A 65英寸</div>
                                        <div class="pro-price">2699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-6.png'">
                                        </div>
                                        <div class="pro-name">查看全部</div>
                                        <div class="pro-price">查看全部</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <dov class="wrapper">
                        <input type="text" name="keyword"/>
                        <!-- javascript:;  可以防止点击的时候被跳转 -->
                        <a href="javascript:;"></a>
                    </dov>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NavHeader',
    data() {
        return {
            // username: this.$store.state.username,
            phoneList: []
        }
    },
    computed: {
        username() {
            return this.$store.state.username;
        },
        cartCount() {
            return this.$store.state.cartCount
        },
        ...mapState(['username', 'cartCount'])
    },
    filters: {
        currency(val) {
            if (!val) return '0.00';
            return '￥'+ val.toFixed(2) + '元';
        }
    },
    mounted () {
        this.getProductList();
        this.getCartCount();
    },
    methods: {
        login () {
            this.$router.push('/login');
        },
        getProductList () {
            this.axios.get('/products', {
                params: {
                    categoryId: '100012',
                    // pagesize: 6
                }
            }).then((res) => {
                this.phoneList = res.list
                // if (res.list.length >= 6) {
                //     this.phoneList = res.list.slice(0,6);
                // }
            })
        },
        // 拉取购物车中的数量
        getCartCount() {
            this.axios.get('/carts/products/sum').then((res=0) => {
                // to-do 保存到 vuex 里面
                this.$store.dispatch('saveCartCount', res)
            })
        },
        // 退出登录的功能
        logout() {
            this.axios.post('/user/logout').then(() => {
                this.$message.success('退出成功');
                this.$cookie.set('userId', '', {expires: '-1'});
                this.$store.dispatch('saveUserName', '');
                this.$store.dispatch('saveCartCount', 0);
            })
        },
        goToCart () {
            this.$router.push('/cart');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/base.scss';
    @import '../assets/scss/mixin.scss';
    @import '../assets/scss/config.scss';
    .header {
        .nav-topbar {
            height: 39px;
            line-height: 39px;
            background-color: #333333;
            color: #B0B0B0;
            .container {
                width: 1226px;
                margin-right: auto;
                margin-left: auto;
                @include flex();
                a {
                    display: inline-block;
                    color: #b0b0b0;
                    margin-left: 17px;
                }
                .my-cart {
                    width: 110px;
                    background-color: #FF6600;
                    text-align: center;
                    color: #ffffff;
                    margin-right: 0;
                    .icon-cart {
                        @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
                        margin-right: 4px;
                    }
                }
            }
        }
        .nav-header {
            position: relative;
            .container {
                width: 1226px;
                margin-right: auto;
                margin-left: auto;
                height: 112px;
                @include flex();
                .header-logo {
                    display: inline-block;
                    width: 55px;
                    height: 55px;
                    background-color: #FF6600;
                    // 伪类实现两张背景图片切换
                    a {
                        display: inline-block;
                        width: 110px;
                        height: 55px;
                        &:before {
                            content: '';
                            @include bgImg(55px,55px,'/imgs/mi-logo.png',55px);
                            transition: margin .2s;
                        }
                        &:after {
                            // 这个 content 是占位的
                            content: '';
                            @include bgImg(55px,55px,'/imgs/mi-home.png',55px);
                        }
                        &:hover:before {
                            margin-left: -55px;
                            transition: margin .2s;
                        }
                    }
                }
                .header-menu {
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu {
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        span {
                            cursor: pointer;
                        }
                        &:hover {
                            color: $colorA;
                            .children {
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children {
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            opacity: 0;
                            overflow: hidden;
                            border-top: 1px solid #E5E5E5;
                            box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
                            z-index: 10;
                            transition: all .2s;
                            background-color: #ffffff;
                            .product {
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;
                                a {
                                    display: inline-block;
                                }
                                img {
                                    height: 111px;
                                    width: auto;
                                    margin-top: 26px;
                                }
                                .pro-img {
                                    height: 137px;
                                }
                                .pro-name {
                                    font-weight: bold;
                                    margin-top: 19px;
                                    margin-bottom: 8px;
                                    color: $colorB;
                                }
                                .pro-price {
                                    color: $colorA;
                                }
                                &:before {
                                    // 占位符
                                    content: '';
                                    position: absolute;
                                    top: 28px;
                                    right: 0;
                                    border-left: 1px solid $colorF;
                                    height: 100px;
                                    width: 1px;
                                }
                                &:last-child:before {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .header-search {
                    width: 319px;
                    .wrapper {
                        height: 50px;
                        border: 1px solid #E0E0E0;
                        display: flex;
                        align-items: center;
                        input {
                            border: none;
                            box-sizing: border-box;
                            border-right: 1px solid #e0e0e0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;
                        }
                        a {
                            @include bgImg(18px,18px,'/imgs/icon-search.png');
                            // 充满背景图片
                            // background-size: contain;
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>
