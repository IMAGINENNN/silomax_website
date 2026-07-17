document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".carousel-item");
    let currentIndex = 1;

    function getOffset(cardIndex, currentIndex, total) {
        let offset = cardIndex - currentIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        return offset;
    }

    function classForOffset(offset) {
        if (offset === 0) return "main-item";
        if (offset === -1) return "side-item left-item";
        if (offset === 1) return "side-item right-item";
        return "hidden-item";
    }

    function updateCarousel() {
        cards.forEach(card => {
            const cardIndex = parseInt(card.dataset.index, 10);
            const offset = getOffset(cardIndex, currentIndex, cards.length);

            card.classList.remove("main-item", "side-item", "left-item", "right-item", "hidden-item");
            card.classList.add(...classForOffset(offset).split(" "));
        });
    }

    document.querySelector(".carousel-btn-right").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    document.querySelector(".carousel-btn-left").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });
});