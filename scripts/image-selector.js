document.addEventListener("DOMContentLoaded", () => {
    console.log('image-selector loaded!');

    const selector = document.querySelector(".image-selector");

    if (!selector) {
        return console.error('DOM: no .image-selector found');
    }

    const images = selector.querySelectorAll(".image-selector__image");
    const pages = selector.querySelectorAll(".image-selector__page");

    const prevButton = selector.querySelector(".image-selector__button_prev");
    const nextButton = selector.querySelector(".image-selector__button_next");
    const counter = selector.querySelector(".image-selector__counter");

    if (!images.length || images.length !== pages.length) {
        return console.error('DOM: no images, or images quantity does not equal pages quantity');
    }

    let currentIndex = 0;
    let timer = null;

    const interval = 10000;

    function showSlide(index) {
        images[currentIndex].classList.remove("image-selector__image_active");
        pages[currentIndex].classList.remove("image-selector__page_active");

        currentIndex = (index + images.length) % images.length;

        images[currentIndex].classList.add("image-selector__image_active");
        pages[currentIndex].classList.add("image-selector__page_active");

        if (counter) {
            counter.textContent = `${currentIndex + 1}/${images.length}`;
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startTimer() {
        clearInterval(timer);

        timer = setInterval(() => {
            nextSlide();
        }, interval);
    }

    nextButton?.addEventListener("click", () => {
        nextSlide();
        startTimer();
    });

    prevButton?.addEventListener("click", () => {
        prevSlide();
        startTimer();
    });

    startTimer();
});
