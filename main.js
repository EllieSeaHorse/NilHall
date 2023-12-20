const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let material;

const textureLoader = new THREE.TextureLoader();
textureLoader.load('holo2.png', (texture) => {
    material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 1,
        roughness: 0.2,
    });
    createShapes();
    loadGeometries();
});

function createShapes() {
    const shapes = [
        new THREE.TorusGeometry(2.3, 0.2, 100, 100)
        // new THREE.SphereGeometry(2, 32, 32),
        // new THREE.CylinderGeometry(2, 2, 4, 32),
        // new THREE.TorusGeometry(2, 0.6, 100, 100),
        // new THREE.ConeGeometry(2, 4, 32),
        // new THREE.DodecahedronGeometry(2)
    ];

    const yPositions = [0, -10, -20, -30, -40, -50];

    for (let i = 0; i < shapes.length; i++) {
        const geometry = shapes[i];
        const shape = new THREE.Mesh(geometry, material);
        shape.position.y = yPositions[i];
        shape.position.z = 0;
        shape.name = 'torus'
        scene.add(shape);
    }
}
function loadGeometries() {
  const loader = new THREE.ObjectLoader();
  const geometries = [

    {
      path: 'Models/model(1).json',
      position: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      name: 'Infiite'
    },
    {
      path: 'Models/model(3).json',
      position: new THREE.Vector3(-4, -5, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      name: 'Branding'
    },
    {
      path: 'Models/model(4).json',
      position: new THREE.Vector3(-4, -10, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      name: 'Web'
    },
    {
      path: 'Models/model(5).json',
      position: new THREE.Vector3(-4, -15, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      name: '3d'
    },
    {
      path: 'Models/model(6).json',
      position: new THREE.Vector3(-4, -20, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      name: 'Pack'
    },
    {
      path: 'Models/model(7).json',
      position: new THREE.Vector3(-4, -25, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      name: 'Vitrine'
    }
  ];
  
      // Add more objects for other geometries...
  

  geometries.forEach(geo => {
      loader.load(geo.path, (loadedObject) => {
          const mesh = new THREE.Mesh(loadedObject.geometry, material);

          // Apply position, scale, and rotation from the array
          mesh.position.copy(geo.position);
          mesh.scale.copy(geo.scale);
          mesh.rotation.copy(geo.rotation);
          mesh.name = geo.name;


          scene.add(mesh);
      });
  });
}

// Rest of your code remains unchanged...


// Create directional light with an initial color and direction
let lightColor = 0xffffff; // Initial white color
const directionalLight = new THREE.DirectionalLight(lightColor, 3);
directionalLight.position.set(0, 0, 20);
scene.add(directionalLight);

// const directionalLight2 = new THREE.DirectionalLight(lightColor, 0.3);
// directionalLight2.position.set(0, 0, 30);

// scene.add(directionalLight2);



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





// Set camera initial position
camera.position.set(0, 0, 10);
// camera.lookAt(0, 0, 0)

// Define animation properties
const animationDuration = 0.9; // in seconds
// Define an array of snap points for the camera along the y-axis
const snapPoints = [-10, -20, -30, -40]; // Adjust these values to your requirements

// Function to find the nearest snap point based on the camera's current position
const findNearestSnapPoint = (currentPosition) => {
    return snapPoints.reduce((prev, curr) => {
        return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
    });
};

// Function to handle scroll and snap camera position to the nearest point

// Function to handle scroll and snap camera position to the nearest point

// Function to handle scroll and snap camera position to the nearest point
const startY = 0; // Starting y position
const sensitivity = 0.01; // Adjust sensitivity of scroll
const minY = -35; // Minimum y position
const maxY = 0; // Maximum y position

// Function to handle scroll and adjust camera position
const handleScroll = (event) => {
    const deltaY = event.deltaY;

    // Calculate new y position for the camera based on scroll
    let newY = camera.position.y - deltaY * sensitivity;

    // Clamp camera's y position within the specified range
    newY = Math.max(minY, Math.min(newY, maxY));

    camera.position.y = newY;
};

// Add event listener for scroll on the window
window.addEventListener('wheel', handleScroll);



window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Update camera aspect ratio and renderer size
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});



// Animation loop
const namesToRotate = ['torus'];

const animate = () => {
  requestAnimationFrame(animate);
  
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh && namesToRotate.includes(object.name)) {
      object.rotation.y += Math.random() * 0.01; // Adjust rotation speed as needed
    }
  });

  renderer.render(scene, camera);
};


animate();

