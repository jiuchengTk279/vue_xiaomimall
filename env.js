let baseURL;
// 获取进程里面的一些环境变量
switch(process.env.NODE_ENV) {
    // 开发环境
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn/api';
        break;
    // 测试环境
    case 'test':
        baseURL = 'http://test-mall-pre.springboot.cn/api';
        break;
    // 预发布环境
    case 'prev':
        baseURL = 'http://prev-mall-pre.springboot.cn/api';
        break;
    // 生成环境
    case 'prod':
        baseURL = 'http://mall-pre.springboot.cn/api';
        break;
    // 默认环境
    default:
        baseURL = 'http://mall-pre.springboot.cn/api';
        break;
}



export default {
    baseURL
}