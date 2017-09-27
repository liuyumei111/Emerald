(function () {

    // 登录成功
    $.ajax({
        url:C.interface.login,
        type:'Post',
        dataType:'json',
        data:{
            phone:'13121485350',
            pwd:'123456',
            token:'201709241132286040c30df2af7a8a4a70bc9d8eb1d5ad1eaa'
        },
    });


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
                console.log(data);
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
                })
            }else if(data.errorCode==0){
            //    跳转到登录页面
            }else{
                alert(data.errorMsg)
            }

        },
        error:function () {
            alert('服务器异常')
        }
    })





})();
