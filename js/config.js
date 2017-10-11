/**
 * 日期 2017/9/22
 * 翡翠app
 */

(function (w) {
    var apiHost = 'http://192.168.199.124:8085';
    // var apiHost='http://192.168.199.107:8080';

    //配置项
    w.C = {};
    //域名
    C.host = apiHost + '/xianhuo/mobile/';

    //1.将token写到本地存储中2.从本地存储中取出token
    // localStorage.setItem('token','201709181509405117a680d79b7f3f4bfc9c0b497395b511bb');
    // C.marketToken=localStorage.getItem('token');

    //1.写死token
    // C.token = '201709241132286040c30df2af7a8a4a70bc9d8eb1d5ad1eaa';
    C.token = '';

    // 2.从本地存储中取出token
    // C.token=localStorage.getItem('token');

    //翡翠app接口
    C.interface = {
        //登录
        login: 'login/in',
        // 首页
        index: 'product/index',
        // 详情页
        detail: 'product/detail',
        //收藏
        toggleStore: 'product/toggleStore',
        // //取消收藏
        // cancelStore:'product/cancelStore',
        //新品推荐
        newMore: 'product/newMore',
        //商品推荐
        productMore: 'product/productMore',
        //类目
        categorySub: 'product/categorySub',
        //搜索
        query: 'product/query',
        // 获取筛选条件
        propertys: 'product/propertys',
        //商品筛选
        filter: 'product/filter',
    };


    //翡翠app组合地址
    for (k in C.interface) {
        C.interface[k] = C.host + C.interface[k];
    }

    //获取当前域名
    var localHostUrl = window.location.href.replace(/(\?.+?)$/g, '');
    localHostUrl = localHostUrl.replace(localHostUrl.split("/").pop(), '');
    C.localHostUrl = localHostUrl;

})(window);













