//视频播放
function clickVideo(type) {
    // alert('1');
    var that = $(type);
    console.log(that);
    that.removeClass('i-active');
    that.siblings('video').get(0).play();
    //暂停
    that.siblings('video').bind('pause', function () {
        that.addClass('i-active');
    });
    //播放完毕
    that.siblings('video').bind('ended', function () {
        that.addClass('i-active');
    });
}


(function () {
    //获取到商品唯一标记
    var productId = locationSearcher('productId');
    console.log(productId);
    //编译详情页数据
    var comDeConTpl = $('#comDe-con').html();
    var comDeConCmp = Handlebars.compile(comDeConTpl);

    //请求详情页数据ajax
    $.ajax({
        url: C.interface.detail,
        type: 'POST',
        dataType: 'json',
        data: {
            productId: productId,
            token: C.token
        },
        success: function (data) {
            if (data.errorCode == 200) {
                var data = data.data;
                console.log(data);
                $('#comDe-box').html(comDeConCmp(data));
                //图片懒加载初始化
                $(function () {
                    $("img.lazy").lazyload()
                });

                //轮播图组件
                var swiper = new Swiper('.swiper-container', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    pagination: '.swiper-pagination',
                    paginationType: 'fraction'
                });

                //轮播图下面  收藏/取消收藏
                $('.shoucang').unbind().click(getShoucangStatus);

                //轮播图下面  收藏/取消收藏
                function getShoucangStatus() {
                    // alert(productId)
                    var that = $(this);
                    $.ajax({
                        url: C.interface.toggleStore,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            token: C.token,
                            productId: productId
                        },
                        success: function (response) {
                            if (response.errorCode == '200') {
                                //显示'取消收藏'状态
                                var data = response.data;
                                that.addClass('textDetail-img-active');
                                that.find('span').html('取消');
                                //显示'收藏'状态
                                if (data == '002') {
                                    that.removeClass('textDetail-img-active');
                                    that.find('span').html('收藏');
                                }

                            } else if (response.errorCode == '0') {
                                //Token 过期的情况下,调取原生的方法到登录页面
                                var data = '';
                                var ua = navigator.userAgent.toLowerCase();  //浏览器类型
                                if (/iphone|ipad|ipod/.test(ua)) {
                                    //alert('这是ios机型');
                                    //token过期调取ios的方法
                                    iosTokenOut(data);
                                } else {
                                    //alert('这是android机型');
                                    //token过期调取安卓的方法   注意：安卓的数据类型比较特殊要字符串的
                                    androidTokenOut(JSON.stringify(data));
                                }

                                //调取安卓的方法
                                function androidTokenOut(param) {
                                    window.huifa.tokenOut(param);     //tokenOut这个方法是和原生共同协调好一起定义的
                                }

                                //调取iOS的方法
                                function iosTokenOut(param) {
                                    window.webkit.messageHandlers.tokenOut.postMessage(param);     //tokenOut这个方法是和原生共同协调好一起定义的
                                }
                            } else {
                                alert(response.errorMsg);
                            }
                        },
                        error: function () {
                            alert('服务器异常')
                        }
                    });
                }

              /*  // // 新品推荐  收藏/取消收藏
                $('.cdt-right').unbind().click(function (e) {
                    alert(productId)
                    var that = $(this);
                    e.stopPropagation();
                    e.preventDefault();
                    var id = that.parent().parent().parent().attr('data-id');
                    $.ajax({
                        url: C.interface.toggleStore,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            token: C.token,
                            productId: id
                        },
                        success: function (response) {
                            if (response.errorCode == '200') {
                                var data = response.data;
                                //显示'取消收藏'状态
                                that.addClass('cdt-right-active');
                                that.find('span').html('取消');
                                //显示'收藏'状态
                                if (data == '002') {
                                    that.removeClass('cdt-right-active');
                                    that.find('span').html('收藏');
                                }
                            } else if (response.errorCode == '0') {
                                //Token 过期的情况下,调取原生的方法到登录页面
                                var data = '';
                                var ua = navigator.userAgent.toLowerCase();  //浏览器类型
                                if (/iphone|ipad|ipod/.test(ua)) {
                                    //alert('这是ios机型');
                                    //token过期调取ios的方法
                                    iosTokenOut(data);
                                } else {
                                    //alert('这是android机型');
                                    //token过期调取安卓的方法   注意：安卓的数据类型比较特殊要字符串的
                                    androidTokenOut(JSON.stringify(data));
                                }

                                //调取安卓的方法
                                function androidTokenOut(param) {
                                    window.huifa.tokenOut(param);     //tokenOut这个方法是和原生共同协调好一起定义的
                                }

                                //调取iOS的方法
                                function iosTokenOut(param) {
                                    window.webkit.messageHandlers.tokenOut.postMessage(param);     //tokenOut这个方法是和原生共同协调好一起定义的
                                }
                            } else {
                                alert(response.errorMsg);
                            }
                        },
                        error: function () {
                            alert('服务器异常')
                        }
                    });
                });*/

            } else if (data.errorCode == 0) {
                //Token 过期的情况下,调取原生的方法到登录页面
                var data = '';
                var ua = navigator.userAgent.toLowerCase();  //浏览器类型
                if (/iphone|ipad|ipod/.test(ua)) {
                    //alert('这是ios机型');
                    //token过期调取ios的方法
                    iosTokenOut(data);
                } else {
                    //alert('这是android机型');
                    //token过期调取安卓的方法   注意：安卓的数据类型比较特殊要字符串的
                    androidTokenOut(JSON.stringify(data));
                }

                //调取安卓的方法
                function androidTokenOut(param) {
                    window.huifa.tokenOut(param);     //tokenOut这个方法是和原生共同协调好一起定义的
                }

                //调取iOS的方法
                function iosTokenOut(param) {
                    window.webkit.messageHandlers.tokenOut.postMessage(param);     //tokenOut这个方法是和原生共同协调好一起定义的
                }
            } else {
                alert(data.errorMsg)
            }
        },
        error: function () {
            alert('服务器异常')
        }

    });

})();

