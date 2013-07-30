

!function ($) {

  var conf = {
    "mask_class" : 'sui-popbox-mask',
    'hide_class' : 'sui-disp-none',
    'box_sel' : ".sui-popbox-box",
    "delay_time" : 100
  }
  var _timer, _this =this;
  function _suiShow () {
    this.removeClass(conf.hide_class);
  }

  function _suiHide () {
    this.addClass(conf.hide_class);
  } 
  /**
  * 定时检验矫正弹框的位置
  **/
  $.fn.checkPosition = function () {
    setInterval(function () {
      $box.data('top') && $box.css('top', parseInt($box.data('top')) + document.body.scrollTop);
    }, conf.delay_time);
  }
  /**
  * 位置的变换采用过渡动画（例如：滚动导致的位置变换）
  **/
  $.fn.trantision = function () {
    $(this).css('webkitTransition', 'top 1s');
  }
  /**
  * 设定弹框位置居中
  */
  $.fn.center =  function () {
    var diffHeight = document.documentElement.clientHeight - parseInt($(this).height());
    $(this).css('top', (diffHeight / 2) + 'px');
  }
  /**
  * 显示弹框，并设置高度
  */
  $.fn.showPopbox = function () {
    var $popbox = $(this),
        box = $popbox.find(conf.box_sel)[0];
    _this.$popbox = $popbox;

    //定高
    var height =  document.body.scrollHeight;
    $popbox.height(height);
    //显示
    _suiShow.call($popbox);
    //定时校验机制, 一次延时校验
    function _fixedHeight() {
      height =  document.body.scrollHeight;
      if ( height !== $popbox.height() ) $popbox.height(height);
    }
    //延时100ms，检验高度
    setTimeout(_fixedHeight, 100);
    //输入框位于屏幕中间(notice:尽量不要与fixed共用，可能有bug)
    if ( $popbox.data('center') == 'true') $(box).center();

    /*根据data配置数据*/
    if ( $popbox.data('position') === 'fixed' && $popbox.data('setPosition') !== 'fixed' ) {
      $popbox.data('setPosition', 'fixed');
      $popbox.fixed();
    }

    //过渡动画
    $popbox.data('transition') && box && (box.style['webkitTransition'] = 'top 1s');
    
  }
  /**
  * 隐藏弹框 初始化显示弹框修改的值
  **/
  $.fn.hidePopbox = function () {
    var $popbox = $(this),
        $box = $popbox.find(conf.box_sel);

    //还原初始垂直位置数据
    $box.css('top', $box.data('top') + 'px');
    //初始化dataset数据
    $popbox.data('setPosition', '');
    $box.data('top', '');

    _suiHide.call($popbox)
  }
  /**
  *  采用JS校验位置的方式使弹框位置固定
  **/
  $.fn.fixed = function (e) {
    var $popbox = $(this),
        $box = $popbox.find('.sui-popbox-box');
    function _scrollHandler () {
      if (!$popbox.isHide()) {
        if (!$box.data('top')) {
          $box.data('top', $box.offset()['top'])
        }
        $box.css('top', parseInt($box.data('top')) + document.body.scrollTop);
      }
    }
    window.addEventListener('scroll', _scrollHandler);
    _scrollHandler();
  }
  //弹框的遮罩点击事件
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

