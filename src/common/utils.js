// 节流throttle代码（定时器）：
export function throttlen(func, delay) {
    var timer = null;
    return function () {
       var context = this;
       var args = arguments;
       if (!timer) {
          timer = setTimeout(function () {
             func.apply(context, args);
             timer = null;
          }, delay);
       }
    }
 }