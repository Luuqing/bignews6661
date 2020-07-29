// 文字列表页
// 1-文字分类数据的渲染
// 2-默认第一页文字数据的渲染
// 3-启用分页并实现分页功能
// 4-删除文章

$(function () {

    // 1-文章分类数据的渲染
    // 2-一跳转到这个页面就立即发送ajax请求
    // 3 -
    $.ajax({
        url: window.BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('#selCategory').html(template('tmp', res))
            }
        }
    });

    // 获取文章列表页中的默认第一页数据，渲染页面
    //  发送ajax请求
    $.ajax({
        url: BigNew.article_query,
        type: 'get',
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template('articlelist', res.data);
                $('#tbody').html(htmlStr);

                // 根据响应回来的数据判断是否启用分页
                if (res.data.totalCount == 0) {
                    // 此时说明没有查到对应条件当的数据，
                    $('#pagination-demo').hide().next().show()
                } else {
                    $('#pagination-demo').show().next().hide()
                    pagination(res)
                }
            }
        }
    });

    // 启用分页功能
    // 分页插件的代码比较多，可以封装分页器
    var currentPgae = 1;
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            // startPage: 1,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                console.log(event);
                console.log(page);
                currentPgae = page;
                // 实现分页功能
                // 要根据当前页码来发送ajax
                $.ajax({
                    url: BigNew.article_query,
                    type: 'get',
                    data: {
                        type: $('#myform select[name=type]').val(),
                        state: $('#myform select[name=state]').val(),
                        key: $('#myform input[name=key]').val(),
                        page: page,
                        perpage: 6
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.code == 200) {
                            var htmlStr = template('articlelist', res.data);
                            $('#tbody').html(htmlStr);
                        }
                    }
                });
            }
        });
    }

    // // 实现筛选功能
    // // 给筛选按钮注册事件
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        console.log(111);
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#myform input[name=key]').val(),
                type: $('#myform select[name=type]').val(),
                state: $('#myform select[name=state]').val(),
                page: 1,//默认显示第一页
                perpage: 6
            },
            success: function (res) {
                console.log(res);
                htmlStr = template('articlelist', res.data);
                $('#tbody').html(htmlStr);
                // // 筛选按钮的特殊判断
                if (res.data.totalCount == 0) {
                    // 此时说明没有查到对应条件当的数据，
                    $('#pagination-demo').hide().next().show()
                } else {
                    $('#pagination-demo').show().next().hide()
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
                }
            }
        })
    });

    // 4-获取删除按钮的id 根据文章id来删除数据
    $('#delmodal').on('shown.bs.modal', function (e) {
        window.articleId = $(e.relatedTarget).data('id')
    })


    // 删除文章
    // 1-单击删除按钮的时候，要弹出来模态框
    // 2-修改模态框中的样式
    // 3-单击删除数据模态框中的确定按钮 删除文章
    $(' #delmodal .del-btn-sure').on('click', function () {
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            data: {
                id: window.articleId,
            },
            success: function (res) {
                console.log(res);

                if (res.code == 204) {
                    // 如果删除成功，隐藏模态框
                    $('#delmodal').modal('hide');
                    // 删除成功之后要显示当前页面的剩余数据，其实就是和分页功能相同的业务
                    $.ajax({
                        url: BigNew.article_query,
                        type: 'get',
                        data: {
                            type: $('#myform select[name=type]').val(),
                            state: $('#myform select[name=state]').val(),
                            key: $('#myform input[name=key]').val(),
                            page: currentPgae,
                            perpage: 6
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.code == 200) {
                                var htmlStr = template('articlelist', res.data);
                                $('#tbody').html(htmlStr);
                                // 如果删除完了最后一页的数据，应该要显示前一页的数据
                                if (res.data.totalCount != 0 && res.data.data.length == 0) {
                                    currentPgae -= 1;
                                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPgae)
                                } else if (res.data.totalCount == 0) {
                                    $('#pagination-demo').hide().next().show();
                                }
                            }
                        }
                    });
                };

            }
        })
    });

    // 单击发布按钮，跳转到发布文章页面，并让左侧响应按钮高亮
    // 1-给发表文章按钮注册点击事件
    // 2-触发左侧按钮的点击事件
    $('#release_btn').on('click', function () {
        // 点击触发左侧按钮高亮
        parent.$('.menu .level02 li:eq(1)').click();
    })




















})