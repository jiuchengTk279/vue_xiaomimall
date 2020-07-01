<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt="">
            <p>小米商城</p>
        </div>
        <div class="footer-link">
            <a href="https://xiaomi.tmall.com/" target="_blank">小米天猫店</a><span>|</span>
            <a href="https://privacy.mi.com/all/zh_CN/" target="_blank">隐私政策</a><span>|</span>
            <a href="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f516fe9e2c01.html" target="_blank">信息保护规则</a><span>|</span>
            <a href="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ded8d0e4a77d.html" target="_blank">隐私政策</a><span>|</span>
            <a href="https://www.mi.com/about/user-agreement" target="_blank">用户协议</a><span>|</span>
            <a href="https://static.mi.com/feedback/" target="_blank">问题反馈</a><span>|</span>
        </div>
        <div class="copyright">
            Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavFooter'
}
</script>

<style lang="scss" scoped>
    .footer {
        height: 234px;
        border-top: 4px solid #FF6600;
        background-color: #333333;
        color: #999999;
        font-size: 16px;
        text-align: center;
        .footer-logo {
            margin-top: 46px;
            margin-bottom: 331px;
            img {
                width: 53px;
                height: 36px;
                margin-bottom: 13px;
            }
        }
        .footer-link {
            margin-top: -290px;
            a {
                color: #999999;
                display: inline-block;
            }
            span {
                margin: 0 10px;
            }
            margin-bottom: 13px;
        }
        .copyright{
            .domain{
                color:#FF6600;
            }
        }
    }
</style>
