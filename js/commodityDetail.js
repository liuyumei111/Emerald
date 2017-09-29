(function () {

    //获取到商品唯一标记
    var productId=locationSearcher('productId');
    console.log(productId);
    //编译详情页数据
   var comDeConTpl=$('#comDe-con').html();
   var comDeConCmp=Handlebars.compile(comDeConTpl);

    //请求详情页数据ajax
    $.ajax({
        url:C.interface.detail,
        type:'POST',
        dataType:'json',
        data:{
            productId:productId,
            token:'201709241132286040c30df2af7a8a4a70bc9d8eb1d5ad1eaa'
        },
        success:function (data) {
            if(data.errorCode==200){
                var data=data.data;
                console.log(data);
                $('#comDe-box').html(comDeConCmp(data));
                //图片懒加载初始化
                $(function() {
                    $("img.lazy").lazyload()
                });

                //轮播图组件
                var swiper = new Swiper('.swiper-container', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    pagination: '.swiper-pagination',
                    paginationType: 'fraction'
                });

            //    点击视频播放按钮播放视频
                $('.video-play').click(function () {
                    $('#video').get(0).play();
                    $(this).removeClass('.i-active')
                });

                //轮播图下面  收藏/取消收藏
                $('.shoucang').unbind().click(getShoucangStatus);

                //轮播图下面  收藏/取消收藏
                function getShoucangStatus() {
                    var that = $(this);
                    $.ajax({
                    url:C.interface.toggleStore,
                    type:'POST',
                    dataType:'json',
                    data:{
                        token:C.token,
                        productId:productId
                    },
                    success:function (response) {
                        if(response.errorCode == '200'){
                            var data=response.data;
                            that.addClass('textDetail-img-active');
                            that.find('span').html('取消');
                            if(data=='002'){
                                that.removeClass('textDetail-img-active');
                                that.find('span').html('收藏');
                            }

                        }else if(response.errorCode == '0'){
                            //    跳转到登录页面
                        }else{
                            alert(response.errorMsg);
                        }
                    },
                    error:function () {
                        alert('服务器异常')
                    }
                });
            }

                // // 新品推荐  收藏/取消收藏
                $('.cdt-right').click(function (e) {
                    var that=$(this)
                    e.stopPropagation();
                    e.preventDefault();
                    var id=that.parent().parent().parent().attr('data-id');
                    $.ajax({
                        url:C.interface.toggleStore,
                        type:'POST',
                        dataType:'json',
                        data:{
                            token:C.token,
                            productId:id
                        },
                        success:function (response) {
                            if(response.errorCode == '200'){
                                var data=response.data;
                                that.addClass('cdt-right-active');
                                that.find('span').html('取消');
                                if(data=='002'){
                                    that.removeClass('cdt-right-active');
                                    that.find('span').html('收藏');
                                }

                            }else if(response.errorCode == '0'){
                                //    跳转到登录页面
                            }else{
                                alert(response.errorMsg);
                            }
                        },
                        error:function () {
                            alert('服务器异常')
                        }
                    });
                });

            }else if(data.errorCode==0){
                //    跳转到登录页面
            }else{
                alert(data.errorMsg)
            }
        },
        error:function () {
            alert('服务器异常')
        }

    });

})();

