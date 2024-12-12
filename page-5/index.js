import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

// change background color
const color = new THREE.Color(0xffffff);
renderer.setClearColor(color, 1);

renderer.setSize( window.innerWidth, window.innerHeight );

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

cube.position.x = 0;
cube.position.y = 0;
cube.position.z = -3;

scene.add( cube );

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;
controls.update();

const animate = () => {
	controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();

window.addEventListener('resize', () => {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();
});

document.body.appendChild( renderer.domElement );