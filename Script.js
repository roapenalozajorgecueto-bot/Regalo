const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("music");
const message = document.getElementById("message");
const lyrics = document.getElementById("lyrics");
const lyricsBox = document.getElementById("lyrics");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 💓 CORAZÓN
let scale = 10;
let growing = true;
let animationId;

function drawHeart(scale) {
  ctx.beginPath();
  for (let t = 0; t < Math.PI * 2; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    ctx.lineTo(
      canvas.width / 2 + x * scale,
      canvas.height / 2 + y * scale
    );
  }
  ctx.closePath();
  ctx.fillStyle = "crimson";
  ctx.shadowColor = "red";
  ctx.shadowBlur = 20;
  ctx.fill();
}

function animateHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawHeart(scale);

  if (growing) {
    scale += 0.08;
    if (scale > 11.5) growing = false;
  } else {
    scale -= 0.08;
    if (scale < 10) growing = true;
  }

  animationId = requestAnimationFrame(animateHeart);
}

// 🎶 LETRAS SINCRONIZADAS (MILIMÉTRICAS)
const lyricsTimeline = [
  {
    time: 0.10,
    text: "No me imaginé que funcionaba así\nNo buscaba amor y un día te encontré\nEstaba vivo, pero con vos comencé a vivir\nFuiste una bendición, me queda agradecer\nSos ese cuento del que no quiero saber el final\nEse cometa que tuve suerte de presenciar\nEl mundo es feo y su pasado provocó ansiedad\nMiro al infierno, pero en tierra"
  },
  {
    time: 24.0,
    text: "Si algún día de estos se hace gris tu cielo\nLo pintarás mirando un río\nLas lágrimas y el frío te hicieron de hielo\nY daré la piel pa servir de abrigo\nY aunque el orgullo a veces ocultó mis miedos\nTemo a caer y que no estés conmigo\nTe ofrezco amor real de un corazón sincero\nY quemar la llave que abrió el laberinto"
  },
  
  {
    time: 73.0,
    text: "M.A.I\nM.A.I\nM.A.I\nM.A.I"
  },
  {
    time: 84.0,
    text: "Hoy el tiempo no perdona\nY el ambiente es raro\nPero solo esa persona\nMe dio sus manos\nTu alma era viajera y sola\nSé que es un descaro\nY la mía se desmorona\nPero combinamos"
  },
  {
    time: 107.0,
    text: "Lograste comprender lo que ni yo entendí\nTus palabras hoy fueron mirada ayer\nPreferiste escuchar antes que verme sonreír\nMe hiciste ser mejor, me queda agradecer"
  },
  {
    time: 118.0,
    text: "Si algún día de estos se hace gris tu cielo\nLo pintarás mirando un río\nLas lágrimas y el frío te hicieron de hielo\nY daré la piel pa servir de abrigo\nY aunque el orgullo a veces ocultó mis miedos\nTemo a caer y que no estés conmigo\nTe ofrezco amor real de un corazón sincero\nY quemar la llave que abrió el laberinto"
  },
  {
    time: 140.0,
    text: "M.A.I (M.A.I)\nM.A.I\nM.A.I (M.A.I)\nM.A.I\nM.A.I (M.A.I)\nM.A.I\nM.A.I (M.A.I)\nQuemar la llave que abrió el laberinto"
  }
];


let currentLyricIndex = -1;

function syncLyrics() {
  const currentTime = music.currentTime;

  for (let i = lyricsTimeline.length - 1; i >= 0; i--) {
    if (currentTime >= lyricsTimeline[i].time) {
      if (currentLyricIndex !== i) {
        currentLyricIndex = i;
        lyricsBox.style.opacity = 0;

        setTimeout(() => {
          lyricsBox.textContent = lyricsTimeline[i].text;
          lyricsBox.style.opacity = 1;
        }, 500);
      }
      break;
    }
  }

  requestAnimationFrame(syncLyrics);
}

// ▶️ START
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  canvas.style.display = "block";
  musicBtn.style.display = "block";

  music.play();
  animateHeart();
  syncLyrics();

  setTimeout(() => {
    message.style.opacity = 1;
  }, 3000);
});

// ⏯️ Play / Pause
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "⏸️";
  } else {
    music.pause();
    musicBtn.textContent = "▶️";
  }
});

// ✨ FINAL
music.addEventListener("ended", () => {
  cancelAnimationFrame(animationId);
  lyricsBox.textContent = "Gracias por existir ❤️";
  lyricsBox.style.opacity = 1;
  message.innerHTML += "<br><br>✨ Siempre contigo ✨";
});

// 📱 Responsive
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
