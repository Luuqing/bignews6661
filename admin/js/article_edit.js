// 这是一个文章编辑页面的业务
// 1-首先先要将带编辑当文章数据 渲染在当前页面上
// 2-应该先根据文章的id来查询待编辑的数据
// 3-然后将查到的数据渲染到页面上
// 4-当文章数据修改完成后将数据再更新回服务器


$(function () {

    // 一跳转到编辑页面就马上渲染文章编辑页面的文章类别
    $.ajax({
        url: window.BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('select.category').html(template('tmp', res))
            }
        }
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

    // 第一种写法：
    // 1-获取传过来的Id，根据id 渲染页面
    // var id = window.location.href.split('=')[1];
    // console.log(id);

    // 第二种写法：
    // var search = location.href.split('?')[1];
    // var id = utils.converToObj(search).id;
    // console.log(id);

    // 第三种写法：
    var search = location.search.slice(1);
    var id = utils.converToObj(search).id;
    console.log(id);

    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                // 通过隐藏域设置上id
                $('#form input[name=id]').val(res.data.id)
                $('#form  input[name=title]').val(res.data.title);
                $('#form .article_cover').attr('src', res.data.cover);
                $('#form #categoryId').val(res.data.categoryId)
            }
        }
    });
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
    // 文章更新
    // 给form表单注册单击事件，用事件委托注册
    // 通过子按钮‘修改’‘存为草稿’来触发
    // 注意要将富文本编辑器的数据添加上
    // 判断一下单击的是哪个按钮‘修改’‘存为草稿’
    // 更新完成跳转到文章列表页

    $('form').on('click', '.btn', function (e) {
        //阻止表单的默认行为
        e.preventDefault();
        // 获取页面中表单的数据
        var data = new FormData($('form')[0]);
        // 将文章内容追加到data中去
        data.append('content', editor.txt.html());
        //文章状态，通过判断单击的是哪个按钮来判断文章当王主管哪条
        console.log(data);
        if ($(this).hasClass('btn-release')) {
            data.append('state', '已发布')
        } else {
            data.append('state', '草稿')
        };
        // 发送ajax请求
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            data:data,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res);
                if(res.code == 200){
                    window.location.href = './article_list.html'
                }
            }
        })
    })
})