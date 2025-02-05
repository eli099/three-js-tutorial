import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

if (window.innerWidth < 768) {
	camera.fov = 102;
	camera.updateProjectionMatrix();
}

const renderer = new THREE.WebGLRenderer();

// change background color
const color = new THREE.Color(0x000000);
renderer.setClearColor(color, 1);
renderer.setSize( window.innerWidth, window.innerHeight );

const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
const earthMaterial = new THREE.MeshPhongMaterial( {
	color: 0xffffff,
	shininess: 100,
	specular: 0xffffff,
	side: THREE.FrontSide,
	smoothShading: true,
} );

const map = new THREE.TextureLoader().load('/assets/2k_earth_daymap.jpg', () => {
	earthMaterial.map = map;
	earthMaterial.needsUpdate = true;
});

const normalMap = new THREE.TextureLoader().load('/assets/2k_earth_normal_map.png', () => {
	earthMaterial.normalMap = normalMap;
	earthMaterial.needsUpdate = true;
});

const specularMap = new THREE.TextureLoader().load('/assets/2k_earth_specular_map.png', () => {
	earthMaterial.specularMap = specularMap;
	earthMaterial.needsUpdate = true;
});

const earth = new THREE.Mesh( earthGeometry, earthMaterial );
earth.name = 'earth';
earth.position.x = 0;
earth.position.y = 0;
earth.position.z = 0;

scene.add( earth );

const light = new THREE.DirectionalLight(0xffffff, 0.4);
light.position.set(2, 2, 2);
light.intensity = 1;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const mousePosition = {
	x: 0,
	y: 0
};

const controls = new OrbitControls(camera, renderer.domElement);

// make the camera move smoothly
controls.enableDamping = true;
controls.dampingFactor = 0.025;
camera.position.z = 3;
controls.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const animate = () => {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

animate();

window.addEventListener('mousemove', (event) => {
	mousePosition.x = event.clientX;
	mousePosition.y = event.clientY;
});

window.addEventListener('resize', () => {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	
	if (window.innerWidth < 768) {
		camera.fov = 102;
	} else {
		camera.fov = 75;
	}

	camera.updateProjectionMatrix();
});

document.body.appendChild( renderer.domElement );