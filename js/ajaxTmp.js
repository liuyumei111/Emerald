$.ajax({
    url:C.interface.index,
    type:'POST',
    dataType:'json',
    data:{

    },
    success:function (data) {
        if(data.errorCode==200){
            var data=data.data;

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