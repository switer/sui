
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
          //解决android的touchmove只触发一次的bug
          e.preventDefault();
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

