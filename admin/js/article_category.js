$(function () {
    // 页面一加载就发送ajax请求数据
    render();
    function render() {
        $.ajax({
            url: window.BigNew.category_list,
            type: 'get',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    $('tbody').html(template('tmp', res))
                }
            }
        });
    };
    // 添加文章分类
    // 1-给模态框的确定按钮注册事件
    // 2-发送ajax请求
    // 3-如果添加成功，则应该要隐藏模态框
    // 4-还应该要重新进行局部刷新

    $('#myModal .btn-sure').on('click', function () {
        // console.log(111);
        var id = $('#myModal input[name=id]').val();
        $.ajax({
            // url: BigNew.category_add,
            url:id? BigNew.category_edit : BigNew.category_add,
            type: 'post',
            data: $('#myform').serialize(),
            success: function (res) {
                console.log(res);
                if (res.code == 201 || res.code == 200) {
                    $('#myModal').modal('hide');
                    render();
                }
            }
        })
    });
    // 给删除文章的模态框注册事件
    $('#delmodal').on('shown.bs.modal', function (e) {
        window.categoryId = $(e.relatedTarget).data('id');
    })
    // 删除分类
    // 注意：这个按钮是动态添加的，所以需要注册委托事件
    // 注册委托事件的父元素不能是动态添加的，否则无法委托
    $('.del-btn-sure').on('click', function () {
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: window.categoryId
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 204) {
                    $('#delmodal').modal('hide');
                    render();
                }
            }
        })
    });


    // 首先要确定弹出模态框是哪个按钮触发的，是‘新增按钮’还是‘编辑按钮’
    $('#myModal').on('shown.bs.modal', function (e) {

        if (e.relatedTarget.id === 'xinzengfenlei') {
            // 说明是新增分类
            $('#myModal h4').text('新增文章类别');
            // 只能清空用户输入的值
            $('#myform')[0].reset();
        } else {
            // 说明是修改分类
            $('#myModal h4').text('编辑文章类别');

            // 要想服务器发送ajax，获取当前编辑的数据，渲染在页面上
            $.ajax({
                type:'get',
                url:BigNew.category_search,
                data:{
                    id:$(e.relatedTarget).data('id')
                },
                success:function(res){
                    if(res.code == 200 )[
                        $('#myModal input[name=name]').val(res.data[0].name),
                        $('#myModal input[name=slug]').val(res.data[0].slug),
                        // $('#myModal input[name=id]').val($(e.relatedTarget).data('id')),
                        $('#myModal input[name=id]').val(res.data[0].id),
                    ]
                }
            });
        }
    });


})