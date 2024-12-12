import * as THREE from 'three';

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

cube.position.z = -3;

scene.add( cube );

const animate = () => {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

animate();

window.addEventListener('resize', () => {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();
});

document.body.appendChild( renderer.domElement );