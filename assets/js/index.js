getuserinfo();
let layer = layui.layer;

function getuserinfo() {
  $.ajax({
    url: "/my/userinfo",

    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }
      let name = res.data.nickname || res.data.username;
      $("#welcome").text("欢迎" + name);

      //显示头像和昵称
      if (res.data.user_pic) {
        $(".textavatar").hide();
        $(".layui-nav-img").attr("src", res.data.user_pic).show();
      } else {
        $(".textavatar").show().text(name[0].toUpperCase());
        $(".layui-nav-img").hide();
      }
    },
    complete: function (res) {
      let data = res.responseJSON;
      if (data.message === "身份认证失败" && data.status === 1) {
        location.href = "/home/login.html";
        localStorage.removeItem("token");
      }
    },
  });
}
//退出
$("#out").on("click", function () {
  layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (index) {
    //do something
    localStorage.removeItem("token");
    location.href = "/home/login.html";
    layer.close(index);
  });
});
