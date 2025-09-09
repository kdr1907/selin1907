// Geri sayım
const targetDate = new Date("Sep 5, 2030 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById("countdown").innerHTML = "<h2>Bu sürenin bittiği ekranını yanyana görmek dileğiyle...</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Müzik kontrol
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicPause = document.getElementById("music-pause");
const musicVolume = document.getElementById("music-volume");

music.volume = 0.5; // Başlangıç sesi

musicToggle.addEventListener("click", () => {
    music.play();
    musicToggle.style.display = "none";
    musicPause.style.display = "inline";
    musicVolume.style.display = "inline";
});

musicPause.addEventListener("click", () => {
    music.pause();
    musicPause.style.display = "none";
    musicToggle.style.display = "inline";
});

// **Ses slider düzgün çalışıyor**
musicVolume.addEventListener("input", () => {
    music.volume = parseFloat(musicVolume.value);
});

// "..." butonuna tıklayınca form aç/kapa
const messageToggle = document.getElementById("message-toggle");
const messageForm = document.getElementById("message-form");

messageToggle.addEventListener("click", () => {
    if (messageForm.style.display === "none") {
        messageForm.style.display = "flex";
    } else {
        messageForm.style.display = "none";
    }
});


// Mesaj gönderimi Formspree ile (AJAX)
const sendBtn = document.getElementById("send-message");
const messageInput = document.getElementById("message-input");
const messageStatus = document.getElementById("message-status");

sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message === "") return;

    fetch("https://formspree.io/f/xandvwqq", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).then(response => {
        if (response.ok) {
            messageStatus.style.display = "inline";
            messageInput.value = "";
            setTimeout(() => {
                messageStatus.style.display = "none";
            }, 3000);
        } else {
            alert("Mesaj gönderilemedi!");
        }
    }).catch(() => {
        alert("Mesaj gönderilemedi!");
    });
});
