var mouseX;
var mouseY;
/*
window.addEventListener("mousemove",function(){
    var e = window.event;
    mouseX = e.clientX;
    mouseY = e.clientY;
    var maxY = window.innerHeight;
    var minYrange = maxY - 100;
    var landingCard = document.getElementById("landing");
    landingCard.style.transition = "0.5s ease";
    if(mouseY > minYrange) {
        console.log(mouseX + ", " + mouseY);
        landingCard.style.transform = "translateY(-" + (maxY-minYrange) + "px) scale(0.8)";
    } else {
        landingCard.style.transform = "translateY(-" + 0 + "px) scale(0.8)";
    }
});*/

var landing = document.getElementById("landing");
var components = [];
components[0] = landing;
for(var i = 0; i < components.length; i++) {
    setFullScreen(components[i]);
}
var bottomBarSections = document.querySelectorAll(".bottombar-section");
for(var i = 0; i < bottomBarSections.length; i++) {
    bottomBarSections[i].addEventListener("mouseover",function() {
        console.log("mouseover");
        this.style.width = "500%";
    });
    bottomBarSections[i].addEventListener("mouseout",function() {
        this.style.width = "100%";
        console.log("mouseout");
    });
}

window.addEventListener("resize", function() {
    for(var i = 0; i < components.length; i++) {
        setFullScreen(components[i]);
    }
});


setFullScreen(document.getElementById("landing"));

function setFullScreen(element) {
    console.log("setFullScreen()");
    var el = element;
    var height = window.innerHeight;
    var width = window.innerWidth;
    el.style.width = width+"px";
    el.style.height = height+"px";
    if((landing.getElementsByTagName("canvas")).length != 0) {
        (landing.getElementsByTagName("canvas"))[0].style.width = width+"px";
        (landing.getElementsByTagName("canvas"))[0].style.height = height+"px";
    }
    
}

