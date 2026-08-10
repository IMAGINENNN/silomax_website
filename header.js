document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll(".nav a");
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
    link.classList.toggle(
        "active",
        link.getAttribute("href") === currentPath
    );

    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});
});