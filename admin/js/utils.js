// 这是工具函数，封装的处理地址栏的参数
(function (w) {

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

    // 向外面暴露utils,把他作为window的一个属性
    w.utils = utils;

})(window)