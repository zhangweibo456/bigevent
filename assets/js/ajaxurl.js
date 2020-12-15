$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  options.headers = {
    Authorization: localStorage.getItem("token"),
    //根据服务端接口文档命名
  };
});
