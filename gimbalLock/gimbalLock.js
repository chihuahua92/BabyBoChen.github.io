console.log("threejsTutorial is working");
var scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

var camera = new THREE.PerspectiveCamera( 30, 4/3 , 0.1, 1000 );
camera.position.z = 20;
camera.position.y = 5;
camera.rotation.deltaX = 0;
camera.rotation.deltaWorldY = 0;
//camera.rotation.deltaZ = 0;
camera.rotateX(degrees_to_radians(-15));
camera.rotation.deltaX += degrees_to_radians(-15);
camera.moving = true;

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var displayWidth;
var displayHeight;
if (screenWidth/screenHeight >= 4/3){
    renderer.setSize(screenHeight*4/3,screenHeight);
    displayWidth = screenHeight*4/3;
    displayHeight = screenHeight;
}else{
    renderer.setSize(screenWidth,screenWidth*3/4);
    displayWidth = screenWidth;
    displayHeight = screenWidth*3/4;
}
window.addEventListener("resize",function(){
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    if (screenWidth/screenHeight >= 4/3){
        renderer.setSize(screenHeight*4/3,screenHeight);
        displayWidth = screenHeight*4/3;
        displayHeight = screenHeight;
    }else{
        renderer.setSize(screenWidth,screenWidth*3/4);
        displayWidth = screenWidth;
        displayHeight = screenWidth*3/4;
    }
});

document.body.appendChild( renderer.domElement );

var body;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('body.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( 'body.obj', function ( object ) {
        body = object;
        body.traverse(function(node) {
            if(node instanceof THREE.Mesh) {
                node.castShadow = true;
            }
        });
        body.position.z = 5;
        body.rotateY(degrees_to_radians(-90));
        scene.add(body);
    });
});

var cube;
var cubeY = [1,1.5,2,2.5,3,3.5,4,4.5,5,4.5,4,3.5,3,2.5,2,1.5];
var cubeFloatingPosition = 0; //the index of cubeY
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('cube.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( 'cube.obj', function ( object ) {
        cube = object;
        cube.traverse(function(node) {
            if(node instanceof THREE.Mesh) {
                node.castShadow = true;
            }
        });
        
        cube.rotateY(degrees_to_radians(-90));
        scene.add(cube);
    });
});

var floor;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('floor.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( 'floor.obj', function ( object ) {
        floor = object;
        floor.traverse(function(node) {
            if(node instanceof THREE.Mesh) {
                node.receiveShadow = true;
            }
        });
        
        floor.rotateY(degrees_to_radians(-90));
        scene.add(floor);
    });
});

var ambientLight = new THREE.AmbientLight('#fff',0.9);
scene.add(ambientLight);

var pointLight = new THREE.SpotLight("#fff");
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 30;
pointLight.position.set(0,20,0);;
pointLight.target.position.set(0,0,0);
pointLight.distance = 25;
pointLight.intensity = 2;
scene.add(pointLight.target);
scene.add(pointLight);

var fps = 0;
var worldX = new THREE.Vector3(1, 0, 0);
var worldY = new THREE.Vector3(0, 1, 0);
var worldZ = new THREE.Vector3(0, 0, 1);

function animate() {
    renderer.render( scene, camera );
    //fps += 1;
    //requestAnimationFrame( animate );
}
var mainloop = setInterval(animate,1000/30);
var cubeFloating = setInterval(function(){
    cube.position.y = cubeY[cubeFloatingPosition];
    if (cubeFloatingPosition < cubeY.length-1){
        cubeFloatingPosition += 1;
    }else{
        cubeFloatingPosition = 0;
    }
},1000/15);
function countFps(){
    fps = 0;
}
var fpsCounter = setInterval(countFps,1000);

window.addEventListener("keydown",function(k){

    let worldDirection = camera.getWorldDirection(new THREE.Vector3(0,0,0));
    let forward = new THREE.Vector3(worldDirection.x,0,worldDirection.z).normalize();

    if (k.key==" "){
        camera.moving = !(camera.moving);
    }
    if (camera.moving == false){
        return;
    }
    if (k.key=="w" ){
        if (Math.abs(camera.position.z + forward.z) < 20 && Math.abs(camera.position.x + forward.x) < 20){
            camera.position.z += forward.z;
            camera.position.x += forward.x;
        }
        
    }else if (k.key=="s"){
        if (Math.abs(camera.position.z - forward.z) < 20 && Math.abs(camera.position.x - forward.x) < 20){
            camera.position.z -= forward.z;
            camera.position.x -= forward.x;
        }
        
    }else if (k.key=="d"){
        if (Math.abs(camera.position.z + forward.x) < 20 && Math.abs(camera.position.x - forward.z) < 20){
            camera.position.z += forward.x;
            camera.position.x -= forward.z;
        }

    }else if (k.key=="a"){
        if (Math.abs(camera.position.z - forward.x) < 20 && Math.abs(camera.position.x + forward.z) < 20){
            camera.position.z -= forward.x;
            camera.position.x += forward.z;        
        }
    }
});

var beginAngleX;
var beginAngleY;
var movingAngle = false;

window.addEventListener("mousedown",function(mouseEvent){
    beginAngleX = mouseEvent.clientX;
    beginAngleY = mouseEvent.clientY;
    movingAngle = true;
});

window.addEventListener("mouseup",function(mouseEvent){
    movingAngle = false;
});

window.addEventListener("mousemove",function(mouseEvent){
    
    var angleX = (mouseEvent.clientX - beginAngleX) / displayWidth*2;
    var angleY = (mouseEvent.clientY - beginAngleY) / displayHeight*2;

    if (movingAngle){
        camera.rotateOnWorldAxis(worldY,angleX);
        camera.rotation.deltaWorldY += angleX;
        if (Math.abs(radians_to_degrees(camera.rotation.deltaWorldY)) >= 360){
            if (radians_to_degrees(camera.rotation.deltaWorldY) > 0){
                camera.rotation.deltaWorldY -= Math.PI * 2;
            }else if (radians_to_degrees(camera.rotation.deltaWorldY) < 0){
                camera.rotation.deltaWorldY += Math.PI * 2;
            }
        }
        //console.log(radians_to_degrees(camera.rotation.deltaWorldY));
        beginAngleX = mouseEvent.clientX;
        if (Math.abs(radians_to_degrees(camera.rotation.deltaX + angleY)) <= 60){
            camera.rotateX(angleY);
            camera.rotation.deltaX += angleY;
        }
        //console.log(radians_to_degrees(camera.rotation.deltaX));
        beginAngleY = mouseEvent.clientY;
    }
});

window.addEventListener("wheel",function(e){
    e.preventDefault();
    if (e.deltaY < 0){
        if (camera.fov >= 15){
            camera.fov -= 3;
        }
    }else if (e.deltaY > 0){
        if (camera.fov <= 60){
            camera.fov += 3;
        }
    }
    camera.updateProjectionMatrix();    
});
