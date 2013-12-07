

!function ($) {

  var conf = {
    "focus_class" : 'sui-focus',
    "input_class" : 'sui-inp',
    'input_control_length' : 10
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
  function _hasSetGloable(key) {
    return $('body').data(key) === 'true';
  }
  $.fn.initInp = function (value) {
    $(this).data('init', value).setInp(value);
  }
  // 用于输入控件的设值
  $.fn.setInp = function (value) {
    var $this = $(this);
    if (_hasSetGloable('ctrl') && $this.data('ctrl')) {
      //清除操作
      if (value === '') {
        $this.val('').data('value', '');
      } else {
        $this.val(Math.random().toString().slice(2, conf.input_control_length)).data('value', value);
        $this.data('ismodify', 'false');
      }
    } else {
      $this.val(value);
    }
  }
  $.fn.getInp = function () {
    var $this = $(this);
    if (_hasSetGloable('ctrl') && $this.data('ctrl')) {
      return $this.data('value');
    } else {
      return $this.val();
    }
  }
  $.fn.isModify = function () {
    return ($(this).data('ismodify') === 'true');
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

    /*是否为密码输入框控件*/
    if ( _hasSetGloable('ctrl') && $tar.data('ctrl') === 'true' ) {
      /*保存初始值*/
      var oralValue = $tar.val();
      //清空值，标识为已经聚焦，在DOM上保存初始值
      $tar.data('oralvalue', oralValue);
      //监听input事件
      if ($tar.data('isattchinput') !== 'true') {
        $tar.on('input', function () {
          if ($tar.data('isclean') !== 'true') {
            $tar.val('').data('isclean', 'true');
          }
        });
        $tar.data('isattchinput', 'true');
      }
      //监听blur事件
      if ($tar.data('isattchblur') !== 'true'){
        $tar.on('blur', function () {
          //获取初始值
          var savedValue = $tar.data('oralvalue'),
              inpValue = $tar.val();

          //如果已经旧值已经被清除且输入值不为空时，往DOM保存输入值
          if (($tar.data('isclean') === 'true') && inpValue) {
            $tar.data('value', inpValue)
          }
          //如果保存值存在且输入不为空，认定为已更改
          if (inpValue) {
            $tar.data('ismodify', 'true');
          }
          //输入值为空时，还原清除前的值
          else {
            $tar.val(savedValue || '');
          }
          //初始还原已清除标识
          $tar.data('isclean', 'false');
        });
        //标识为已监听blur事件
        $tar.data('isattchblur', 'true');
      }
    }//end 输入控件
  });




}(window.$);

