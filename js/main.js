//const UAParser = require("./lib/ua-parser");

var window_height = window.innerHeight,
    window_width = window.innerWidth,
    isPortrait = window_height > window_width,
    getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
      }
      if (

          
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return "mobile";
      }
      return "desktop";
  },
  enterBtn = document.getElementById("enterBtn"),
  landing = document.getElementById("landing");

window.addEventListener("resize", function() {
  updateWindow();
});
updateWindow();

enterBtn.addEventListener("click",function(){
  enterSite();
});
enterBtn.addEventListener("touchstart",function(event){
  window.targetX = event.touches[0].clientX;
  window.targetY = event.touches[0].clientY;
  console.log(window.targetX + ", " + window.targetY);
});
enterBtn.addEventListener("touchend",function(event){
  var distanceX = event.changedTouches[0].clientX - window.targetX;
  var distanceY = event.changedTouches[0].clientY - window.targetY;
  var distance = Math.sqrt((Math.pow(distanceX,2)) + (Math.pow(distanceY,2)));
  console.log(distance);
  if(distance < 10) {
    enterSite();
  }
});

function enterSite() {
  let cover = document.getElementById("cover");
  let landing = document.getElementById("landing");
  cover.style.height = window.innerHeight + "px";
  cover.style.width = window.innerWidth + "px";
  cover.style.display = "block";
  cover.style.transition = "0.5s ease";
  cover.style.animation = "fade-out 0.5s ease";
  cover.style.opacity = 0;
  cover.style.opacity = 1;
  setTimeout(function() {
    cover.style.display = "none";
    landing.style.display = "none";
  }, 600)
}
    
// function absorbEvent_(event) {
//   var e = event || window.event;
//   e.preventDefault && e.preventDefault();
//   e.stopPropagation && e.stopPropagation();
//   e.cancelBubble = true;
//   e.returnValue = false;
//   return false;
// }

// function preventLongPressMenu(node) {
//   node.ontouchstart = absorbEvent_;
//   node.ontouchmove = absorbEvent_;
//   node.ontouchend = absorbEvent_;
//   node.ontouchcancel = absorbEvent_;
// }

// preventLongPressMenu(document.getElementById("enterBtn"));
// window.oncontextmenu = function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

function updateWindow() {
  landing.style.height = window.innerHeight + "px";
  landing.style.width = window.innerWidth + "px";
}