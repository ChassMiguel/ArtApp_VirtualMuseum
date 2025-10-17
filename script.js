document.addEventListener('DOMContentLoaded', () => {
    const scenes = {
        'entrance': {
            image: 'https://placehold.co/1920x1080/5C3D2E/ffffff?text=Minecraft+Museum+Entrance',
            title: 'The Museum Entrance',
            description: 'Welcome to the virtual museum dedicated to GAMABA awardee Magdalena Gamayo. This museum is a digital recreation of our build in Minecraft. Click the forward arrow to begin your tour.',
            nav: { forward: 'main_hall', back: null, left: null, right: null }
        },
        'main_hall': {
            image: 'https://placehold.co/1920x1080/A87C7C/ffffff?text=Main+Hall',
            title: 'Main Hall: The Weaver\'s Legacy',
            description: 'This central hall introduces Magdalena Gamayo\'s life and impact. To the left is the exhibit on the Inabel weaving process. To the right, you can explore her masterful designs.',
            nav: { forward: null, back: 'entrance', left: 'process_exhibit', right: 'designs_exhibit' }
        },
        'process_exhibit': {
            image: 'https://placehold.co/1920x1080/E8B4B8/333333?text=The+Weaving+Process',
            title: 'The Inabel Weaving Process',
            description: 'This exhibit showcases the meticulous journey from raw cotton to finished textile. We have recreated a traditional Ilocano pedal loom in the center of the room. Click the right arrow to return to the Main Hall.',
            nav: { forward: null, back: null, left: null, right: 'main_hall' }
        },
        'designs_exhibit': {
            image: 'https://placehold.co/1920x1080/B4A5A5/333333?text=Masterful+Designs',
            title: 'Gallery of Masterful Designs',
            description: 'Here, we use Minecraft blocks to recreate Gamayo\'s famous patterns. Notice the large "Binakol" pattern on the far wall, known for its mesmerizing optical illusions. Click the left arrow to return to the Main Hall.',
            nav: { forward: null, back: null, left: 'main_hall', right: null }
        }
    };

    let currentSceneId = 'entrance';
    const panoramaImage = document.getElementById('panorama-image');
    const loader = document.getElementById('loader');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const navForward = document.getElementById('nav-forward');
    const navBack = document.getElementById('nav-back');
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');

    function renderScene(sceneId) {
        const scene = scenes[sceneId];
        if (!scene) return;

        loader.classList.add('loader-active');
        panoramaImage.style.opacity = 0;

        const img = new Image();
        img.src = scene.image;
        img.onload = () => {
            panoramaImage.src = scene.image;
            setTimeout(() => {
                loader.classList.remove('loader-active');
                panoramaImage.style.opacity = 1;
            }, 200);
        };
        img.onerror = () => {
            panoramaImage.src = 'https://placehold.co/1920x1080/000/fff?text=Image+Not+Found';
            loader.classList.remove('loader-active');
            panoramaImage.style.opacity = 1;
        };

        infoTitle.textContent = scene.title;
        infoDescription.textContent = scene.description;
        updateNavArrow(navForward, scene.nav.forward);
        updateNavArrow(navBack, scene.nav.back);
        updateNavArrow(navLeft, scene.nav.left);
        updateNavArrow(navRight, scene.nav.right);
    }

    function updateNavArrow(arrowElement, nextSceneId) {
        if (nextSceneId) {
            arrowElement.classList.remove('hidden');
            arrowElement.onclick = () => {
                currentSceneId = nextSceneId;
                renderScene(currentSceneId);
            };
        } else {
            arrowElement.classList.add('hidden');
            arrowElement.onclick = null;
        }
    }
    renderScene(currentSceneId);
});
