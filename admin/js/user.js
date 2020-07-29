// 页面一加载，ajax请求个人详细信息，渲染页面
$(function () {
    $.ajax({
        url: window.BigNew.user_detail,
        type: 'get',
        // dataType:'json',
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                // 渲染页面
                // 交集选择器
                // $('input.username').val(res.data.username);
                // $('input.nickname').val(res.data.nickname);
                // $('input.email').val(res.data.email);
                // $('input.passwoed').val(res.data.passwor);
                // 遍历对象优化代码
                for (var key in res.data) {
                    $('input.' + key).val(res.data[key]);
                }
                $('img.user_pic').attr('src', res.data.userPic)
            }
        }
    });
    // fasdfffffffffffffffffffffffffffff
    // 文件预览
    // 1-给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        // 1-获取用户选择的图片
        var file = this.files[0];
        // console.dir(file);
        // 2-将文件转为src路径
        var url = URL.createObjectURL(file);
        // 3-将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });
    // 编辑个人信息然后用formdata上传
    $('#myForm').on('submit', function (e) {
        // 禁用表单默认提交事件
        e.preventDefault();
        // console.log(this);
        var data = new FormData($('#myForm')[0]);
        // console.log( typeof data);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            // dataType: 'json',
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    alert(res.msg);
                    $.ajax({
                        url: window.BigNew.user_info,
                        success: function(backData) {
                          //console.log(backData);
                          if (backData.code == 200) {
                            //给父页面的显示个人信息的标签设置新的值.
                            parent.$(".user_info>span>i").text(backData.data.nickname);
                            parent.$(".user_info>img").attr("src", backData.data.userPic);
                            parent
                              .$(".user_center_link>img")
                              .attr("src", backData.data.userPic);
                          }
                        }
                      });
                }
            }
        })
    })

})