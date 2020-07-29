//  这是文章发表页面
// 要实现的业务功能：
// 1-实现文章分类数据的渲染
// 2-实现待上传图片的本地预览
// 3-将日期插件引入到当前页面中
// 4-将富文本编辑器引入到当前页面中
// 5-单击‘发布’按钮 文章已是发布状态
// 6-单击‘存为草稿’来发布的文章 文章状态时一个草稿状态

$(function () {
    // 文章分类数据的渲染
    // 发送ajax渲染所有的文章分类的数据

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

    // // 给file表单元素注册onchange事件
    // $('#exampleInputFile').change(function () {
    //     // 1-获取用户选择的图片
    //     var file = this.files[0];
    //     // console.dir(file);
    //     // 2-将文件转为src路径
    //     var url = URL.createObjectURL(file);
    //     // 3-将url路径赋值给img标签的src
    //     $('.user_pic').attr('src', url);
    // });

    // 1-实现待上传图片的本地预览
    // 2-给上传文章按钮注册事件
    $('#inputCover').change(function () {
        // 1-获取用户选择的图片
        // var file = this.files[0];
        // // 2-将文件转为src路径
        // var url = URL.createObjectURL(file);
        // console.log(url);
        // // 3-将url路径赋值给img标签的src
        // $('.article_cover').attr('src',url);

        // 简写：
        $('.article_cover').attr('src', URL.createObjectURL(this.files[0]))
    });

    // 启用日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 2090009,
        onClose: false, //        //是否为选中日期后关闭弹层，为false时选中日期后关闭弹层
    });

    // 启用富文本插件
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    // 给form表单注册事件，通过两个按钮来触发‘发布’‘存为草稿’
    // 如果单击的是‘发布’按钮，则当前的文章应该是一个‘发布’的状态 ‘发布’状态的文章在前台可以被所有人的查看
    // 如果单击的是‘存为草稿’按钮 则当前添加的文章数据是一个‘草稿’的状态

    // 5.1给form表单注册事件 submit click
    $('#form').on('click', '.btn', function (e) {
        // 5.2阻止默认行为
        e.preventDefault();
        // 5.3获取要发送给服务器的数据
        var data = new FormData($('#form')[0]);
        // 将文章内容追加到data中去
        data.append('content', editor.txt.html());

        // 5.4？文章状态，可以通过判断单击的是哪个按钮来判断文章的状态
        if ($(this).hasClass('btn-release')) {
            data.append('state', '已发布')
        } else {
            data.append('state', '草稿')
        }

        // 5.5发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            processData: false,
            contentType: false,
            success: function (info) {
                console.log(info);
                // 5.6发布成功之后跳转到文章列表页面
                if (info.code == 200) {
                    window.location.href = './article_list.html'
                    // window.history.back()   
                    // 同时左侧按钮应该对应高亮
                    parent.$('.menu .level02 li:eq(0)').click();
                }
            }
        })

    })





































})