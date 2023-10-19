const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a metallic sphere
const geometry = new THREE.TorusGeometry( 2.8, 0.4, 100, 100 );
const material = new THREE.MeshStandardMaterial({
    color: 0x808080,  // Gray metallic color
    metalness: 0.9,    // 100% metallic
    roughness: 0.7,  // Some roughness
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Create directional light with an initial color and direction
let lightColor = 0xffffff;  // Initial white color
const directionalLight = new THREE.DirectionalLight(lightColor, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create an ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Handle mouse movement to update light color and direction
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update light color based on mouse position
    lightColor = new THREE.Color(mouseX + 1, mouseY + 1, 1);
    directionalLight.color = lightColor;

    // Update light direction based on mouse position
    directionalLight.position.set(mouseX, mouseY, 1);
});
document.addEventListener('touchstart',(event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update light color based on mouse position
    lightColor = new THREE.Color(mouseX + 1, mouseY + 1, 1);
    directionalLight.color = lightColor;

    // Update light direction based on mouse position
    directionalLight.position.set(mouseX, mouseY, 1);
});


// Set camera position
camera.position.z = 5;
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Update camera aspect ratio and renderer size
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});


// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    directionalLight.rotation.x += 0.01;
    renderer.render(scene, camera);
};

animate();