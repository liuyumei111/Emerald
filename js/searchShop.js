(function () {
    /*后退一步*/
    $('.history').click(function () {
        history.go(-1);
    });

    //1.类别id  2.搜索关键字
    var categoryId = locationSearcher('categoryId');
    var name = decodeURI(locationSearcher('name'));
    if (name == 'null') {
        name = ''
    }

    //编译新品推荐数据
    var searchShopBoxTpl = $('#searchShop-box').html();
    var searchShopBox = Handlebars.compile(searchShopBoxTpl);


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
            url: C.interface.query,
            type: 'POST',
            dataType: 'json',
            data: {
                start: start,
                length: pageLength,
                categoryId: categoryId,
                name: name,
            },
            success: function (data) {
                if (data.errorCode == 200) {
                    //每次都加1
                    num++;
                    //请求回来的数据
                    var data = data.data;
                    console.log(data);
                    //如果返回的数据是0条直接显示没有这个商品
                    if (data.count == 0) {
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
                        $('.searchShop-box').append(searchShopBox(data));
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
                } else if (data.errorCode == 0) {
                    //    跳转到登录页面
                } else {
                    alert(data.errorMsg)
                }

            },
            error: function () {
                alert('服务器异常')
            }
        })
    }

    addRecommend();

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
            addRecommend();
        } else if (scrollTop + windowHeight !== scrollHeight) {
            $('.no-info').hide();
        }
    });

})();