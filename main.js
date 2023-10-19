const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a metallic sphere
const geometry = new THREE.TorusGeometry(3, 0.8, 100, 100);
let sphereMaterial; // Declare the material outside the textureLoader block

const textureLoader = new THREE.TextureLoader();
textureLoader.load('holo2.png', (texture) => {
    // Create a material with the loaded texture
    sphereMaterial = new THREE.MeshStandardMaterial({
        map: texture, // Apply the texture to the material's map
        metalness: 1, // 100% metallic
        roughness: 0.2, // Some roughness
    });

    createSphere();
});

function createSphere() {
    const sphere = new THREE.Mesh(geometry, sphereMaterial);
    scene.add(sphere);
}

// Create directional light with an initial color and direction
let lightColor = 0xffffff; // Initial white color
const directionalLight = new THREE.DirectionalLight(lightColor, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create an ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Handle mouse and touch events to update light color and direction
function handleLightAndSphereUpdates(event) {
    event.preventDefault();
    const clientX = event.clientX || (event.touches && event.touches[0].clientX);
    const clientY = event.clientY || (event.touches && event.touches[0].clientY);

    if (clientX !== undefined && clientY !== undefined) {
        const mouseX = (clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(clientY / window.innerHeight) * 2 + 1;

        // Update light direction based on mouse or touch position
        const newDirection = new THREE.Vector3(mouseX, mouseY, 1);
        directionalLight.position.copy(newDirection);

        lightColor = new THREE.Color(mouseX + 1, mouseY + 1, 1);
        directionalLight.color = lightColor;
    }
}

document.addEventListener('mousemove', handleLightAndSphereUpdates);
document.addEventListener('touchmove', handleLightAndSphereUpdates);

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