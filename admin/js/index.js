$(function () {
    $.ajax({
        url: window.BigNew.user_info,
        type: 'get',
        // beforeSend:function(xhr){
        //     xhr.setRequestHeader('Authorization','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIyMDA0ODU0MDAsImlhdCI6MTU5NTY4NTQwMH0.cn3_ZiN-y3ogC3lXnBxbpDzeLOGAFJ0PI-56SBdFIt-WaJ-jp0mgqawTezAF_3DfJUBSuExg272oYvmDjaqoP7PWzifCZdEUg7mX_v1a6qT9BbmJs8XGroZh8i70XqIeKGiMOxPZ-ym9qTxWezhl2IA9M5637n-G76QK9NkIt9w')
        // },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                $('.sider .user_info img').attr('src', res.data.userPic);
                $('.header_bar img').attr('src', res.data.userPic);
            }
        }
    });

    // 登出
    $('.logout').click(function () {
        localStorage.removeItem('token');
        location.href = './login.html'
    });

    // 实现左侧导航栏点击a标签高亮效果，与文章管理下拉效果

    // 一级列表
    $('.level01').click(function () {
        $(this).addClass('active').siblings().removeClass('active');

        if ($(this).index() == 1) {
            $('ul.level02').slideToggle();
            $(this).find('b').toggleClass('rotate0');
            $('.level02>li:eq(0)>a')[0].click();
        }else{
            $('.level02>li').removeClass('active');
            $('.level02').slideUp();
        }
    });
    $('ul.level02>li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    })


})