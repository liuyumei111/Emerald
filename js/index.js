(function () {

    //接受原生拼接传过来的token ：注意之所以存储到本地存储因为原生只在首页传递了token给我们
    tokenData=locationSearcher('token');
    // 1.将token写到本地存储中
    localStorage.setItem('token',tokenData);

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



