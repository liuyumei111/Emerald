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
            productId:productId
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

                //    点击轮播图收藏ajax
                $('.shoucang').click(function () {
                    var _this=$(this);
                 if(_this.hasClass('textDetail-img-active')){
                     // _this.removeClass('textDetail-img-active')
                     //取消收藏
                     $.ajax({
                         url:C.interface.cancelStore,
                         type:'POST',
                         dataType:'json',
                         data:{
                             token:C.marketToken,
                             productId:productId
                         },
                         success:function (data) {
                             if(data.errorCode==200){
                                 _this.removeClass('textDetail-img-active')

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
                 }else {
                     // _this.addClass('textDetail-img-active')
                     //收藏
                     $.ajax({
                         url:C.interface.addStore,
                         type:'POST',
                         dataType:'json',
                         data:{
                             token:C.marketToken,
                             productId:productId
                         },
                         success:function (data) {
                             if(data.errorCode==200){
                                 _this.addClass('textDetail-img-active')

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
                 }

                });

                //    点击精品收藏ajax
                $('.shoucang-jp').click(function () {
                    var _this=$(this);
                   var id=_this.parent().parent().parent().attr('data-id');
                   if(_this.hasClass('cdt-right-active')){
                       //取消收藏
                       // _this.removeClass('cdt-right-active')
                       $.ajax({
                           url:C.interface.cancelStore,
                           type:'POST',
                           dataType:'json',
                           data:{
                               token:C.marketToken,
                               productId:id
                           },
                           success:function (data) {
                               if(data.errorCode==200){
                                   _this.removeClass('cdt-right-active')

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
                   }else {
                       //收藏
                       // _this.addClass('cdt-right-active')
                       $.ajax({
                           url:C.interface.addStore,
                           type:'POST',
                           dataType:'json',
                           data:{
                               token:C.marketToken,
                               productId:id
                           },
                           success:function (data) {
                               if(data.errorCode==200){
                                   _this.addClass('cdt-right-active')

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
                   }
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

