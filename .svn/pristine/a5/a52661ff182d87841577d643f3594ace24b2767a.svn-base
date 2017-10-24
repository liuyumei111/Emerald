//获取到参数
var shapeId = locationSearcher('shapeId');
var areaId = locationSearcher('areaId');
var koujingId = locationSearcher('koujingId');


//编译搜索/筛选数据
var shopRecommendChoiceBoxTpl = $('#shopRecommendChoice-box').html();
var shopRecommendChoiceBox = Handlebars.compile(shopRecommendChoiceBoxTpl);

//ajax加载商品列表(分页)
var range = 200, //距下边界长度/单位px
    maxnum = 0, //设置总数
    num = 0, //当前数量
    start = '0',
    flag = 0,
    pageLength = '8';

function choiceBoxData() {
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
        url: C.interface.filter,
        type: 'POST',
        dataType: 'json',
        data: {
            shapeId: shapeId,
            areaId: areaId,
            koujingId: koujingId,
            start: start,
            length: pageLength,
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
                    $('.shopRecommendChoice-box').append(shopRecommendChoiceBox(data));
                    //图片懒加载初始化
                    $(function() {
                        $("img.lazy").lazyload()
                    });
                } else {
                    $(".no-info").show();
                    $(".loader").hide();
                    num = maxnum + 1;
                }
                flag = 0;
            }else if(data.errorCode==0){
                //    token过期,跳转到登录页面
            }else{
                alert(data.errorMsg)
            }

        },
        error: function () {
            alert('服务器异常')
        }
    });

}
choiceBoxData();



//到底加载数据
$(window).scroll(function () {
    //已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
    //页面高度
    var scrollHeight = $(document).height();
    //浏览器窗口高度
    var windowHeight = $(this).height();
    console.log('这是浏览器窗口的高度'+windowHeight);
    console.log('节点高度'+scrollHeight);
    //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
    if (scrollTop + windowHeight == scrollHeight) {
        addRecommend();
    }else if(scrollTop + windowHeight !== scrollHeight){
        $('.no-info').hide();
    }

});


