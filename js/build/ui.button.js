

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
  function _feedback (className) {
    var $this = this;
    className = className || conf.feedback_class;
    $this.addClass(className);
    setTimeout(function () {
      $this.removeClass(className);
    }, conf.feed_time);
  }
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
  function _feedend () {

  }
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
    })
  /**
  * Button Event
  **/
  $(document).on('click .sui-btn,.sui-btn-check,.sui-btn-switch', function (e) {
    var $btn = $(e.target);
        $btn.feed();

    //按钮处于disabled状态
    if ($btn.isdisabled()) return;

    var globalSettings = {};

    //全局设置，写在body元素上
    globalSettings.feedback = $(document.body).data('btnfeedback') === 'true' ? true : false;

    //检查按钮的toggle配置
    var toggle = $btn.attr('data-toggle'),
        feedback = $btn.attr('data-feedback'),
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

