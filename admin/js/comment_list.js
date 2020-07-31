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
                pagination(info, 7)


            }
        }
    });

    // 封装分页功能函数
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
                //  console.log(event,page);
                // page是当前页码
            }
        })
    }





















})