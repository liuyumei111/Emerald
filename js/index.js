(function () {

    //接受原生拼接传过来的token ：注意之所以存储到本地存储因为原生只在首页传递了token给我们
    tokenData=locationSearcher('token');
    // 1.将token写到本地存储中
    localStorage.setItem('token',tokenData);

    //点击用户头像
    $('.user').unbind().bind('click',function (event) {
        console.log('点击了首页左侧头像');
        //        阻止冒泡事件
        event.stopPropagation();
        // 去除默认事件
        event.preventDefault();
        //给安卓或是ios传过去的数据,如果这里的数据是要通过ajax请求过来的就正常发送请求,在请求成功后判断进行下面的操作
        var data='';
        var ua = navigator.userAgent.toLowerCase();  //浏览器类型
        if (/iphone|ipad|ipod/.test(ua)) {
            // alert('这是ios机型');
            //点击首页左侧头像iOS跳转
            iosClickUser(data);
        } else {
            // alert('这是android机型');
            //点击首页左侧头像安卓跳转   注意：安卓的数据类型比较特殊要字符串的
            androidClickUser(JSON.stringify(data));
        }
    });
    //点击首页左侧头像安卓跳转
    function androidClickUser(param) {
        window.huifa.clickUser(param);     //clickUser这个方法是和原生共同协调好一起定义的
    }

    //点击首页左侧头像ios跳转
    function iosClickUser(param) {
        window.webkit.messageHandlers.clickUser.postMessage(param);     //clickUser这个方法是和原生共同协调好一起定义的
    }





    //编译首页数据
    var indexBoxTpl= $('#index-box').html();
    var indexBoxCmp=Handlebars.compile(indexBoxTpl);

    $.ajax({
        url:C.interface.index,
        type:'POST',
        dataType:'json',
        success:function (data) {
            if(data.errorCode==200){
                var data=data.data;
                // console.log(data);
                //轮播图渲染数据
                $('#box').html(indexBoxCmp(data));

                //轮播图初始化
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });

                //图片懒加载初始化
                $(function() {
                    $("img.lazy").lazyload()
                });

                <!--类别下拉-->
                var zhanKai=$('.category-hide');
                var isShow = false;
                //点击最后一个li
                $('.category-ol').toggleList(isShow).find("li").last().on("click",function(){
                    isShow = !isShow;
                    $('.category-ol').toggleList(isShow);
                    if(isShow){
        //z这里控制按钮变化
                        zhanKai.find('img').attr('src','images/show.png');
                        zhanKai.find('span').html('收起')
                    }else{
                        zhanKai.find('img').attr('src','images/hide.png');
                        zhanKai.find('span').html('展开')
                    }
                });

            }else if(data.errorCode==0){
            //    token过期,原生跳登录
            }else{
                alert(data.errorMsg)
            }
        },
        error:function () {
            alert('服务器异常')
        }
    });


})();
