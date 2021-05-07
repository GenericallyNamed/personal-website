var bottombar = document.getElementById("bottombar");

var bottombarOptions = document.getElementsByClassName("bottombar-option");

for(var i = 0; i < bottombarOptions.length; i++) {
    let elem = bottombarOptions[i];
    elem.addEventListener("mouseover", function(){
        this.setAttribute("collapsed","false");
        uncollapse(this);
    });
    elem.addEventListener("mouseout", function(){
        this.setAttribute("collapsed","true");
        collapse(this);
    });
}

function uncollapse(e) {
    for(var i = 0; i < bottombar.length; i++) {
        if(bottombar[i] != e) {
            collapse(bottombar[i]);
        }
    }

}
function collapse(e) {

}

// create a WebGLRenderer and set its width and height
var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );

// add the automatically created canvas element to the page
landing.appendChild( renderer.domElement );

// create a Scene
var scene = new THREE.Scene();

// create a PerspectiveCamera
var fov = 75;
var aspect = window.innerWidth / window.innerHeight;
var d = 20;
var nearClippingPlane = 0.1;
var farClippingPlane = 1000;
//var camera = new THREE.PerspectiveCamera( fov, aspect, nearClippingPlane, farClippingPlane );
var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

camera.position.set( 0, 0, 50 );

// create a TorusKnotBufferGeometry
var geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5, 1, 1, 1);
var geometry2 = new THREE.BoxGeometry(2.5, 2.5, 2.5, 1, 1, 1);

// create a MeshStandardMaterial and set its color to purple
var material = new THREE.MeshStandardMaterial( {
    color: "#CA3001", 
} );

// create a Mesh containing the geometry and material and add it to the scene
//var mesh3 = [];
/*for(var i = 0; i < geometry2.length; i++) {
    mesh3[i] = new THREE.Mesh(geometry2[i], material);
    scene.add(mesh3[i]);
    mesh3[i].rotation.y = 0.7;
    mesh3[i].rotation.x = 0.7;
    mesh3[i].position.set( i*2, 0, 20);
}*/
//var mesh = new THREE.Mesh( geometry, material );
var mesh2 = new THREE.Mesh(geometry2, material);

//scene.add( mesh );
scene.add( mesh2 );
mesh2.rotation.y = 0.7;
mesh2.rotation.x = 0.7;
//scene.add(mesh3);
//mesh3.position.set(5, 5, 4);

// create a dark grey ambient light with an intensity of 1.0 and add it to the scene
var ambientLight = new THREE.AmbientLight( 0x666666, 1.0 );  
scene.add( ambientLight );

// Create a white directional light with an intensity of 1.0
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight.position.set( 5, 5, 0 );
scene.add( directionalLight );
console.log("test2");

var hCount = 40,
    vCount = 40,
    size = 10,
    spacing = 11;
var grid = new THREE.Object3D(); // just to hold them all together
var gridComponents = [];
for (var h=0; h<hCount; h+=1) {
    for (var v=0; v<vCount; v+=1) {
        var box = new THREE.Mesh(new THREE.BoxGeometry(size,size,size),
                      material);
        box.position.x = (h-hCount/2) * spacing;
        box.position.y = (v-vCount/2) * spacing;
        grid.add(box);
        gridComponents.push(box);
        console.log(gridComponents.length);
        //animWave(box);
        //animateCube();
    }
}


function wave() {
    /*c+= 0.01;
    setTimeout(function(){
        if(c < (2*Math.PI)) {
            setTimeout(function(){
                var newPos = Math.sin(c)*25;
                console.log(newPos);
                specificBox.position.z = newPos;
                wave(c);
            }, 100);

        } 
    }, 200);
    return*/
    var specificBox = gridComponents[grid.currentCube];
    if(specificBox.zframe < 2*(Math.PI)) {
        specificBox.zframe += 0.01;
        specificBox.position.z = (Math.sin(specificBox.zframe)*100);
    } else {
        specificBox.position.z = (Math.sin(specificBox.zframe)*100);
        specificBox.zframe = 0;
        specificBox.up = false;
    }
     /*else {
        if(specificBox.zframe > (Math.PI)*(-1)) {
            specificBox.zframe -= 0.01;
            specificBox.position.z = (Math.sin(specificBox.zframe)*10);
        } else {
            specificBox.position.z = (Math.sin(specificBox.zframe)*10);
            specificBox.up = true;
        }
    }*/
    return;
}

//for(var i = 0; i < )


var canvas = landing.getElementsByTagName("canvas")[0];
grid.currentCube = 0;
var specificBox = gridComponents[grid.currentCube];
specificBox.zframe = 0;
specificBox.up = true;
function animWave() {
    if(grid.currentCube < gridComponents.length-1) {
        grid.currentCube+=1;
    } else {
        grid.currentCube = 0;
    }
    wave();
    setTimeout(function(){
        console.log("running animation");
        requestAnimationFrame(animWave);
    },10);
    /*for(var i = 0; i < (2*Math.PI); i += 0.05) {
        specificBox.position.z = Math.sin(i);
        console.log(Math.sin(xVal));
    }*/
    /*
    if(xVal < Math.PI) {
        xVal += 0.01;
        specificBox.position.z = Math.sin(xVal);
        console.log(Math.sin(xVal));
    } else {
        xVal = 0;
        specificBox.position.z = Math.sin(xVal);
        console.log(Math.sin(xVal));
    }*/
    renderer.render (scene, camera);
}

//animWave();



//animWave(gridComponents[4]);
/*for(var i = 0; i < gridComponents.length; i++) {
    animWave(gridComponents[i]);
}*/

/*function animWave(b) {
    requestAnimationFrame( animWave(b) );
    let elem = b;
    var xVal = 0;
    if(xVal < Math.PI) {
        xVal += 0.01;
        elem.position.y = Math.sin(xVal);
    } else {
        xVal = 0;
        elem.position.y = Math.sin(xVal);
    }
    renderer.render (scene, camera);
}*/

/*function animateCube() {
    requestAnimationFrame( animateCube );
    var xVal = 0;
    if(xVal < Math.PI) {
        xVal += 0.01;
        grid.position.y = Math.sin(xVal);
    } else {
        xVal = 0;
        grid.position.y = Math.sin(xVal);
    }
    renderer.render (scene, camera);
}*/

scene.add(grid);

//animateCube();
grid.position.set(5,5,5);
grid.rotation.x = -0.9;
grid.rotation.y = 0.0;
grid.rotation.z = 0.7;


function animateCube(m) {
    requestAnimationFrame( animateCube );
    var xVal = 0;
    if(xVal < Math.PI) {
        xVal += 0.01;
        m.position.y = Math.sin(xVal);
    } else {
        xVal = 0;
        m.position.y = Math.sin(xVal);
    }
    renderer.render (scene, camera);
}

function animate() {
  // schedule the animate function to be called at the start of every frame
  requestAnimationFrame( animate );
  // increase the mesh's rotation each frame
  grid.rotation.z += 0.001;
  //grid.rotation.x += 0.01;
  //grid.rotation.y += 0.01;
  
  // render a frame
  renderer.render( scene, camera );
}
animate();


canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;

function createMesh( geom, imageFile ) {
    var texture = new THREE.TextureLoader().load( "img/" + imageFile );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    var mesh = new THREE.Mesh( geom, material );
    return mesh;
}

