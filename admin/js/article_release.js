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
        onClose: false, //        //是否为选中日期后关闭弹层，为false时选中日期后关闭弹层
    });

    // 启用富文本插件
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()























})