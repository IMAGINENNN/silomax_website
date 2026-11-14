document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container-feedback");
    const cards = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".carousel-dot");
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

        dots.forEach(dot => {
            const dotIndex = parseInt(dot.dataset.index, 10);
            const isActive = dotIndex === currentIndex;
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-selected", isActive ? "true" : "false");
        });
    }

    function goNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function goPrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = parseInt(dot.dataset.index, 10);
            updateCarousel();
        });
    });

    document.querySelector(".carousel-btn-right").addEventListener("click", goNext);
    document.querySelector(".carousel-btn-left").addEventListener("click", goPrev);

    // Allow clicking side cards directly to navigate
    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (card.classList.contains("left-item")) goPrev();
            else if (card.classList.contains("right-item")) goNext();
        });
    });

    // Touch & pointer drag swipe support + trackpad horizontal swipe
    if (container) {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        container.addEventListener("pointerdown", e => {
            if (e.target.closest(".carousel-btn")) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
        });

        window.addEventListener("pointerup", e => {
            if (!isDragging) return;
            isDragging = false;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < 0) {
                    goNext();
                } else {
                    goPrev();
                }
            }
        });

        window.addEventListener("pointercancel", () => {
            isDragging = false;
        });

        // Two-finger horizontal trackpad swipe
        let wheelLocked = false;
        container.addEventListener(
            "wheel",
            e => {
                if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 25) return;
                e.preventDefault();
                if (wheelLocked) return;
                wheelLocked = true;
                if (e.deltaX > 0) {
                    goNext();
                } else {
                    goPrev();
                }
                setTimeout(() => {
                    wheelLocked = false;
                }, 420);
            },
            { passive: false }
        );
    }

    updateCarousel();
});