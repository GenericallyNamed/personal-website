//const UAParser = require("./lib/ua-parser");

var window_height,
    window_width,
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
  enterBtn = document.getElementById("enterBtn");


enterBtn.addEventListener("click",function(){
  enterSite();
});

function enterSite() {
  let cover = document.getElementById("cover");
  let landing = document.getElementById("landing");
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
    