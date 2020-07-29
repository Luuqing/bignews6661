$(function () {

    //给按钮注册点击事件
    $('.input_sub').click(function (e) {
        // 阻止默认跳转事件表单sumbit会自动跳转页面）
        e.preventDefault();
        // 非空判断 
        if ($('.input_txt').val() == '' || $('.input_pass').val() == '') {
            $('#myModal .modal-body p').html('账号和密码不能为空！')
            $('#myModal').modal();
            return;
        };
        // 发送ajax请求
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'post',
            dataType: 'json',
            data: $('.login_form').serialize(),
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    $('#myModal').modal();
                    $('#myModal .modal-body p').html(res.msg)
                    // window.location.href = './index.html'
                    $('#myModal').on('hidden.bs.modal', function () {
                        localStorage.setItem('token',res.token)

                        window.location.href = './index.html'
                    })
                }
            }
        })
    })
})
































