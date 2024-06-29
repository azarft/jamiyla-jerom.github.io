const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    const imageSrc = galleryItems[currentIndex].querySelector('img').src;
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'block';
}

function hideLightbox() {
    lightbox.style.display = 'none';
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showLightbox();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showLightbox();
});

window.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target === lightboxImage) {
        hideLightbox();
    }
});
