

!function ($) {

  var conf = {
    'hide_class' : 'sui-disp-none',
    'on_class' : 'sui-on',
    'popbox_class' : 'sui-popbox',
    "delay_time" : 100
  }
  /**
  *   延时指定的时间隐藏组件
  **/
  $.fn.delayHide = function (time) {
    time = (typeof time) == 'number' ? time : conf.delay_time;
    var $sui = $(this);
    setTimeout(function () {
      $sui.suiHide();
    } , time);
  }
  /**
  *   判断组件是否处于隐藏状态
  *   @return boolean
  **/
  $.fn.isHide = function () {
    return $(this).hasClass(conf.hide_class);
  }
  /**
  *   隐藏sui组件
  **/
  $.fn.suiHide = function () {
    var $sui = $(this);
    $sui.addClass(conf.hide_class);
  }
  /**
  *   显示sui组件
  **/
  $.fn.suiShow = function () {
    var $this = $(this);

    if ($this.hasClass(conf.popbox_class)) {
      $this.showPopbox();
    } else {
      $this.removeClass(conf.hide_class);
    }
  }
  /**
  *   导航按钮的面包屑on
  **/
  $.fn.suiOn = function () {
    $(this).addClass(conf.on_class);
  }
  /**
  *   导航按钮的面包屑off
  **/
  $.fn.suiOff = function () {
    $(this).removeClass(conf.on_class);
  }
  $.fn.isOn = function () {
    return $(this).hasClass(conf.on_class);
  }
}(window.$);