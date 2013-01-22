!function ($) {

  var conf = {
    "feed_time" : 250,
    "feed_class" : 'sui-no-feed',
    "disabled" : 'disabled',
    "nav_btn" : 'sui-btn-nav',
    "nav_on" : 'sui-on',
    "button" : '.sui-btn'
  }
  /**
  * Button Event
  **/
  $(document).on('click.sui-btn', function (e) {

    var $btn = $(e.target);
        $btn.addClass(conf.feed_class);

    //按钮处于disabled状态
    if ($btn.hasClass(conf.disabled)) return;

    //检查按钮的toggle配置
    var toggle = $btn.attr('data-toggle'),
        $parent = $btn.parent();
        isNavBtn = $parent ? $btn.parent().hasClass(conf.nav_btn) : false;

    //改按钮配置了toggle属性
    if (toggle) {

      //添加disabled状态
      $btn.addClass(conf.disabled);

      //按自定义的toggle时间来清除disabled
      setTimeout(function () {
        //disabled状态根据disabled的时间来定时清除反馈
        $btn.removeClass(conf.feed_class);
        //取消disabled状态
        $btn.removeClass(conf.disabled);
      }, parseInt(toggle))
    }
    else {
      //取消默认反馈
      setTimeout(function () {
        $btn.removeClass(conf.feed_class);
      }, conf.feed_time);
    }

    if (isNavBtn) {
      $parent.find(conf.button).removeClass(conf.nav_on);
      $btn.addClass(conf.nav_on);
    }



  })
}(window.$);