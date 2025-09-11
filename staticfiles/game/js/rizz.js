document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("rizzVideo");
    const playBtn = document.getElementById("playBtn");
    const overlayText = document.getElementById("overlayText");

    // Start paused at 0
    video.currentTime = 0;
    video.pause();
    video.muted = false;

    playBtn.addEventListener("click", () => {
        video.play().then(() => {
            // Fade out play button
            playBtn.classList.add("fade-out");
            setTimeout(() => playBtn.style.display = "none", 1000);

            // Show overlay text
            overlayText.classList.add("visible");
            setTimeout(() => overlayText.classList.add("fade-out"), 3000);
        }).catch(err => {
            console.error("Playback failed:", err);
        });
    });
});
