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

let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(countdownInterval);
    else countdownInterval = setInterval(updateCountdown, 1000);
});

// 🎵 butonu Spotify'a yönlendiriyor
document.getElementById("music-toggle").addEventListener("click", () => {
    window.open("https://open.spotify.com/intl-tr/track/6JPx6Zm6k4lJEiDrs8RVEv?si=f098556aba454ee5", "_blank");
});

// "..." butonu mesaj formunu açıyor/kapatıyor
const messageToggle = document.getElementById("message-toggle");
const messageForm = document.getElementById("message-form");

messageToggle.addEventListener("click", () => {
    messageForm.style.display = messageForm.style.display === "flex" ? "none" : "flex";
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
            setTimeout(() => messageStatus.style.display = "none", 5000);
        } else {
            alert("Mesaj gönderilemedi! Formspree bağlantısını kontrol edin.");
        }
    }).catch(() => alert("Bağlantı hatası! İnternet bağlantınızı kontrol edin."));
});
