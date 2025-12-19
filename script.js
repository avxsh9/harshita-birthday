document.addEventListener('DOMContentLoaded', () => {

    /* 
    ------------------------------------------
    SCROLLING PHOTO MARQUEE INJECTOR
    ------------------------------------------
    */
    // List of images to use in the marquee
    const marqueeImages = [
        "IMG_5508 2 9.28.06 PM.jpg",
        "IMG_5496 2.jpg",
        "IMG_5504 2 9.28.06 PM.jpg",
        "IMG_5500 2 9.28.06 PM.jpg",
        "IMG_5480 2.jpg",
        "IMG_5456 2 9.28.07 PM.jpg",
        "IMG_5455 2 9.28.07 PM.jpg",
        "IMG_0650.jpg",
        "IMG_0649 9.28.07 PM.jpg",
        "IMG_0648.jpg",
        "IMG_5453 2 9.28.07 PM.jpg",
        "IMG_5527 2.jpg",
        "harshita.JPG",
        "IMG_5178 3.JPG",
        "IMG_5182 3.JPG",
        "IMG_5186 3.JPG",
        "IMG_5201 3.JPG",
        "IMG_5204 3.JPG",
        "IMG_5224 3.JPG",
        "IMG_5236 3.JPG",
        "IMG_5248 3.JPG",
        "IMG_5263 3.JPG",
        "IMG_5266 3.JPG",
        "IMG_5286 3.JPG",
        "IMG_5539 2 9.28.06 PM.jpg",
        "IMG_5538 2 9.28.06 PM.jpg",
        "IMG_5528 2 9.28.06 PM.jpg",
        "IMG_5522 2.jpg",
        "IMG_5507 2 9.28.06 PM.jpg",
        "IMG_5506 2 9.28.06 PM.jpg",
        "IMG_5505 2 9.28.06 PM.jpg",
        "IMG_5503 2 9.28.06 PM.jpg",
        "IMG_5502 2 9.28.06 PM.jpg",
        "IMG_5501 2 9.28.06 PM.jpg",
        "IMG_5498 2 9.28.06 PM.jpg",
        "IMG_5497 2.jpg",
        "IMG_5495 2 9.28.06 PM.jpg",
        "IMG_5492 2 9.28.07 PM.JPG",
        "IMG_5490 2 9.28.07 PM.JPG",
        "IMG_5489 2.JPG",
        "IMG_5488 2.JPG",
        "IMG_5482 2 9.28.06 PM.jpg",
        "IMG_5481 2 9.28.06 PM.jpg",
        "IMG_5476 2.JPG",
        "IMG_5473 2.JPG",
        "IMG_5468 2 9.28.07 PM.JPG",
        "IMG_4070 9.28.07 PM.JPG",
        "IMG_4069.JPG",
        "IMG_3424 9.28.07 PM.JPG",
        "IMG_3423 9.28.07 PM.JPG",
        "IMG_3422 9.28.07 PM.JPG",
        "IMG_3420 9.28.07 PM.JPG",
        "0FBEB51C-54FC-401A-862E-B0A667700788.JPG",
        "1735F2C9-0FD2-475C-B0BB-9DC0596AEF8D.JPG",
        "23F20FD3-897F-4489-8E58-1E9CC186D19A 9.28.07 PM.JPG",
        "398D2729-E56D-476E-B2CD-61BE913E5EEB 9.28.07 PM.JPG",
        "3B3D8013-6037-4EA7-A743-6E37733A9B5D 2 9.28.07 PM.JPG"
    ];

    function createMarquee() {
        const wrapper = document.createElement('div');
        wrapper.className = 'scrolling-grid-wrapper';

        // Helper to create a single track
        const createTrack = () => {
            const track = document.createElement('div');
            track.className = 'scrolling-grid-track';
            // Duplicate content 4 times for seamless scrolling
            let imagesHTML = marqueeImages.map(src => `<img src="${src}" alt="Memory" loading="lazy">`).join('');
            track.innerHTML = imagesHTML + imagesHTML + imagesHTML + imagesHTML;
            return track;
        };

        // Create 3 rows to fill the screen (approx 350px each covering 100vh)
        wrapper.appendChild(createTrack());
        wrapper.appendChild(createTrack());
        wrapper.appendChild(createTrack());

        return wrapper;
    }

    // Target ONLY the header for the full-screen background grid
    const targets = document.querySelectorAll('header');

    targets.forEach(target => {
        target.style.position = "relative";
        target.appendChild(createMarquee());
    });


    /* 
    ------------------------------------------
    FADE IN ANIMATION (Existing)
    ------------------------------------------
    */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    /* 
    ------------------------------------------
    SURPRISE BUTTON (Existing)
    ------------------------------------------
    */
    const surpriseBtn = document.getElementById('surpriseBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    if (surpriseBtn && hiddenMessage) {
        surpriseBtn.addEventListener('click', () => {
            hiddenMessage.classList.add('revealed');
            surpriseBtn.textContent = "Glad to see that smile :)";
            surpriseBtn.style.pointerEvents = "none";
            surpriseBtn.style.borderColor = "transparent";
            surpriseBtn.style.backgroundColor = "var(--accent-pink)";
            surpriseBtn.style.color = "var(--white)";
        });
    }

    /* 
    ------------------------------------------
    BACKGROUND MUSIC PLAYER
    ------------------------------------------
    */
    // Create Audio Element
    const audio = new Audio('music.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    // Create Control Button
    const musicBtn = document.createElement('div');
    musicBtn.className = 'music-control';
    musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
    musicBtn.title = "Play Music";
    document.body.appendChild(musicBtn);

    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<span class="music-icon">🔇</span>';
            musicBtn.title = "Play Music";
        } else {
            audio.play().then(() => {
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
                musicBtn.title = "Pause Music";
            }).catch(e => {
                console.log("Audio play failed:", e);
                alert("Please click anywhere on the page to allow music playback first, or check if 'music.mp3' exists.");
            });
        }
        isPlaying = !isPlaying;
    });

    // Try auto-play
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
            }).catch(() => { });
        }
    }, { once: true });


    /* 
    ------------------------------------------
    FLOATING HEARTS GENERATOR
    ------------------------------------------
    */
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️'; // Or use other emojis like 💖, 🌸

        // Randomize position and animation properties
        const startLeft = Math.random() * 100; // 0 to 100vw
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const scale = Math.random() * 0.5 + 0.5; // size variation

        heart.style.left = startLeft + 'vw';
        heart.style.animationDuration = duration + 's';
        heart.style.transform = `scale(${scale})`; // Only applies initial scale, keyframes act on translate

        document.body.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Spawn a heart every 500ms
    setInterval(createFloatingHeart, 600);


    /* 
    ------------------------------------------
    SCROLL ANIMATIONS FOR IMAGES
    ------------------------------------------
    */
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                imgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const animatedImages = document.querySelectorAll('.animate-img');
    animatedImages.forEach(img => imgObserver.observe(img));

    /* 
    ------------------------------------------
    SECRET VAULT LOGIC (SECURE)
    ------------------------------------------
    */
    const correctHash = "6c4d72aa2fdf94235cb935f9d10d5e5406e7a05143d5cfdc049af8bfcaece47b"; // SHA-256 for 

    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    const unlockBtn = document.getElementById('unlockBtn');
    const secretPin = document.getElementById('secretPin');
    const errorMsg = document.getElementById('errorMsg');
    const lockContainer = document.getElementById('lockContainer');
    const videoContainer = document.getElementById('videoContainer');
    const secretVideoFrame = document.getElementById('secretVideoFrame');

    async function attemptUnlock() {
        if (!secretPin) return; // Guard clause

        const input = secretPin.value;
        const hash = await sha256(input);

        if (hash === correctHash) {
            // Success
            if (lockContainer) lockContainer.style.display = 'none';
            if (videoContainer) videoContainer.style.display = 'none'; // Ensure old logic is handled if element exists
            const vaultContent = document.getElementById('vaultContent');
            if (vaultContent) {
                vaultContent.style.display = 'block';

                // Add Single Play Logic
                const vaultVideos = document.querySelectorAll('.vault-video');
                vaultVideos.forEach(video => {
                    video.addEventListener('play', () => {
                        vaultVideos.forEach(otherVideo => {
                            if (otherVideo !== video) {
                                otherVideo.pause();
                            }
                        });
                    });
                });
            }
        } else {
            // Error
            if (errorMsg) errorMsg.style.display = 'block';
            if (secretPin) secretPin.style.borderColor = 'red';
            setTimeout(() => {
                if (secretPin) secretPin.style.borderColor = '#ddd';
                if (errorMsg) errorMsg.style.display = 'none';
            }, 2000);
        }
    }

    if (unlockBtn) {
        unlockBtn.addEventListener('click', attemptUnlock);
        if (secretPin) {
            secretPin.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') attemptUnlock();
            });
        }
    }

});
