document.addEventListener('DOMContentLoaded', function() {
    const viewerContainer = document.getElementById('viewer-container');
    const infoTitle = document.getElementById('info-title-360');
    const infoDescription = document.getElementById('info-description-360');

    if (!viewerContainer) {
        console.error('Viewer container not found!');
        return;
    }

    // --- Define Your Museum Scenes Here ---
    const scenes = {
        entrance: {
            title: 'Museum Entrance',
            description: 'Welcome to the virtual museum dedicated to Magdalena Gamayo. From here, you can enter the main gallery.',
            image: 'https://placehold.co/4096x2048/888/fff?text=360+Entrance+View', // Replace with your 360 image
            links: [
                { to: 'mainHall', position: { x: -5000, y: -100, z: -1000 }, label: 'Enter Main Hall' }
            ]
        },
        mainHall: {
            title: 'Main Gallery Hall',
            description: 'This hall showcases the signature patterns of Magdalena Gamayo. Look around to see the exhibits.',
            image: 'https://placehold.co/4096x2048/777/fff?text=360+Main+Hall+View',
            links: [
                { to: 'inuritanExhibit', position: { x: 5000, y: -500, z: 1000 }, label: 'View Inuritan Exhibit' },
                { to: 'exit', position: { x: -5000, y: -1000, z: 4000 }, label: 'Go to Exit' }
            ]
        },
        inuritanExhibit: {
            title: 'The Inuritan Exhibit',
            description: 'A close-up view of the complex geometric Inuritan patterns.',
            image: 'https://placehold.co/4096x2048/666/fff?text=360+Exhibit+View',
            links: [
                { to: 'mainHall', position: { x: 5000, y: -300, z: -2000 }, label: 'Return to Main Hall' }
            ]
        },
        exit: {
            title: 'Exit Lobby',
            description: 'Thank you for visiting. You can return to the entrance from here.',
            image: 'https://placehold.co/4096x2048/555/fff?text=360+Exit+View',
            links: [
                { to: 'entrance', position: { x: 0, y: -500, z: 5000 }, label: 'Return to Entrance' }
            ]
        }
    };

    // --- Panolens.js Implementation ---
    const viewer = new PANOLENS.Viewer({ container: viewerContainer, controlBar: true, autoHideControlBar: true });

    // Function to load a scene by its key
    function loadScene(sceneKey) {
        const sceneData = scenes[sceneKey];
        if (!sceneData) {
            console.error(`Scene "${sceneKey}" not found!`);
            return;
        }

        // Update info box
        infoTitle.textContent = sceneData.title;
        infoDescription.textContent = sceneData.description;

        // Create a new panorama
        const panorama = new PANOLENS.ImagePanorama(sceneData.image);
        
        // Add navigation links (infospots)
        sceneData.links.forEach(link => {
            const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
            infospot.position.set(link.position.x, link.position.y, link.position.z);
            infospot.addHoverText(link.label);
            infospot.addEventListener('click', () => {
                // Dim the viewer for a nice transition
                viewer.tweenControlCenter(new THREE.Vector3(link.position.x, link.position.y, link.position.z), 0);
                setTimeout(() => loadScene(link.to), 500);
            });
            panorama.add(infospot);
        });
        
        // Set the new panorama as the current view
        viewer.setPanorama(panorama);
    }

    // Load the initial scene
    loadScene('entrance');
});

