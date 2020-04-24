console.log("threejsTutorial is working");
var scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

var camera = new THREE.PerspectiveCamera( 45, 4/3 , 0.1, 1000 );
var cameraToPlayerDistance = 10;
camera.position.z = 25;
camera.position.y = 5;
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

var floorMesh;
var mtlLoader2 = new THREE.MTLLoader();
mtlLoader2.load( 'floor.mtl', function(materials) {
    materials.preload();
    var objLoader2 = new THREE.OBJLoader();
    objLoader2.setMaterials( materials );
    objLoader2.load( 'floor.obj', function ( object ) {
        floorMesh = object;
        floorMesh.traverse(function(node){
            if(node instanceof THREE.Mesh) {
                node.receiveShadow = true;
            }
        });
        scene.add(floorMesh);        
    });
});

var mesh;
var meshFloating = 0.05;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load( 'weird_cube.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( 'weird_cube.obj', function ( object ) {
        mesh = object;
        mesh.position.y = 5;
        mesh.traverse(function(node) {
            if(node instanceof THREE.Mesh) {
                node.castShadow = true;
            }
        });
        scene.add( mesh );
    });
});

var player;
var speed = 1/3;
var mtlLoader3 = new THREE.MTLLoader();
mtlLoader3.load( 'player.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load( 'player.obj', function (object) {
        player = object;
        player.position.y = 1;
        player.position.z = camera.position.z - cameraToPlayerDistance;
        player.traverse(function(node) {
            if(node instanceof THREE.Mesh) {
                node.castShadow = true;
            }
        });
        scene.add(player);
        camera.lookAt(player.position);
    });
});

var ambientLight = new THREE.AmbientLight('#fff',0.5);
scene.add(ambientLight);

var pointLight = new THREE.SpotLight("#fff");
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 30;
pointLight.position.set(0,12.5,3);;
pointLight.target.position.set(0,5,0);
scene.add(pointLight.target);
scene.add(pointLight);

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
//scene.add(pointLightHelper);

var cameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
//scene.add(cameraHelper);

var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
sphere.position.y = 5;
//scene.add( sphere );

var planeGeometry = new THREE.PlaneBufferGeometry( 20, 20, 32, 32 );
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.position.z = -5;
//scene.add( plane );

var geometry = new THREE.BoxGeometry(1,1.7,0.1);
var material = new THREE.MeshBasicMaterial();
material.color.r = 0.486;
material.color.g = 1;
material.color.b = 0.647;
material.transparent = true;
material.opacity = 0.75;
var cube = new THREE.Mesh( geometry, material );
var edges = new THREE.EdgesGeometry(geometry);
var cubeEdges = new THREE.LineSegments(edges, new THREE.LineBasicMaterial());

//scene.add(cube);
//scene.add(cubeEdges);

function animate() {
    renderer.render( scene, camera );
    if (mesh!=undefined){
        mesh.rotation.y += 0.02;
        mesh.rotation.x += 0.02;
        mesh.position.y += meshFloating;
        if (mesh.position.y >= 10){
            meshFloating = -Math.abs(meshFloating);
        }else if (mesh.position.y <= 2){
            meshFloating = Math.abs(meshFloating);
        }
        if (!camera.moving){
            camera.lookAt(player.position);
        }
    }
    requestAnimationFrame( animate );
}
animate();

window.addEventListener("keydown",function(k){

    var camCurrentX = camera.position.x;
    var camCurrentY = camera.position.y;
    var camCurrentZ = camera.position.z;
    var playerCurrentX = player.position.x;
    var playerCurrentY = player.position.y;
    var playerCurrentZ = player.position.z;

    if (k.key==" "){
        camera.moving = !(camera.moving);
    }
    if (camera.moving == false){
        return;
    }
    if (k.key=="w"){
        player.position.x += (playerCurrentX - camCurrentX)/cameraToPlayerDistance*speed;
        player.position.z += (playerCurrentZ - camCurrentZ)/cameraToPlayerDistance*speed;
        var step = Math.sqrt((player.position.x - playerCurrentX)**2 + (player.position.z - playerCurrentZ)**2);
        camera.position.x = player.position.x - (player.position.x - playerCurrentX)/step*cameraToPlayerDistance;
        camera.position.z = player.position.z - (player.position.z - playerCurrentZ)/step*cameraToPlayerDistance;
        /* camera.position.z -= Math.cos(camera.rotation.y)*0.5;
        camera.position.x -= Math.sin(camera.rotation.y)*0.5; */
    }else if (k.key=="s"){
        player.position.x -= (playerCurrentX - camCurrentX)/cameraToPlayerDistance*speed;
        player.position.z -= (playerCurrentZ - camCurrentZ)/cameraToPlayerDistance*speed;
        var step = Math.sqrt((player.position.x - playerCurrentX)**2 + (player.position.z - playerCurrentZ)**2);
        camera.position.x = player.position.x + (player.position.x - playerCurrentX)/step*cameraToPlayerDistance;
        camera.position.z = player.position.z + (player.position.z - playerCurrentZ)/step*cameraToPlayerDistance;
        /* camera.position.z += Math.cos(camera.rotation.y)*0.5;
        camera.position.x += Math.sin(camera.rotation.y)*0.5; */
    }else if (k.key=="d"){
        player.position.x -= (playerCurrentZ - camCurrentZ)/cameraToPlayerDistance*speed;
        player.position.z += (playerCurrentX - camCurrentX)/cameraToPlayerDistance*speed;
        var step = Math.sqrt((player.position.x - playerCurrentX)**2 + (player.position.z - playerCurrentZ)**2);
        camera.position.x = player.position.x - (player.position.z - playerCurrentZ)/step*cameraToPlayerDistance;
        camera.position.z = player.position.z + (player.position.x - playerCurrentX)/step*cameraToPlayerDistance;
        /* camera.position.z += Math.cos(camera.rotation.y+Math.PI/2)*0.5;
        camera.position.x += Math.sin(camera.rotation.y+Math.PI/2)*0.5; */
    }else if (k.key=="a"){
        player.position.x += (playerCurrentZ - camCurrentZ)/cameraToPlayerDistance*speed;
        player.position.z -= (playerCurrentX - camCurrentX)/cameraToPlayerDistance*speed;
        var step = Math.sqrt((player.position.x - playerCurrentX)**2 + (player.position.z - playerCurrentZ)**2);
        camera.position.x = player.position.x + (player.position.z - playerCurrentZ)/step*cameraToPlayerDistance;
        camera.position.z = player.position.z - (player.position.x - playerCurrentX)/step*cameraToPlayerDistance;
        /* camera.position.z -= Math.cos(camera.rotation.y+Math.PI/2)*0.5;
        camera.position.x -= Math.sin(camera.rotation.y+Math.PI/2)*0.5; */
    }
    var c2p = Math.sqrt((player.position.x - camera.position.x)**2 + (player.position.z - camera.position.z)**2);
    //console.log(c2p);
    
});

var beginViewnAngleX;
var beginViewnAngleY;
var movingViewAngle = false;

window.addEventListener("mousedown",function(mouseEvent){
    beginViewnAngleX = mouseEvent.clientX;
    beginViewnAngleY = mouseEvent.clientY;
    movingViewAngle = true;
});

window.addEventListener("mouseup",function(mouseEvent){
    movingViewAngle = false;
});

window.addEventListener("mousemove",function(mouseEvent){
    
    var angleX = (mouseEvent.clientX - beginViewnAngleX) / displayWidth*2;
    var angleY = (mouseEvent.clientY - beginViewnAngleY) / displayHeight*2;

    if (movingViewAngle){
        var dimention;
        var a = camera.position.x - player.position.x;
        var b = camera.position.z - player.position.z;
        if (a > 0 && b > 0){
            dimention = 1;
        }else if (a < 0 && b > 0){
            dimention = 2;
        }else if (a < 0 && b < 0){
            dimention = 3;
        }else if (a > 0 && b < 0){
            dimention = 4;
        }else if (a == 0 && b > 0){
            dimention = 5; //camera and player on the same x position, camera's z position greater than player's
        }else if (a < 0 && b == 0){
            dimention = 6; //camera and player on the same z position, camera's x position less than player's
        }else if (a == 0 && b < 0){
            dimention = 7; //camera and player on the same x position, camera's z position less than player's
        }else if (a > 0 && b == 0){
            dimention = 8; //camera and player on the same z position, camera's x position greater than player's
        }
        var da = Math.abs(camera.position.x - player.position.x);
        var db = Math.abs(camera.position.z - player.position.z);
        var dc = Math.sqrt(da**2 + db**2);
        var thetaA;
        //Math.acos((dc**2 + db**2 - da**2)/(2*dc*db));
        if (dimention == 1){
            thetaA = Math.PI * 0.5 - Math.acos((dc**2 + db**2 - da**2)/(2*dc*db));
        }else if (dimention == 2){
            thetaA = Math.PI * 0.5 + Math.acos((dc**2 + db**2 - da**2)/(2*dc*db));
        }else if (dimention == 3){
            thetaA = Math.PI * 1.5 - Math.acos((dc**2 + db**2 - da**2)/(2*dc*db));
        }else if (dimention == 4){
            thetaA = Math.PI * 1.5 + Math.acos((dc**2 + db**2 - da**2)/(2*dc*db));
        }else if (dimention == 5){
            thetaA = Math.PI * 0.5;
        }else if (dimention == 6){
            thetaA = Math.PI;
        }else if (dimention == 7){
            thetaA = Math.PI * 1.5;
        }else if (dimention == 8){
            thetaA = 0;
        }
        //console.log(Math.acos((dc**2 + db**2 - da**2)/(2*dc*db))/Math.PI*180);
        //console.log(thetaA/Math.PI*180);
        //console.log(thetaA - angleX);
        camera.position.x = player.position.x + cameraToPlayerDistance * Math.cos(thetaA + angleX);
        camera.position.z = player.position.z + cameraToPlayerDistance * Math.sin(thetaA + angleX);
        camera.lookAt(player.position);
        beginViewnAngleX = mouseEvent.clientX;
        var newCamY = camera.position.y + angleY*5;
        if (newCamY <= 0){
            camera.position.y = 0;
        }else if (newCamY >= 15){
            camera.position.y = 15;
        }else{
            camera.position.y = newCamY;
        }
        beginViewnAngleY = mouseEvent.clientY;
    }
});