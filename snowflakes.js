const canvas = document.getElementById("SnowflakeCanvas");
const ctx = canvas.getContext("2d");

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

let numSnowflakes = Math.floor((canvas.width * canvas.height) / 5000);

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Snowflake {
    constructor() {
        this.reset();
        this.opacity = random(0.5, 1);
        this.spin = random(-0.02, 0.02);
    }

    reset() {
        this.x = random(0, canvas.width);
        this.y = random(-canvas.height, 0);
        this.size = random(2, 5);
        this.velocityY = random(1, 3);
        this.velocityX = random(-0.5, 0.5);
        this.angle = random(0, Math.PI * 2);
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.angle += this.spin;

        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.reset();
            this.y = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(173, 216, 230, ${this.opacity * 0.5})`);

        ctx.fillStyle = gradient;

        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.size);
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.size * 0.7, this.size * 0.7);
            ctx.stroke();

            ctx.rotate(Math.PI / 3);
        }

        ctx.restore();
    }
}

let snowflakes = [];
function createSnowflakes() {
    snowflakes = [];
    for (let i = 0; i < numSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }
}
createSnowflakes();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw(ctx);
    });

    requestAnimationFrame(animate);
}

animate();

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setCanvasSize();
        numSnowflakes = Math.floor((canvas.width * canvas.height) / 5000);
        createSnowflakes();
    }, 200);
});
