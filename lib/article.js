//此页面是一个文章详细信息的页面
// 此页面的功能
// 1-当前文章的详细信息渲染
// 2-发表评论的功能
// 3-具体的评论内容


$(function () {
    // 1-当前文章的详细信息渲染
    // 1-1获取地址栏中的参数
    var str = location.search.slice(1);

    // 获取参数中的id
    var id = utils.converToObj(str).id;
    // 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template('temp', res.data);
                $('.main_con .left_con .box').html(htmlStr);
                getCommentData()

            }
        }
    });

    // 发表评论的功能
    $('#myForm').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            data: $(this).serialize() + '&articleId=' + id,
            success: function (res) {
                console.log(res);
                if (res.code == 201) {
                    alert(res.msg);
                    // 清空输入框
                    $('#myForm')[0].reset()
                }
            }
        })
    })

    //评论列表
    function getCommentData() {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                articleId: id
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('commentList', res)
                    $('.comment_list_con').html(htmlStr)

                    // 显示多少条数据
                    $('.comment_count').html(`${res.data.length}条评论`)
                }
            }
        })
    }
})