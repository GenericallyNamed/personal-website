/**
 * @title ripple.js
 * @description This contains the necessary code for generating the ripple effect seen when clicking on buttons.
 * 
 * @author Alex Shandilis
 * @version 5/1/2021
 * 
*/

var rippleBtns = document.getElementsByClassName("addRippleBtn");

/**
 * @name ripple
 * @param {Number} id 
 * @param {String} rgb 
 * @purpose This method creates the ripple effect seen on buttons.
 */
function ripple(id, rgb) {
    console.log('ripple created');
    var elem = document.getElementById(id);
    elem.style.overflow = "hidden"; //This is to ensure that the parent element of the ripple hides the overflow of the ripple object.
    var e = window.event; //stores window.event in var "e"
    
    var parentWidth = parseInt((getComputedStyle(elem).width).substring(0,(getComputedStyle(elem).width).length-2)); //Get width of parent
    var parentHeight = parseInt((getComputedStyle(elem).height).substring(0,(getComputedStyle(elem).height).length-2)); //Get height of parent
    var rippleSize; //creates variable rippleSize, contains height of ripple 
    rippleSize = (parentWidth > parentHeight) ? parentWidth * 2 : parentHeight * 2; //Calculates the ripple size using the expression seen here
    var rippleContainer = document.createElement("div");
    rippleContainer.style.position = "absolute"; //Creates a container for the ripple object, then set the position property in its style sheet to "relative"
    elem.appendChild(rippleContainer); //Ripple container appended to the parent element.
    var rippleObject = document.createElement("div"); //Creates the ripple object as a div
    rippleContainer.appendChild(rippleObject); //Appends the ripple object to the ripple container
    rippleObject.style.position = "relative"; //Set the position style of the ripple object to RELATIVE
    var parentObject = rippleObject.parentElement; //Get the parent of the ripple object.
    var x = ((e.clientX == undefined) ? e.touches[0].clientX : e.clientX) - parentObject.getBoundingClientRect().left;
    //var x = e.clientX - parentObject.getBoundingClientRect().left;  //First get the RELATIVE x position of the mouse within the container by taking the mouse x-value
                                                                    //and subtracting the parent element's distance from the left
    var y = ((e.clientY == undefined) ? e.touches[0].clientY : e.clientY) - parentObject.getBoundingClientRect().top;   //First get the RELATIVE y position of the mouse within the container by taking the mouse y-value
                                                                    //and subtracting the parent element's distance from the top
    rippleObject.style.width = (rippleSize*2) + "px";
    rippleObject.style.height = (rippleSize*2) + "px";
    var styleLeft = (x - ((rippleSize*2)/2));   //This calculates and stores the position values that will be used for the ripple object
    var styleTop = (y - ((rippleSize*2)/2));    //This calculates and stores the position values that will be used for the ripple object
    rippleObject.style.position = "relative";
    rippleObject.style.left = styleLeft+"px";
    rippleObject.style.top = styleTop+"px";
    rippleObject.style.backgroundColor = rgb;
    rippleObject.style.zIndex = 1;
    rippleObject.classList.add("rippleEffect"); 
    let rippleParent = rippleContainer.parentElement;
    rippleParent.style.boxShadow = "0px 3px 10px 2px rgba(0,0,0,0.3)";
    let object = rippleObject;
    rippleObject.rippleStatus = "active";
    //endRipple(rippleObject);
    //e.stopPropagation();
    return rippleObject;
}


function endRipple(elem) {
    let eventListeners = ["touchcancel","touchend","mouseleave","mouseup","mouseout","contextmenu"];
    for(var i = 0; i < eventListeners.length; i++) {
        elem.parentElement.parentElement.addEventListener(eventListeners[i], function(event){

        });
    }
}
function endRipple2(event, btn, ripple) {
    if(ripple.rippleStatus == "active") {
        let rippleParent = this.parentElement.parentElement;
        rippleParent.style.boxShadow = "0px 0px 5px 2px rgba(0,0,0,0)";
        ripple.rippleStatus = "remove";
        ripple.classList.add('rippleEnd');
        setTimeout(removeRippleObject, 2000, this);
        btn.touchFiring = false;
        let eventListeners = ["touchcancel","touchend","touchmove","mouseleave","mouseup","mouseout","contextmenu"];
        for(var i = 0; i < eventListeners.length; i++) {
            btn.removeEventListener(eventListeners[i], endRipple2)
        }
    }
}


function endRipple3(btn, ripple) {
    let eventListeners = ["touchcancel","touchend","touchmove","mouseleave","mouseup","mouseout","contextmenu"];
    for(var i = 0; i < eventListeners.length; i++) {
        btn.ripple = ripple;
        btn.addEventListener(eventListeners[i], function removingRipple(event, ripple) {
            if(btn.ripple.rippleStatus == "active") {
                let rippleParent = btn;
                rippleParent.style.boxShadow = "0px 0px 5px 2px rgba(0,0,0,0)";
                btn.ripple.rippleStatus = "remove";
                btn.ripple.classList.add('rippleEnd');
                setTimeout(removeRippleObject, 2000, btn.ripple);
                btn.ripple.parentElement.parentElement.touchFiring = false;
                //event.stopPropagation();
            }
            
            for(var i = 0; i < eventListeners.length; i++) {
                btn.removeEventListener(eventListeners[i], removingRipple);
            }
        }, { once: true });
    }
}

function endRipple4(btn, ripple) {
    if(ripple.rippleStatus == "active") {
        let rippleParent = btn;
        rippleParent.style.boxShadow = "0px 0px 5px 2px rgba(0,0,0,0)";
        btn.ripple.rippleStatus = "remove";
        btn.ripple.classList.add('rippleEnd');
        setTimeout(removeRippleObject, 2000, btn.ripple);
        btn.ripple.parentElement.parentElement.touchFiring = false;
    }
}


for (var i = 0; i < rippleBtns.length; i++) {
    var currentElement = rippleBtns[i];
    let eventListeners = ["touchstart","mousedown"];
    for(var j = 0; j < eventListeners.length; j++) {
        currentElement.addEventListener(eventListeners[j], function(event) {
            this.rippleActive = true;
            var color = this.getAttribute("rippleColor");
            var nameID = this.getAttribute("id");
            var rippleElement
            if(event.type == "touchstart") {
                this.touchFiring = true;
                rippleElement = ripple(nameID, color);
            } else {
                if(this.touchFiring != true) {
                    rippleElement = ripple(nameID, color);
                }
            }
            this.ripple = rippleElement
            event.preventDefault();
            //endRipple3(this, rippleElement);
            return false;
        });
        
    }
    let endEventListeners = ["touchcancel","touchend","touchmove","mouseleave","mouseup","mouseout","contextmenu"];
    for(var j = 0; j < endEventListeners.length; j++) {
        currentElement.addEventListener(endEventListeners[j], function(event) {
            if(this.rippleActive == true) {
                endRipple4(this, this.ripple);
            }
        });
    }
}

function removeRippleObject(obj) {
    obj.parentElement.remove();
}