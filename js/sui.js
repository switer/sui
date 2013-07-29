/*ui.extension.js*/
!function ($) {

  window.sui = {
    /*touch extension*/
    touch : {
      /**
      *   if touchable
      **/
      touchable : document.ontouchstart === undefined ? false : true,
      /**
      *   fix the real event type
      **/
      type : function (type) {

        var eventType; //return event type value

        switch(type) {
          case 'start':;
          case 'touchstart' :;
          case 'mousedown' : eventType = this.touchable ? 'touchstart' : 'mousedown';
          break;
          case 'move':;
          case 'touchmove' :;
          case 'mousemove' : eventType = this.touchable ? 'touchmove' : 'mousemove';
          break;
          case 'end':;
          case 'touchend' :; 
          case 'mouseup' :  eventType = this.touchable ? 'touchend' : 'mouseup';
          break;
          default : eventType = type;
        }
        return eventType;
      },
      /**
      *   使用递归方式获取元素指定位置的坐标值type=[offsetLeft || offsetRight || offsetTop || offsetBottom]
      **/
      getOffset : function (element,type) {
        if (element.offsetParent === null) return element[type];
        else return element[type] + this.getOffset(element.offsetParent,type);
      },
      /**
      *   获取元素各个位置的坐标
           @return {
              left    : Number,   
              right   : Number,   
              top     : Number,   
              bottom  : Number   
            }
      **/
      getCross : function (element) {
        var height      = element.offsetHeight,
            width       = element.offsetWidth,
            offsetLeft  = this.getOffset(element,'offsetLeft'),
            offsetTop   = this.getOffset(element,'offsetTop');
        return {
          left : offsetLeft,
          right : offsetLeft + width,
          top : offsetTop,
          bottom : offsetTop + height
        }

      },
      isMoveOut : function (x,y,cross) {
        if ( x <= cross['right'] && x >= cross['left'] && y <= cross['bottom'] && y >= cross['top']) return false;
        else return true;
      },
      tap : function (options, startcallback, endcallback) {

        var _this = this,
            isStart = false;

        //代理模拟click事件
        $(document.body).on(_this.type('start') + ' ' + options.selector, function(e) {
          
          var $tar = $(e.target);

          //判断是否为目标元素就交给使用者去判断
          if (options.judge && !options.judge($tar)) {
            isStart = false;
            return;
          }
          
          //获取该被代理目标的绝对坐标
          var cross = _this.getCross(e.target);
          //标志tap事件开始
          isStart = true;
          //tap事件结束的处理方法
          function _endHandler () {
            if (!isStart) return;
            isStart && endcallback && endcallback.call($tar, $tar);
            isStart = false;
          }
          //判断目标元素是否已初始化监听事件
          if (!$tar.data('isinit')) {

            /*add move handler*/
            $tar.on(_this.type('move'), function (e) {
              if (!isStart) return;
              var ismoveout = false;
              //jude by is touchable
              if (_this.touchable) {
                ismoveout = _this.isMoveOut(e.touches[0].pageX, e.touches[0].pageY, cross);
              } else {
                ismoveout = _this.isMoveOut(e.clientX, e.clientY, cross);
              }

              //if is move out trigger end handler
              if (ismoveout) {
                _endHandler();
              }
            })

            /*add end handler*/
            $tar.on(_this.type('end'), _endHandler)

            //鼠标事件用于mouseout来判断鼠标时候已离开元素
            if (!_this.touchable) {
              $tar.on('mouseout', _endHandler)
            }
            $tar.data('isinit', 'true');
          }
          
          //start callback exec
          startcallback && startcallback.call($tar, $tar);

        });
      }
    }
  }
}(window.$)

/*ui.popbox.js*/

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

/*ui.input.js*/

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

/*ui.button.js*/

!function ($) {

  var conf = {
    "feed_time" : 250,
    "feed_class" : 'sui-no-feed',
    "disabled" : 'sui-disabled',
    "nav_btn" : 'sui-btn-nav',
    "nav_on" : 'sui-on',
    "button" : '.sui-btn',
    "feedback_class" : 'sui-feedback'
  }
  /**
  *   按钮是否可被点击的闭合
  *   @param
  **/
  $.fn.suiToggle = function  (time, callback) {
    var $this = this;
    $this.on('click', function () {
      _toggle.call($this, time, callback)
    })
  }
  /**
  *   使按钮可以点击
  **/
  $.fn.enabled = function () {
    $(this).removeAttr('disabled');
    $(this).removeClass(conf.disabled);
  }
  /**
  *   使按钮不可点击
  **/
  $.fn.disabled = function () {
    $(this).attr('disabled', 'disabled');
    $(this).addClass(conf.disabled)
  }
  /**
  * @return bool 
  **/
  $.fn.isdisabled = function () {
    return $(this).hasClass(conf.disabled);
  }
  /**
  *   使按钮拥有反馈效果
  **/
  $.fn.feed = function () {
    $(this).removeClass(conf.feed_class);
  }
  /**
  *   使按钮没有反馈效果
  **/
  $.fn.unfeed = function () {
    $(this).addClass(conf.feed_class)
  }
  /**
  *   添加按钮反馈事件
  **/
  $.fn.feedback = function (className) {
    var $this = this;
    $this.on('click', function () {
      _feedback.call($(this), className);
    })
  }
  /**
  *   更改按钮文案
  **/
  $.fn.btnText = function (text) {
    var $this = $(this);

    if ($this[0].tagName === 'INPUT' && $this.attr('type') === 'button') {
      $this.val(text);
    } else {
      $this.html(text);
    }
  }
  function _toggle (time, callback) {
    var $this = this;
    $this.disabled();
    if ( time && time !== 0 ) {
      setTimeout (function () {
        $this.enabled();
        callback && callback.apply($this);
      }, time);
    }
  }
  //延时点击反馈效果
  function _feedback (className) {
    var $this = this;
    className = className || conf.feedback_class;
    $this.addClass(className);
    setTimeout(function () {
      $this.removeClass(className);
    }, conf.feed_time);
  }
  //获取目标反馈的影响元素
  function _getFeedTarget () {
    var $fbtn,
        $tar = $(this);

    if ( $tar.hasClass('sui-btn') ) {
      $fbtn = $tar;
    } else if ($tar.hasClass('sui-sel')) {
      $fbtn = $tar.parent();
    }
    return $fbtn;
  }

  /**
  *   使用扩展接口，实现即时点击反馈
  **/
  !function (config) {

    //是否配置了全局反馈属性且使用了sui扩展组件
    if (config.isFeedback === 'true' && sui) {
      sui.touch.tap(
        {
          selector : '.sui-btn,.sui-sel', 
          judge : function ($tar) {
            if ($tar.hasClass('sui-btn') || $tar.hasClass('sui-sel')) {
              return true;
            } else {
              return false;
            }
          }
        },
        function ($tar) {
          _getFeedTarget.call($tar).addClass(conf.feedback_class);
        },
        function ($tar) {
          _getFeedTarget.call($tar).removeClass(conf.feedback_class);
        });
    }
  }({
    //传递是够反馈的配置
    'isFeedback' : $(document.body).data('btnfeedback')
  })
  /**
  * Button Event
  **/
  $(document).on('click .sui-btn,.sui-btn-check,.sui-btn-switch', function (e) {
    var $btn = $(e.target);
        $btn.feed();

    //按钮处于disabled状态
    if ($btn.isdisabled()) return;

    // var globalSettings = {};

    // 全局设置，写在body元素上
    // globalSettings.feedback = $(document.body).data('btnfeedback') === 'true' ? true : false;

    //检查按钮的toggle配置
    var toggle = $btn.attr('data-toggle'),
        // feedback = $btn.attr('data-feedback'),
        $parent = $btn.parent(),
        isNavBtn = $parent ? $btn.parent().hasClass(conf.nav_btn) : false;

    //改按钮配置了toggle属性
    if (toggle) {
      //disabled开关
      _toggle.call($btn, parseInt(toggle));
    }
    // if (feedback || globalSettings.feedback) {
    //   var $fbtn;
    //   if ( $btn.hasClass('sui-btn') ) {
    //     $fbtn = $btn;
    //   } else if ($btn.hasClass('sui-sel')) {
    //     $fbtn = $btn.parent();
    //   }
    //   $fbtn &&  _feedback.call($fbtn, feedback);
    // }
    //取消默认反馈
    setTimeout(function () {
      $btn.removeClass(conf.feed_class);
    }, conf.feed_time);

    if (isNavBtn) {
      $parent.find(conf.button).removeClass(conf.nav_on);
      $btn.addClass(conf.nav_on);
    }
  })
}(window.$);

/*ui.base.js*/

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

    if ($sui.hasClass(conf.popbox_class)) {
      $sui.hidePopbox();
    } else {
      $sui.addClass(conf.hide_class);
    }
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
  /**
  *   检查按钮是否处于on状态
  **/
  $.fn.isOn = function () {
    return $(this).hasClass(conf.on_class);
  }
}(window.$);