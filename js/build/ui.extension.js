
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
      *
      **/
      getOffset : function (e,type) {
        if (e.offsetParent === null) return e[type];
        else return e[type] + sui.touch.getOffset(e.offsetParent,type);
      },
      /**
      *
      **/
      getCross : function (e) {
        var height      = e.offsetHeight,
            width       = e.offsetWidth,
            offsetLeft  = this.getOffset(e,'offsetLeft'),
            offsetTop   = this.getOffset(e,'offsetTop');
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

        $(document.body).on(_this.type('start') + ' ' + options.selector, function(e) {
          
          var $tar = $(e.target);
          if (!options.judge($tar)) {
            isStart = false;
            return;
          }
        
          var cross = _this.getCross(e.target);

          isStart = true;
          function _endHandler () {
            isStart && endcallback && endcallback.call($tar, $tar);
            isStart = false;
          }

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

            if (!_this.touchable) {
              $tar.on('mouseout', _endHandler)
            }
          }
          $tar.data('isinit', 'true');
          //start callback exec
          startcallback && startcallback.call($tar, $tar);

        });
      }
    }
  }
}(window.$)

