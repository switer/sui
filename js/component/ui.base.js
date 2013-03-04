!function ($) {

  var conf = {
    'hide_class' : 'sui-disp-none',
    'popbox_class' : 'sui-popbox'
    "delay_time" : 100
  }
  $.fn.delayHide = function (time) {
    time = (typeof time) == 'number' ? time : conf.delay_time;
    var $sui = $(this);
    setTimeout(function () {
      $sui.suiHide();
    } , time);
  }
  $.fn.isHide = function () {
    return $(this).hasClass(conf.hide_class);
  }
  $.fn.suiHide = function () {
    var $sui = $(this);
    //使用弹框组件自己的显示方法
    if ($sui.hasClass(conf.popbox_class)) $sui.showPopbox();
    else $sui.addClass(conf.hide_class);
  }
  $.fn.suiShow = function () {
    $(this).removeClass(conf.hide_class);
  }
  $.fn.suiOn = function () {
    $(this).addClass(conf.on_class);
    return this;
  }
  $.fn.suiOff = function () {
    $(this).removeClass(conf.on_class);
    return this;
  }
  $.fn.suiToggle = function () {
    var $sui = $(this);
    if ($sui.hasClass(conf.hide_class)) $sui.suiShow();
    else $sui.suiHide();
  }
}(window.$);