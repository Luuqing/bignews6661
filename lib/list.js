// 这是前台的列表页面
// 1-只能通过文字分类或是搜索关键词来跳转到这个页面
// 2-否则需要跳转到index.html
// 3-要根据id或根据搜索关键词来查询列表页中的数据
// 4-使用模板渲染到页面上

$(function () {
    // 判断是否是从主页面的分类或是搜索关键词跳转过来的
    // 获取url地址栏中的数据
    var serachStr = location.search;
    console.log(serachStr);
    // 根据数据进行判断，是否是正常跳转
    if (!serachStr) {
        // 跳转到主页面
        location.href = './index.html';
        return//阻止代码的向下执行
    }

    // 获取url地址栏中的数据，并进行判断
    // 第一种写法： 
    var obj = utils.converToObj(serachStr.slice(1));
    // console.log(id);
    if (obj.id) {
        data = { type: obj.id }
    } else {

        data = { key: decodeURI(obj.search) }
    }

    // 第二种写法：
    // if (serachStr.indexOf('search') == 1) {

    //     var abcd = location.href.split('=')[1];
    //     data = { key: decodeURI(abcd) }

    // } else if (serachStr.indexOf('id') == 1) {
    //     var id = location.href.split('=')[1];
    //     data = { type: id }

    // } else {
    //     window.location.href = './index.html'
    // }


    $.ajax({
        url: 'http://localhost:8080/api/v1/index/search',
        type: 'get',
        data: data,
        success: function (red) {
            console.log(red);
            if (red.code == 200) {
                var str = '';
                // 根据服务器响应回来的数据
                if (red.data.data.length == 0) {
                    $('.main_con .setfr').html('暂时没有数据')
                } else {
                    if (obj.id) {
                        str = `   <div class="list_title">
                        <h3>分类：${red.data.data[0].category}</h3>
                    </div>`
                    } else {
                        str = `   <div class="list_title">
                        <h3>关键词：${decodeURI(obj.search)}</h3>
                    </div>`
                    }
                }
                var htmlStr = template('tmp', red.data);
                $('.main_con .left_con').html(str + htmlStr);
            }
        }
    })


})