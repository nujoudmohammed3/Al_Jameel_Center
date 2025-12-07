// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Three.js Background Animation
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create "0" and "1" textures using Canvas
    const createTextTexture = (text) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;

        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#FFFFFF'; // White for maximum contrast
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 1.0; // Max opacity for visibility
        ctx.fillText(text, 32, 32);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    };

    const texture0 = createTextTexture('0');
    const texture1 = createTextTexture('1');
    const materials = [
        new THREE.SpriteMaterial({ map: texture0, transparent: true, opacity: 0.9 }),
        new THREE.SpriteMaterial({ map: texture1, transparent: true, opacity: 0.9 })
    ];

    // Create particles
    const particleCount = 200;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const material = materials[Math.floor(Math.random() * materials.length)];
        const particle = new THREE.Sprite(material);

        particle.position.x = (Math.random() - 0.5) * 100;
        particle.position.y = (Math.random() - 0.5) * 100;
        particle.position.z = (Math.random() - 0.5) * 50;

        // Custom properties for animation
        particle.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05,
                0
            )
        };

        // Random scale
        const scale = Math.random() * 2 + 1;
        particle.scale.set(scale, scale, 1);

        scene.add(particle);
        particles.push(particle);
    }

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        particles.forEach(particle => {
            particle.position.add(particle.userData.velocity);

            // Boundary check to keep particles in view
            if (particle.position.x > 50) particle.position.x = -50;
            if (particle.position.x < -50) particle.position.x = 50;
            if (particle.position.y > 50) particle.position.y = -50;
            if (particle.position.y < -50) particle.position.y = 50;
        });

        // Slowly rotate the entire scene for dynamic effect
        scene.rotation.y += 0.001;
        scene.rotation.x += 0.0005;

        renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize Three.js after DOM is loaded
document.addEventListener('DOMContentLoaded', initThreeJS);
