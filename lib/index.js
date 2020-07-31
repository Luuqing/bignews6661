// 这是主页的js文件
// 业务功能：
// 1-文章分类数据的渲染
// 2-热点图片的数据渲染
// 3-最新资讯
// 4-一周热门排行
// 5-最新评论
// 6-焦点关注


$(function(){
    // 一打开页面就渲染页面
    $.ajax({
        url:"http://localhost:8080/api/v1/index/category",
        type:'get',
        success:function(res){
            console.log(res);
            htmlStr = template('tmp',res);
            $('.left_menu').html(htmlStr);
            $('.level_two ').html('<li class="up"></li>' + htmlStr);
        }
    })

})