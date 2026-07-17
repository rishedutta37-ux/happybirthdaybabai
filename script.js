/* ==========================================
   HAPPY BIRTHDAY MONDIRA ❤️
   Part 3A
========================================== */

const loader = document.getElementById("loader");
const intro = document.getElementById("intro");
const website = document.getElementById("website");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");

/* =========================
   Loader
========================= */

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.display = "none";
    }, 1800);
});

/* =========================
   Open Website
========================= */

openBtn.addEventListener("click", () => {

    intro.style.display = "none";
    website.style.display = "block";

    music.play().catch(() => {});

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =========================
   Floating Hearts
========================= */

const hearts = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 28) + "px";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);

}

setInterval(createHeart, 350);

/* =========================
   Twinkling Stars
========================= */

const stars = document.getElementById("stars");

for (let i = 0; i < 120; i++) {

    let star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay =
        Math.random() * 2 + "s";

    stars.appendChild(star);

}

/* =========================
   Photo Slider
========================= */

const slides = document.querySelectorAll(".slider img");

let current = 0;

function changeSlide() {

    slides[current].classList.remove("active");

    current++;

    if (current >= slides.length)
        current = 0;

    slides[current].classList.add("active");

}

setInterval(changeSlide, 4000);

/* =========================
   Scroll Animation
========================= */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(sec => {

    sec.classList.add("fade-up");

    observer.observe(sec);

});

/* ==========================================
   PART 3B
   Cake Cut + Fireworks + Balloons
========================================== */

/* ===========================
      CAKE CUT
=========================== */

const knife = document.getElementById("knife");
const cake = document.getElementById("cake");
const cutBtn = document.getElementById("cutCake");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let cakeCut = false;

cutBtn.addEventListener("click", () => {

    if (cakeCut) return;

    cakeCut = true;

    knife.classList.add("cut");

    setTimeout(() => {

        cake.classList.add("split");

    }, 1200);

    setTimeout(() => {

        launchFireworks();

        createConfetti();

        releaseBalloons();

    }, 1800);

});

/* ===========================
        FIREWORKS
=========================== */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

const fireworks = [];

class Firework {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;

        this.particles = [];

        for (let i = 0; i < 80; i++) {

            this.particles.push({

                x: this.x,
                y: this.y,

                dx: (Math.random() - 0.5) * 8,

                dy: (Math.random() - 0.5) * 8,

                life: 100,

                color:
                    `hsl(${Math.random()*360},100%,60%)`

            });

        }

    }

}

function launchFireworks() {

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            fireworks.push(new Firework());

        }, i * 350);

    }

}

function animateFireworks() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    fireworks.forEach((firework,index)=>{

        firework.particles.forEach(p=>{

            p.x+=p.dx;

            p.y+=p.dy;

            p.dy+=0.05;

            p.life--;

            ctx.beginPath();

            ctx.arc(p.x,p.y,3,0,Math.PI*2);

            ctx.fillStyle=p.color;

            ctx.fill();

        });

        firework.particles =
        firework.particles.filter(p=>p.life>0);

        if(firework.particles.length===0){

            fireworks.splice(index,1);

        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

/* ===========================
      CONFETTI
=========================== */

function createConfetti(){

    for(let i=0;i<250;i++){

        const conf=document.createElement("div");

        conf.style.position="fixed";

        conf.style.width="8px";
        conf.style.height="12px";

        conf.style.left=Math.random()*100+"vw";

        conf.style.top="-20px";

        conf.style.background=
        `hsl(${Math.random()*360},100%,60%)`;

        conf.style.opacity="1";

        conf.style.zIndex="9999";

        conf.style.transform=
        `rotate(${Math.random()*360}deg)`;

        document.body.appendChild(conf);

        const duration=3+Math.random()*3;

        conf.animate([

            {
                transform:`translateY(0px)
                rotate(0deg)`
            },

            {
                transform:
                `translateY(${window.innerHeight+100}px)
                 rotate(720deg)`
            }

        ],{

            duration:duration*1000,

            easing:"linear"

        });

        setTimeout(()=>{

            conf.remove();

        },duration*1000);

    }

}

/* ===========================
      BALLOONS
=========================== */

function releaseBalloons(){

    const colors=[
        "#ff4d6d",
        "#ffd60a",
        "#00bbf9",
        "#9b5de5",
        "#00f5d4",
        "#ff99c8"
    ];

    for(let i=0;i<30;i++){

        const balloon=document.createElement("div");

        balloon.className="balloon";

        balloon.style.left=
        Math.random()*100+"vw";

        balloon.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        balloon.style.animationDuration=
        (8+Math.random()*6)+"s";

        document.body.appendChild(balloon);

        setTimeout(()=>{

            balloon.remove();

        },15000);

    }

}

/* ==========================================
   PART 3C
   Countdown + Sparkles + Final Effects
========================================== */

/* ===========================
      COUNTDOWN
=========================== */

const timer = document.getElementById("timer");

function updateCountdown() {

    const now = new Date();

    let birthday = new Date(now.getFullYear(), 6, 21, 0, 0, 0);

    if (now > birthday) {

        birthday = new Date(now.getFullYear() + 1, 6, 21);

    }

    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60))
        / 1000
    );

    timer.innerHTML =
        `${days} Days ❤️ ${hours} Hours ❤️ ${minutes} Minutes ❤️ ${seconds} Seconds`;

}

setInterval(updateCountdown, 1000);

updateCountdown();

/* ===========================
      SPARKLES
=========================== */

function createSparkle() {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = Math.random() * 100 + "vw";

    sparkle.style.top = Math.random() * 100 + "vh";

    document.body.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 2000);

}

setInterval(createSparkle, 250);

/* ===========================
      FINAL MESSAGE
=========================== */

setTimeout(() => {

    console.log("❤️ Happy Birthday Mondira ❤️");

}, 5000);

/* ===========================
      MUSIC VOLUME
=========================== */

music.volume = 0.5;

/* ===========================
      AUTO SCROLL TO CAKE
=========================== */

openBtn.addEventListener("click", () => {

    setTimeout(() => {

        document.querySelector(".cake-section").scrollIntoView({

            behavior: "smooth"

        });

    }, 3500);

});

/* ===========================
      HEART BURST
=========================== */

function heartBurst() {

    for (let i = 0; i < 30; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "💖";

        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.fontSize = (18 + Math.random() * 25) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "9999";

        const x = (Math.random() - 0.5) * 700;

        const y = (Math.random() - 0.5) * 700;

        document.body.appendChild(heart);

        heart.animate([
            {
                transform: "translate(0,0) scale(1)",
                opacity: 1
            },
            {
                transform: `translate(${x}px,${y}px) scale(2)`,
                opacity: 0
            }
        ], {
            duration: 2000,
            easing: "ease-out"
        });

        setTimeout(() => {

            heart.remove();

        }, 2000);

    }

}

/* ===========================
      AFTER CAKE CUT
=========================== */

cutBtn.addEventListener("click", () => {

    setTimeout(() => {

        heartBurst();

    }, 2000);

});

/* ===========================
      ENDING MESSAGE
=========================== */

window.addEventListener("load", () => {

    console.log("Made with ❤️ by Protyush");

});