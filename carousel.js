
document.addEventListener("DOMContentLoaded", () => {
    const images = [
    "/data/images/feedBack_images/feedBack_1.png",
    "/data/images/feedBack_images/feedBack_2.png",
    "/data/images/feedBack_images/feedBack_3.png",
    "/data/images/feedBack_images/feedBack_4.png",
    "/data/images/feedBack_images/feedBack_5.png",
    "/data/images/feedBack_images/feedBack_6.png",
    "/data/images/feedBack_images/feedBack_7.png"
    ]

    let currentIndex = 2;

    function wrap(idnex, length) {
    return (idnex + length) % length;
    }

    function updateCarousel() {
        const leftImg = images[wrap(currentIndex - 1, images.length)];
        const mainImg = images[currentIndex];
        const rightImg = images[wrap(currentIndex + 1, images.length)];

        document.querySelector(".left-item img").src = leftImg;
        document.querySelector(".main-item img").src = mainImg;
        document.querySelector(".right-item img").src = rightImg;
    }

    document.querySelector(".carousel-btn-right").addEventListener("click", () => {
        currentIndex = wrap(currentIndex + 1, images.length);
        updateCarousel();
    });

    document.querySelector(".carousel-btn-left").addEventListener("click", () => {
        currentIndex = wrap(currentIndex - 1, images.length);
        updateCarousel();
    });
});