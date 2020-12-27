import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {GLTFLoader} from './GLTFLoader.js';
import {radians_to_degrees} from './mathTool.js'
import {degrees_to_radians} from './mathTool.js'

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;

var scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

var camera = new THREE.PerspectiveCamera( 60, 4/3 , 0.1, 1000 );
camera.position.z = 10;
camera.position.y = 4;
camera.rotation.deltaX = 0;
camera.rotation.deltaWorldY = 0;
//camera.rotation.deltaZ = 0;
camera.rotateX(degrees_to_radians(-10));
camera.moving = true;

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

var cylinder;
var mixer;
var loader = new GLTFLoader();
loader.load('asset/cylinder.glb',function(model){
    cylinder = model;
    cylinder.scene.traverse(function(node) {
        if(node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    mixer = new THREE.AnimationMixer(cylinder.scene);
    var action = mixer.clipAction(cylinder.animations[0]);
    action.play();
    scene.add(cylinder.scene);
    window.cylinder = cylinder;
});

var floor;
var loader = new GLTFLoader();
loader.load('asset/floor.glb',function(model){
    floor = model;
    floor.scene.traverse(function(node) {
        if(node instanceof THREE.Mesh) {
            node.receiveShadow = true;
        }
    });
    scene.add(floor.scene);
    window.floor = floor;
});


var ambientLight = new THREE.AmbientLight('#fff',0.9);
scene.add(ambientLight);
var pointLight = new THREE.SpotLight("#fff");
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 30;
pointLight.position.set(0,15,0);;
pointLight.target.position.set(0,0,0);
pointLight.distance = 25;
pointLight.intensity = 2;
scene.add(pointLight.target);
scene.add(pointLight);
var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);


var clock = new THREE.Clock();
function animate() {
    var delta = clock.getDelta();
    if(mixer){
        mixer.update(delta);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

var worldX = new THREE.Vector3(1, 0, 0);
var worldY = new THREE.Vector3(0, 1, 0);
var worldZ = new THREE.Vector3(0, 0, 1);

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

var beginTouchAngleX;
var beginTouchAngleY;

window.addEventListener("touchstart",function(e){
    beginTouchAngleX = e.touches[0].clientX;
    beginTouchAngleY = e.touches[0].clientY;
    movingAngle = true;
});

window.addEventListener('touchmove', function(e) {
    var deltaTouchAngleX, deltaTouchAngleY;
    deltaTouchAngleX = (e.changedTouches[0].clientX - beginTouchAngleX)/ displayWidth*2;
    deltaTouchAngleY = (e.changedTouches[0].clientY - beginTouchAngleY)/ displayHeight*2;
    camera.rotateOnWorldAxis(worldY, deltaTouchAngleX);
    camera.rotation.deltaWorldY += deltaTouchAngleX;
    if (Math.abs(radians_to_degrees(camera.rotation.deltaWorldY)) >= 360){
        if (radians_to_degrees(camera.rotation.deltaWorldY) > 0){
            camera.rotation.deltaWorldY -= Math.PI * 2;
        }else if (radians_to_degrees(camera.rotation.deltaWorldY) < 0){
            camera.rotation.deltaWorldY += Math.PI * 2;
        }
    }
    beginTouchAngleX = e.changedTouches[0].clientX;
    beginTouchAngleY = e.changedTouches[0].clientY;
});