!function ($) {

  var conf = {
    "feed_time" : 250,
    "feed_class" : 'sui-no-feed',
    "disabled" : 'sui-disabled',
    "nav_btn" : 'sui-btn-nav',
    "nav_on" : 'sui-on',
    "button" : '.sui-btn'
  }
  $.fn.toggle = function  (time, callback) {
    var $this = this;
    $this.disabled();
    if ( time && time !== 0 ) {
      setTimeout (function () {
        $this.enabled();
        callback && callback.apply($this);
      }, time);
    }
  }
  $.fn.enabled = function () {
    $(this).removeClass(conf.disabled);
  }
  $.fn.disabled = function () {
    $(this).addClass(conf.disabled)
  }
  /**
  * @return bool 
  **/
  $.fn.isdisabled = function () {
    return $(this).hasClass(conf.disabled);
  }
  $.fn.feed = function () {
    $(this).removeClass(conf.feed_class);
  }
  $.fn.unFeed = function () {
    $(this).addClass(conf.feed_class)
  }
  /**
  * Button Event
  **/
  $(document).on('click.sui-btn', function (e) {

    var $btn = $(e.target);
        $btn.feed();

    //按钮处于disabled状态
    if ($btn.isdisabled()) return;

    //检查按钮的toggle配置
    var toggle = $btn.attr('data-toggle'),
        $parent = $btn.parent();
        isNavBtn = $parent ? $btn.parent().hasClass(conf.nav_btn) : false;

    //改按钮配置了toggle属性
    if (toggle) {
      //disabled开关
      $btn.toggle(parseInt(toggle));
    }
    //取消默认反馈
    setTimeout(function () {
      $btn.removeClass(conf.feed_class);
    }, conf.feed_time);

    if (isNavBtn) {
      $parent.find(conf.button).removeClass(conf.nav_on);
      $btn.addClass(conf.nav_on);
    }
  })
}(window.$);