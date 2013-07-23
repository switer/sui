

!function ($) {

  var conf = {
    "focus_class" : 'sui-focus',
    "input_class" : 'sui-inp'
  }
  /*Input public method*/
  $.fn.flushInp = _fulshInput;

  // $(document).on('click.sui-inp', _fulshInput);

  /*flush Placeholder*/
  function _fulshInput (e) {
    
    var $inp = $(e.target);
    if( _isEmpty( $inp.val() ) ) {
        $( event.target ).val( '' );
    }
  }
  //String is empty
  function _isEmpty(val) {
    return (val === undefined || val === null || val.length === 0);
  }

  /**
  * Button Event
  **/
  $(document).on('click .sui-inp', function (e) {
    var $tar = $(e.target);
    if ( !$tar.hasClass(conf.input_class) ) return;
    if ( $tar.data('focus') === 'true' || 
          ($(document.body).data('inpfocus') === 'true' && $tar.data('focus') !== 'false' ) ) {
      //清空placeholder的value
      _fulshInput.call(this,e)
      //失去焦点
      function _blur(e) {
        //输入框的效果在父容器上
        $tar.parent().removeClass(conf.focus_class)
      }
      // data-_blur用于标识已监听blur事件的私有标识
      if ( $tar.data('blur') !== 'true' ) {
        //监听输入框的blur事件
        $tar.on('blur', _blur)
        $tar.data('blur', 'true')
      }
      //输入框的效果在父容器上
      $tar.parent().addClass(conf.focus_class)
    }
  });


}(window.$);

