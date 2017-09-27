//类别下拉控制方法
$.fn.toggleList = function (flag) {
    var oLis = $(this).find("li");
    var endIndex = oLis.size()-1;
    if (flag) {
        oLis.slice(4, endIndex).show();
    } else {
        oLis.slice(4, endIndex).hide();
    }
    return $(this);
};


//根据url中的key获取对应的value:
//网址:https://www.baidu.com?a=1&b=1
//locationSearcher('a')
function locationSearcher(key) {
    var search = location.search.split('?');
    if(search.length>1){
        var params = search[1].split('&');
        for(var i=0;i<params.length; i++){
            var item = params[i].split('=');
            var k = item[0];
            if(key == k){
                return item[1];
            }
        }
    }
    return null;
}



//分离以逗号隔开的Json数据
Handlebars.registerHelper('splitDetailImg',function (value) {
    var splitvalue=value.split(',');

    var reValues=[];

    for ( var i=0; i<splitvalue.length; i++ ){
        var reValue={};
        reValue.name=splitvalue[i];
        reValues[i]=reValue;
    }
    return reValues;

});