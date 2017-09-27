
//    搜索
apiready = function(){
    api.parseTapmode();
};
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");
if(searchBar){
    searchBarInput.onclick = function(){
        searchBarBtn.style.marginRight = 0;
    };
    //oninput用户输入(聚焦)时触发
    searchBarInput.oninput = function(){
        if(this.value.length){
            searchBarClearBtn.style.display = 'block';
            searchBarBtn.classList.add("aui-text-info");
            searchBarBtn.textContent = "搜索";
        }else{
            searchBarClearBtn.style.display = 'none';
            searchBarBtn.classList.remove("aui-text-info");
            searchBarBtn.textContent = "取消";
        }
    }
}

//输入框没有内容、点击x号
searchBarClearBtn.onclick = function(){
    this.style.display = 'none';
    searchBarInput.value = '';
    searchBarBtn.classList.remove("aui-text-info");
    searchBarBtn.textContent = "取消";
};

searchBarBtn.onclick = function(){
    //用户输入的搜索词
    var keywords = encodeURI(searchBarInput.value);
    console.log(keywords);
    if(keywords.length){
        searchBarInput.blur();
        console.log(keywords);
    }else{
        this.style.marginRight = "-"+this.offsetWidth+"px";
        searchBarInput.value = '';
        searchBarInput.blur();
    }
    window.location.href='searchShop.html?name='+keywords+'';
    searchBarInput.value=''
};
//点击手机软键盘进行搜索
// $('.search-form').submit(function (e) {
//     // e.preventDefault();
//     var keywords = encodeURI(searchBarInput.value);
//     window.location.href='searchShop.html?name='+keywords+'';
// });
