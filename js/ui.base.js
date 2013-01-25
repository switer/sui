!function ($) {

  var conf = {
    'hide_class' : 'sui-disp-none',
    "delay_time" : 100
  }
  //public method
  $.fn.delayHide = function () {
    var $sui = $(this);
    setTimeout(function () {
      $sui.suiHide();
    } , conf.delay_time);
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
}(window.$);