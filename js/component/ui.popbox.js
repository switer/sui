
!function ($) {

  var conf = {
    "mask_class" : 'sui-popbox-mask',
    'hide_class' : 'sui-disp-none',
    'box_sel' : ".sui-popbox-box",
    "delay_time" : 100
  }
  var _timer, _this =this;
  $.fn.checkPosition = function () {
    setInterval(function () {
      $box.data('top') && $box.css('top', parseInt($box.data('top')) + document.body.scrollTop);
    }, conf.delay_time);
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
    _this.$popbox = $popbox;
    $popbox.suiShow();
    //定高
    var height =  document.body.scrollHeight;
    $popbox.height(height);
    //定时校验机制, 一次延时校验
    function _fixedHeight() {
      height =  document.body.scrollHeight;
      if ( height !== $popbox.height() ) $popbox.height(height);
    }
    setTimeout(_fixedHeight, 100);
    /*根据data配置数据*/
    if ( $popbox.data('position') === 'fixed' && $popbox.data('setPosition') !== 'fixed' ) {
      $popbox.data('setPosition', 'fixed');
      $popbox.fixed();
    }
    $popbox.data('transition') && box && (box.style['webkitTransition'] = 'top 1s');
    
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
    if ($parent.data('cancel') == true || $parent.data('cancel') === 'true') {
      //防止事件透传, 采用delay隐藏
      $parent.delayHide();
    }
    //防止事件透传，停止默认事件与冒泡
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
  //停止滚动, 在Android2.1停止scroll会无效
  $(document).on('touchmove.sui-popbox', _scrollHandler);
  function _scrollHandler (e) {
    if ( _this.$popbox 
        && !_this.$popbox.isHide() 
          && _this.$popbox.data('noscroll') ) {

      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
}(window.$);
