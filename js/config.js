/**
 * 日期 2017/9/22
 * 翡翠app
 */

(function (w) {

    //本地服务器
    // var apiHost = 'http://192.168.199.124:8085';
    //线上服务器
    var apiHost='http://118.190.49.105:8083';

    //配置项
    w.C = {};
    //域名
    C.host = apiHost + '/xianhuo/mobile/';

    //1.将token写到本地存储中2.从本地存储中取出token
    // localStorage.setItem('token','201709181509405117a680d79b7f3f4bfc9c0b497395b511bb');
    // C.marketToken=localStorage.getItem('token');

    //1.写死token-本地
    // C.token = '2017101214114165633f80c84580ce4061bde46301f80b0974';

    //1.写死token-外网
    // C.token = '2017101216485723707fa040c50ce548df9cc4d2468f0228fa';

    // 2.从本地存储中取出token
    C.token=localStorage.getItem('token');

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













