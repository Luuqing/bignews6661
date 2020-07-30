// 这是工具函数，封装的处理地址栏的参数
var utils = {
    converToObj: function (search) {
        var arr = search.split('&');
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            // 继续以等于号切割
            var temp = arr[i].split('=');
            obj[temp[0]] = temp[1];

        }
        return obj
    }
}