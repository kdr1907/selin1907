// Geri sayım
const targetDate = new Date("Sep 5, 2030 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById("countdown").innerHTML = "<h2>Bu sürenin bittiği ekranını yanyana görmek dileğiyle...</h2>";
        return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}

// Geri sayımı başlat ve sekme görünürlüğüne göre optimize et
let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(countdownInterval);
    } else {
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});

// Müzik kontrol (iOS uyumlu)
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicPause = document.getElementById("music-pause");
const musicVolume = document.getElementById("music-volume");

music.volume = 0.5;

musicToggle.addEventListener("click", () => {
    if (music.paused) {
        music.play().then(() => {
            musicToggle.style.display = "none";
            musicPause.style.display = "inline";
            musicVolume.style.display = "inline";
        }).catch(err => {
            console.log("Oynatma engellendi:", err);
            alert("Müzik oynatılamadı. Lütfen cihazınızın ses ayarlarını veya tarayıcı izinlerini kontrol edin.");
        });
    }
});

musicPause.addEventListener("click", () => {
    music.pause();
    musicPause.style.display = "none";
    musicToggle.style.display = "inline";
});

musicVolume.addEventListener("input", () => {
    music.volume = parseFloat(musicVolume.value);
});

// Mesaj formu aç/kapa
const messageToggle = document.getElementById("message-toggle");
const messageForm = document.getElementById("message-form");

messageToggle.addEventListener("click", () => {
    const isFormVisible = messageForm.style.display === "none" || messageForm.style.display === "";
    messageForm.style.display = isFormVisible ? "flex" : "none";
    messageToggle.style.display = isFormVisible ? "none" : "inline";
    document.getElementById("music-control").style.top = isFormVisible ? "60px" : "15px";
});

// Mesaj gönderimi
const sendBtn = document.getElementById("send-message");
const messageInput = document.getElementById("message-input");
const messageStatus = document.getElementById("message-status");

sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message === "") {
        alert("Lütfen bir mesaj yazın!");
        return;
    }

    fetch("https://formspree.io/f/xandvwqq", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    }).then(response => {
        if (response.ok) {
            messageStatus.style.display = "inline";
            messageInput.value = "";
            setTimeout(() => messageStatus.style.display = "none", 5000); // Süreyi artırdık
        } else {
            alert("Mesaj gönderilemedi! Formspree bağlantısını kontrol edin.");
        }
    }).catch(() => alert("Bağlantı hatası! İnternet bağlantınızı kontrol edin."));
});