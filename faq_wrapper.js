document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.faq-item-header');
        const btn = item.querySelector('.faq-toggle');
        const text = item.querySelector('.faq-item-text');

        const toggle = () => {
            const isOpen = item.classList.toggle('active');
            btn.setAttribute('aria-expanded', isOpen);
            btn.textContent = isOpen ? '−' : '+';
            text.style.maxHeight = isOpen ? text.scrollHeight + 'px' : '0px';
        };

        // клик по кнопке
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // ❗ важно
            toggle();
        });

        // клик по всему header
        header.addEventListener('click', toggle);
    });
});