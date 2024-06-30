const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxImage = document.getElementById('lightbox-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".gallery-item img");
    let loadedImages = 0;

    images.forEach(image => {
        if (image.complete) {
            incrementLoadedImages();
        } else {
            image.addEventListener("load", incrementLoadedImages);
            image.addEventListener("error", incrementLoadedImages);
        }
    });

    function incrementLoadedImages() {
        loadedImages++;
        if (loadedImages === images.length) {
            document.getElementById("loading-animation").style.display = "none";
        }
    }
});


galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    updateLightboxImage();
    lightbox.style.display = 'flex';
}

function hideLightbox() {
    lightbox.style.display = 'none';
    lightboxImage.src = 'none';
}

function updateLightboxImage() {
    const newImage = new Image();
    newImage.src = galleryItems[currentIndex].querySelector('img').src;
    newImage.onload = () => {
        lightboxImage.style.opacity = 0;
        setTimeout(() => {
            lightboxImage.src = newImage.src;
            lightboxImage.style.opacity = 1;
        }, 300);
    };
}

function navigateImages(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImages(-1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImages(1);
});

lightboxImage.addEventListener('click', (e) => {
    hideLightbox();
});

lightboxContent.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

lightboxContent.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        navigateImages(1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        navigateImages(-1);
    }
}

prevBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    navigateImages(-1);
});

nextBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    navigateImages(1);
});

