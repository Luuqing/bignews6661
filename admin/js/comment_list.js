// 这是一个文章评论列表页面
// 完成的功能有：
// 1-默认第一页评论数据的渲染，启用分页插件
// 2-删除评论
// 3-通过评论
// 4-拒绝评论

$(function () {
    // 1-一跳转到这个页面就立即发送ajax请求获取评论数据
    // 2-发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.comment_list,
        success: function (info) {
            console.log(info);
            if (info.code == 200) {
                // 渲染在页面中
                var htmlstr = template('tmp', info.data);
                $('tbody').html(htmlstr);
                // 启用分页功能
                pagination(info, 10)
            }
        }
    });

    // 封装分页功能函数
    var currentPage = 1;
    function pagination(info, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: info.data.totalPage, // 总页数
            visiblePages: visiblePages || 7, // 可见最大上限页码值
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false, // 不要默认点击 
            onPageClick: function (event, page) {
                // 启用分页功能，单击页码的时候，要根据当前页码向服务器发送请求
                // 2-发送ajax请求
                currentPage = page;
                $.ajax({
                    type: 'get',
                    url: BigNew.comment_list,
                    data: {
                        page: page,
                        // perpage: 10
                    },
                    success: function (info) {
                        console.log(info);
                        if (info.code == 200) {
                            // 渲染在页面中
                            var htmlstr = template('tmp', info.data);
                            $('tbody').html(htmlstr);
                        }
                    }
                });
            }
        })
    };

    // 通过按钮
    // 给通过按钮注册事件
    // 发送ajax请求，这里要带上id
    // 请求成功之后让这条评论的状态更新成’通过‘

    $('tbody').on('click', ".btn-pass", function () {
        // 获取当前数据的id
        var id = $(this).attr('data-id');
        // console.log(id);
        var that = this;
        $.ajax({
            url: BigNew.comment_pass,
            type: 'post',
            data: {
                id
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    $(that).parent().prev().text(res.msg);
                }
            }
        })
    })


    // 拒绝接口
    $('tbody').on('click', ".btn-reject", function () {
        // 获取当前数据的id
        var id = $(this).attr('data-id');
        // console.log(id);
        var that = this;
        $.ajax({
            url: BigNew.comment_reject,
            type: 'post',
            data: {
                id
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    $(that).parent().prev().text(res.msg);
                }
            }
        })
    })

    // 删除完成
    $('tbody').on('click', ".btn-delete", function () {
        // 获取当前数据的id
        var id = $(this).attr('data-id');
        // console.log(id);
        var that = this;
        $.ajax({
            url: BigNew.comment_delete,
            type: 'post',
            data: {
                id
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    $(that).parent().prev().text(res.msg);


                    // 发送ajax重新渲染
                    $.ajax({
                        type: 'get',
                        url: BigNew.comment_list,
                        data: {
                            page: currentPage
                        },
                        success: function (info) {
                            console.log(info);
                            console.log(info.data.totalPage );
                            if (info.code == 200) {
                                // 渲染在页面中
                                var htmlstr = template('tmp', info.data);
                                $('tbody').html(htmlstr);

                                // 判断最后一页的特殊情况
                                if (info.data.totalPage != 0 && info.data.data.length == 0) {
                                    currentPage = currentPage - 1;
                                };
                                // 改变页码显示
                                // 第1个参数是当总页码改变的时候  相当于是一个事件名称
                                // 第2个参数是现在的总页码值   最新的总页码值
                                // 第3个参数是默认显示的页码值  就是说默认是从第1页开始显示
                                $('#pagination-demo').twbsPagination('changeTotalPages', info.data.totalPage, currentPage)

                            }
                        }
                    });


                }
            }
        })
    })























})