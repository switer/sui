!function ($) {

  var conf = {
    'hide_class' : 'sui-disp-none',
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
    $sui.addClass(conf.hide_class);
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
}(window.$);