// 这是主页的js文件
// 业务功能：
// 1-文章分类数据的渲染
// 2-热点图片的数据渲染
// 3-最新资讯
// 4-一周热门排行
// 5-最新评论
// 6-焦点关注


$(function () {
    // 一打开页面就渲染页面
    // 标题分类的渲染
    $.ajax({
        url: "http://localhost:8080/api/v1/index/category",
        type: 'get',
        success: function (res) {
            console.log(res);
            htmlStr = template('tmp', res);
            $('.left_menu').html(htmlStr);
            $('.level_two ').html('<li class="up"></li>' + htmlStr);
        }
    });
    // 图片的渲染
    $.ajax({
        type: 'get',
        url: "http://localhost:8080/api/v1/index/hotpic",
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                // htmlStr = template('piclist', res);
                // $('.focus_list').html(htmlStr);
                for (var i = 0; i < res.data.length; i++) {
                    $('.focus_list>li').eq(i).children('a').attr('href', './article.html?id=' + res.data[i].id);
                    $('.focus_list>li').eq(i).children('a').children('img').attr('src', res.data[i].cover);
                    $('.focus_list>li').eq(i).children('p').text(res.data[i].title)

                }
            }
        }
    });
    // 最新资讯的渲染
    $.ajax({
        url: "http://localhost:8080/api/v1/index/latest",
        type: 'get',
        success: function (res) {
            console.log(res);
            htmlStr = template('news', res);
            $('.common_news').html(htmlStr);
        }
    });

    // 一周热门排行
    $.ajax({
        url: "http://localhost:8080/api/v1/index/rank",
        type: 'get',
        success: function (res) {
            console.log(res);
            // 不用模板引擎
            for (var i = 0; i < res.data.length; i++) {
                $('.content_list>li').eq(i).children('a').attr('href', './article.html?id=' + res.data[i].id);
                $('.content_list>li').eq(i).children('a').text(res.data[i].title);
            }
        }
    });

    // 最新评论
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        type: 'get',
        success: function (erd) {
            console.log(erd);
            if (erd.code == 200) {
                htmlStr = template('temp', erd);
                $('.content_list').html(htmlStr);
            }
        }
    })

    // 焦点关注
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        type: 'get',
        success: function (erd) {
            console.log(erd);
            if (erd.code == 200) {
                htmlStr = template('tttt', erd);
                $('.content_list').html(htmlStr);
            }
        }
    })

    // 单击搜索按钮跳转到文章列表页面
    // 给搜索按钮注册点击事件 
    $('.search_btn').on('click', function () {
        // 获取搜索框中的数据
        var txtval = $('.search_txt').val();
        // 如果搜索框中没有数据，则不需要跳转，
        if (txtval.trim() == '') {
            alert('输入不正确！请重新输入');
            return//阻止代码向下执行
        };
        // 如果有数据，就跳转到列表页面
        location.href = './list.html?search=' + txtval
    })


















})