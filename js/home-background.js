document.addEventListener("DOMContentLoaded", function () {
    var hero = document.querySelector(".ashade-home-background");
    var homeActions = document.querySelectorAll(
        ".ashade-home-link[role='button']"
    );
    var videoSrc = hero ? hero.getAttribute("data-video-src") : "";
    var videoQuality = hero ? hero.getAttribute("data-video-quality") : "";
    var prefersReducedMotion = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    var connection = navigator.connection || {};
    var savesData =
        connection && connection.saveData ? connection.saveData : false;
    var isSlowConnection = /(^|-)2g$/.test(connection.effectiveType || "");
    var media = null;
    var mediaLoaded = false;
    var mediaFailed = false;
    var vimeoOrigin = "https://player.vimeo.com";

    homeActions.forEach(function (action) {
        action.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            event.preventDefault();
            action.click();
        });
    });

    if (
        !hero ||
        !videoSrc ||
        prefersReducedMotion ||
        savesData ||
        isSlowConnection
    ) {
        return;
    }

    var addVimeoHint = function (rel, href, crossOrigin) {
        var selector = 'link[rel="' + rel + '"][href="' + href + '"]';

        if (document.head.querySelector(selector)) {
            return;
        }

        var link = document.createElement("link");
        link.rel = rel;
        link.href = href;

        if (crossOrigin) {
            link.crossOrigin = "anonymous";
        }

        document.head.appendChild(link);
    };

    var prepareVimeoConnection = function () {
        addVimeoHint("preconnect", vimeoOrigin, false);
        addVimeoHint("preconnect", "https://i.vimeocdn.com", true);
        addVimeoHint("preconnect", "https://f.vimeocdn.com", true);
    };

    var requestVimeoQuality = function () {
        if (!media || !media.contentWindow || !videoQuality) {
            return;
        }

        media.contentWindow.postMessage(
            JSON.stringify({
                method: "setQuality",
                value: videoQuality,
            }),
            vimeoOrigin
        );
    };

    var showMedia = function () {
        if (mediaLoaded || mediaFailed) {
            return;
        }

        mediaLoaded = true;
        hero.classList.add("is-loaded");
    };

    var mountMedia = function () {
        prepareVimeoConnection();

        media = document.createElement("iframe");
        media.className = "ashade-home-background__media";
        media.src = videoSrc;
        media.width = "1920";
        media.height = "1080";
        media.title =
            hero.getAttribute("data-video-title") ||
            "V\u00eddeo de fundo do Iago Pinheiro Est\u00fadio";
        media.allow =
            "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share";
        media.referrerPolicy = "strict-origin-when-cross-origin";
        media.loading = "lazy";
        media.tabIndex = -1;
        media.setAttribute("aria-hidden", "true");
        media.setAttribute("frameborder", "0");

        media.addEventListener(
            "load",
            function () {
                requestVimeoQuality();
                window.setTimeout(requestVimeoQuality, 450);
                window.setTimeout(function () {
                    window.requestAnimationFrame(showMedia);
                }, 180);
            },
            { once: true }
        );

        media.addEventListener(
            "error",
            function () {
                mediaFailed = true;
                hero.classList.remove("is-loaded");
                hero.classList.remove("is-video-mounted");
            },
            { once: true }
        );

        hero.appendChild(media);
        hero.classList.add("is-video-mounted");
        window.setTimeout(showMedia, 900);
    };

    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(mountMedia, { timeout: 1200 });
    } else {
        window.setTimeout(mountMedia, 500);
    }
});
