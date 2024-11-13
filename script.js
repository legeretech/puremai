// header section

const slider = document.querySelector('.header-slider');
const slides = document.querySelectorAll('.header-slide');
const dots = document.querySelectorAll('.header-dot');
const prevButton = document.querySelector('.header-prev');
const nextButton = document.querySelector('.header-next');

let currentSlide = 0;
let startX;
let isDragging = false;
let dragOffset = 0;

function updateSlider() {
    slider.style.transform = `translateX(${-currentSlide * 100}%)`;
    
    // Update active states
    slides.forEach(slide => slide.classList.remove('header-active'));
    dots.forEach(dot => dot.classList.remove('header-active'));
    
    slides[currentSlide].classList.add('header-active');
    dots[currentSlide].classList.add('header-active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Touch and mouse events
function handleDragStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
    dragOffset = 0;
}

function handleDragMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    dragOffset = currentX - startX;
    
    const percentage = (dragOffset / slider.offsetWidth) * 100;
    slider.style.transform = `translateX(${-currentSlide * 100 + percentage}%)`;
}

function handleDragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    const threshold = slider.offsetWidth * 0.2;
    
    if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    } else {
        updateSlider();
    }
}

// Event Listeners
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Touch and mouse event listeners
slider.addEventListener('mousedown', handleDragStart);
slider.addEventListener('touchstart', handleDragStart);

window.addEventListener('mousemove', handleDragMove);
window.addEventListener('touchmove', handleDragMove, { passive: false });

window.addEventListener('mouseup', handleDragEnd);
window.addEventListener('touchend', handleDragEnd);

// Auto-advance slides
setInterval(nextSlide, 5000);

// Prevent context menu on long press
slider.addEventListener('contextmenu', (e) => e.preventDefault());


// header section