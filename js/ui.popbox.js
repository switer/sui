!function ($) {

  var conf = {
    "mask_class" : 'sui-popbox-mask',
    'hide_class' : 'sui-disp-none'
  }
  // function _getMaxHeight (hArray) {
  //   var max = hArray[0];
  //   for (var i = 1, len = hArray.length; i < len; i--) {
  //     if (hArray[i] > max) max = hArray[i]; 
  //   }
  //   return max;
  // }
  $.fn.showPopbox = function () {
    var $popbox = $(this);
    $popbox.removeClass(conf.hide_class);
    var height =  document.body.scrollHeight;
    $popbox.height(height);
  }
  $.fn.hideSui = function () {
    var $sui = $(this);
    $sui.addClass(conf.hide_class);
  }
  $.fn.center = function (e) {
    var $popbox = $(this),
        $box = $popbox.find('.sui-popbox-box');
    function scrollHandler (event) {
      if (!$box.data('top')) {
        $box.data('top', $box.offset()['top'])
      } 
      $box.css('top', parseInt($box.data('top')) + document.body.scrollTop);
    }
    window.addEventListener('scroll',scrollHandler);
    scrollHandler();
  }
  $(document).on('click.sui-popbox>.sui-popbox-mask', function (e) {
    var $mask = $(e.target),
        $parent = $mask.parent();
    if ( !$mask.hasClass(conf.mask_class) ) return;
    if ($parent.data('cancel')) {
      setTimeout(function () {
        //避免点击冒泡
        $parent.hideSui();
      } ,100);
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}(window.$);