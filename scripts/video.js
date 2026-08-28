document.addEventListener("DOMContentLoaded", () => {
    console.log("video.js loaded");

    const videos = document.querySelectorAll(".video__player");

    videos.forEach((video) => {
        const togglePlay = () => (video.paused ? playVideo(video) : pauseVideo(video));
        const pauseIfPlaying = () => !video.paused && pauseVideo(video);

        if (video.classList.contains("video__player_noplayonhover")) {
            video.addEventListener("click", togglePlay);
            return;
        }

        video.addEventListener("pointerdown", togglePlay);
        video.addEventListener("pointerup", pauseIfPlaying);
        video.addEventListener("pointerleave", pauseIfPlaying);
        video.addEventListener("mouseenter", togglePlay);
        video.addEventListener("mouseleave", pauseIfPlaying);
    });

    function playVideo(video) {
        videos.forEach(pauseVideo);
        video.play();
        setPlayButtonVisibility(video, false);
    }

    function pauseVideo(video) {
        video.pause();
        setPlayButtonVisibility(video, true);
    }

    function setPlayButtonVisibility(video, visible) {
        const buttonPlay = video.closest(".video")?.querySelector(".video__playbutton");

        if (!buttonPlay) {
            return;
        }

        if (visible) {
            buttonPlay.classList.remove("not-visible");
        } else {
            buttonPlay.classList.add("not-visible");
        }
    }
});
