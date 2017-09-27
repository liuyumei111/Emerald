(function () {
    /*后退一步*/
    $('.history').click(function () {
        history.go(-1);
    });

    //点开筛选层
    $('.choiceTarget').click(function () {
        $('.choice').css('display','block');
    });

    //编译新品推荐数据
    var shopRecommendBoxTpl= $('#shopRecommend-box').html();
    var shopRecommendBoxCmp=Handlebars.compile(shopRecommendBoxTpl);

    //编译筛选条件
    var choiceTpl=$('#choice').html();
    var choiceCmp=Handlebars.compile(choiceTpl);

    //ajax加载商品列表(分页)
    var range = 200, //距下边界长度/单位px
        maxnum = 0, //设置总数
        num = 0, //当前数量
        start = '0',
        flag = 0,
        pageLength = '8';

    //加载首批数据
    function addRecommend() {
        //如果条件不成立直接不执行
        if (flag) {
            return;
        }
        //条件成立
        //显示加载更多
        $(".no-info").hide();
        $('.loader').show();
        flag = 1;

        $.ajax({
            url:C.interface.productMore,
            type:'POST',
            dataType:'json',
            data:{
                start:start,
                length:pageLength,
            },
            success:function (data) {
                if(data.errorCode==200){
                    //每次都加1
                    num++;
                    //请求回来的数据
                    var data=data.data;
                    console.log(data);
                    //如果返回的数据是0条直接显示没有这个商品
                    if(data.count==0){
                        $('.no-info').addClass('none-data')
                    }
                    //请求数据成功就隐藏正在加载
                    $('.loader').hide();
                    //商品的总数
                    maxnum = data['count'];
                    //从第几条数据开始
                    start = num * pageLength;
                    //等于0的时候显示没有更多信息了...
                    if (maxnum == 0) {
                        $('.no-info').show();
                    }
                    //如果请求回来的数据条数大于0，在数据后插入新新数据，不覆盖旧数据;否则就显示没有更多信息了
                    if (data.list.length > 0) {
                        $('.shopRecommend-box').append(shopRecommendBoxCmp(data));

                        //图片懒加载初始化
                        $(function() {
                            $("img.lazy").lazyload()
                        });
                    } else {
                        // $(".no-info").removeClass('loader-none');
                        // num = maxnum + 1;
                        $(".no-info").show();
                        $(".loader").hide();
                        num = maxnum + 1;
                    }
                    flag = 0;
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
    }
    addRecommend();

    //渲染筛选条件
    $.ajax({
        url:C.interface.propertys,
        type:'POST',
        dataType:'json',
        success:function (data) {
            if(data.errorCode==200){
                // var data=data.data;
                console.log(data);
                $('.choice').html(choiceCmp(data))

                //展开二级菜单
                $('.choice-target').click(function () {
                    var _this = $(this);
                    if ($(this).next('.choice-ul-ol').css('display') == 'none') {
                        _this.next('.choice-ul-ol').removeClass('none');
                        _this.css('color', '#c2b27f');
                        _this.find('i').addClass('rotate-i');

                        //    选择选项(要确定是单选还是多选)
                        _this.next('.choice-ul-ol').find('li').click(function () {
                            if($(this).hasClass('li-active')==false){
                                //多选
                                // $(this).addClass('li-active')
                                //单选
                                $(this).addClass('li-active').siblings().removeClass('li-active')

                            }else {
                                //去掉多选
                                // $(this).removeClass('li-active')
                            }
                        })
                    } else {
                        _this.next('.choice-ul-ol').addClass('none');
                        _this.css('color', '#555861');
                        _this.find('i').removeClass('rotate-i');
                    }
                });

                //点击x关闭筛选层
                $('.close').click(function () {
                    $('.choice').css('display','none');
                });
                //获取到筛选关键字，发送给后台
                $('.goals').click(function () {
                    $('.choice').css('display','none');
                    var shapeId = $('.choice-target0').next().find('.li-active').attr('data-id');
                    var areaId = $('.choice-target1').next().find('.li-active').attr('data-id');
                    var koujingId = $('.choice-target2').next().find('.li-active').attr('data-id');
                    console.log(shapeId);
                    console.log(areaId);
                    console.log(koujingId);
                    window.location.href='shopRecommendChoice.html?shapeId='+shapeId+'&areaId='+areaId+'&koujingId='+koujingId+''

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

    //到底加载数据
    $(window).scroll(function () {
        //已经滚动到上面的页面高度
        var scrollTop = $(this).scrollTop();
        //页面高度
        var scrollHeight = $(document).height();
        //浏览器窗口高度
        var windowHeight = $(this).height();
        //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
        if (scrollTop + windowHeight == scrollHeight) {
            addRecommend()
        }else if(scrollTop + windowHeight !== scrollHeight){
            $('.no-info').hide();
        }

    });

})();