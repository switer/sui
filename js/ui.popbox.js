!function ($) {

  var conf = {
    "mask_class" : 'sui-popbox-mask',
    'hide_class' : 'sui-disp-none',
    'box_sel' : ".sui-popbox-box"
  }
  var _timer;
  $.fn.checkPosition = function () {
    console.log('check');
    setInterval(function () {
      $box.data('top') && $box.css('top', parseInt($box.data('top')) + document.body.scrollTop);
    }, 100);
  }
  $.fn.trantision = function () {
    $(this).css('webkitTransition', 'top 1s');
  }
  /**
  * 显示弹框，并设置高度
  */
  $.fn.showPopbox = function () {
    var $popbox = $(this),
        box = $popbox.find(conf.box_sel)[0];
    $popbox.suiShow();
    var height =  document.body.scrollHeight;
    $popbox.height(height);
    console.log($popbox.data('transition'));

    if ( $popbox.data('position') === 'fixed' && $popbox.data('setPosition') !== 'fixed' ) {
      $popbox.data('setPosition', 'fixed');
      $popbox.fixed();
    }
    $popbox.data('transition') && box && (box.style['webkitTransition'] = 'top 1s');
  }
  $.fn.suiHide = function () {
    var $sui = $(this);
    $sui.addClass(conf.hide_class);
  }
  $.fn.suiShow = function () {
    $(this).removeClass(conf.hide_class);
  }
  $.fn.fixed = function (e) {
    var $popbox = $(this),
        $box = $popbox.find('.sui-popbox-box');
    function scrollHandler (event) {
      if (!$box.data('top')) {
        $box.data('top', $box.offset()['top'])
      } 
      $box.css('top', parseInt($box.data('top')) + document.body.scrollTop);
    }
    window.addEventListener('scroll', scrollHandler);
    scrollHandler();
  }
  $(document).on('click.sui-popbox>.sui-popbox-mask', function (e) {
    var $mask = $(e.target),
        $parent = $mask.parent();
    if ( !$mask.hasClass(conf.mask_class) ) return;
    if ($parent.data('cancel')) {
      setTimeout(function () {
        //避免点击冒泡
        $parent.suiHide();
      } ,100);
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}(window.$);