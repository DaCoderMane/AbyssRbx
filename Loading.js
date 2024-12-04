const loadingText = "Abyss - The future of exploiting...";
const loadingElement = document.getElementById("loadingText");

function typeWriter() {
    loadingText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'fade-in';
        span.style.animationDelay = `${index * 0.1}s`;
        loadingElement.appendChild(span);
    });

    setTimeout(() => {
        document.getElementById("loading").style.opacity = "0";
        document.getElementById("loading").style.visibility = "hidden";
    }, (loadingText.length * 0.1 + 1) * 1000);
}

document.addEventListener("DOMContentLoaded", typeWriter);