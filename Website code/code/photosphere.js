var scene,camera,renderer,effect,controls;
var camyaw,campitch;
var sphere,marker,wordsworth;
var webglEl;

init();

function init()
{
  webglEl=document.getElementById('sphere');
  var width=webglEl.offsetWidth,height=webglEl.offsetHeight;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(100,width/height,1,1000);
  camera.position.x=0.1;
  renderer=Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  renderer.setSize(width,height);
  addlights();
  controls=new THREE.TrackballControls(camera,webglEl);
  controls.target.set(0,0,0);
  controls.minDistance=1;
  controls.maxDistance=180;
  controls.rotateSpeed=1.5;
  controls.zoomSpeed=2;
  controls.noPan=true;
  webglEl.appendChild(renderer.domElement);
  render();
  setimage(1);
}

function dosphere()
{
  for(var i=scene.children.length-1;i>=0;i--){}
  sphere=new THREE.Mesh(new THREE.SphereGeometry(100,32,32),
         new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('./images/'+imfile)}));
  sphere.scale.x=-1;
  scene.add(sphere);
}

function setimage(im)
{
  imfile="image"+im+".jpg";
  document.getElementById('bottombit').innerHTML="<h2>"+imtexts[im-1]+"</h2>";
  dosphere();
}

function addlights()
{
  var light=new THREE.PointLight(0xFFFF00);
  light.position.set(0,0,0);
  scene.add(light);
}

function updatescene()
{
  vector=camera.getWorldDirection();
  var camyaw=Math.atan2(vector.x,vector.z);
  var campitch=Math.asin(vector.y);
  var cx=80*Math.sin(camyaw)*Math.cos(campitch);
  var cy=80*Math.sin(campitch);
  var cz=80*Math.cos(camyaw)*Math.cos(campitch);
}

function render()
{
  controls.update();
  requestAnimationFrame(render);
  updatescene();
  renderer.render(scene,camera);
}

function onWindowResize()
{
  camera.aspect=webglEl.offsetWidth/webglEl.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(webglEl.offsetWidth,webglEl.offsetHeight);
}

function onMouseWheel(event)
{
  event.preventDefault();
  if(event.wheelDeltaY)
  { // WebKit
    camera.fov-=event.wheelDeltaY*0.05;
  }
  else if(event.wheelDelta) 
  { 	// Opera / IE9
    camera.fov-=event.wheelDelta*0.05;
  }
  else if(event.detail)
  { // Firefox
    camera.fov+=event.detail*1.0;
  }
  camera.fov=Math.max(40,Math.min(150,camera.fov));
  camera.updateProjectionMatrix();
}

document.addEventListener('mousewheel',onMouseWheel,false);
document.addEventListener('DOMMouseScroll',onMouseWheel,false);
window.addEventListener('resize',onWindowResize,false);
