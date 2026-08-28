document.addEventListener("DOMContentLoaded", () => {
    console.log("video.js loaded");

    const videos = document.querySelectorAll(".video__player");
    console.log("videos found:", videos.length);

    videos.forEach((video) => {
        video.addEventListener('pointerdown', () => {
            if (video.paused) {
                playVideo(video);
            } else {
                pauseVideo(video);
            }
        });

        video.addEventListener('pointerup', () => {
            if (!video.paused) {
                pauseVideo(video);
            }
        });

        video.addEventListener('pointerleave', () => {
            if (!video.paused) {
                pauseVideo(video);
            }
        });

        video.addEventListener("mouseenter", () => {
            if (video.paused) {
                playVideo(video);
            } else {
                pauseVideo(video);
            }
        });

        video.addEventListener("mouseleave", () => {
            if (!video.paused) {
                pauseVideo(video);
            }
        })
    });

    function playVideo(video) {
        videos.forEach((video) => pauseVideo(video));
        video.play();
        hidePlayButton(video);
    }

    function pauseVideo(video) {
        video.pause();
        showPlayButton(video);
    }

    function hidePlayButton(video) {
        const buttonPlay = video.closest(".video").querySelector(".video__playbutton");

        console.log(buttonPlay);

        buttonPlay.classList.add('not-visible');
    }

    function showPlayButton(video) {
        const buttonPlay = video.closest(".video").querySelector(".video__playbutton");

        console.log(buttonPlay);

        buttonPlay.classList.remove('not-visible');
    }
});
