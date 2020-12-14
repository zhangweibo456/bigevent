$(function () {
  $(".login a").on("click", function () {
    $(".login").hide();
    $(".register").show();
  });
  $(".register a").on("click", function () {
    $(".register").hide();
    $(".login").show();
  });

  //   表单校验
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value) {
      if ($(".passred").val() !== value) {
        return "两次输入的密码不一致";
      }
    },
  });

  //注册
  $("#registerform").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功");
        $("#registerform")[0].reset();

        $(".register a").click();
      },
    });
  });

  //登录
  $("#loginform").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg(
          "登陆成功,即将跳转页面",
          {
            time: 2000,
          },
          function () {
            location.href = "/home/index.html";
          }
        );
        localStorage.setItem("token", res.token);
      },
    });
  });
});
