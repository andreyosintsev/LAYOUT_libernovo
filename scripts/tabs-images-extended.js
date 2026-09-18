document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelector(".tabs-images-extended");

    if (!tabs) return;

    const content = tabs.querySelector(".tabs-images-extended__content");
    const menu = tabs.querySelector(".tabs-images-extended__menu");
    const menuItems = [...tabs.querySelectorAll(".tabs-images-extended__menu-item")];
    const descriptionItems = [...tabs.querySelectorAll(".tabs-images-extended__description-item")];
    const images = [...tabs.querySelectorAll(".tabs-images-extended__image")];

    if (!content || !menu || !menuItems.length || !images.length) return console.error("tabs-images-extended: DOM elements not found");

    const AUTO_SWITCH_DELAY = 5000;
    const WHEEL_LOCK_DELAY = 400;
    const WHEEL_THRESHOLD = 10;

    let autoSwitchTimer = null;
    let wheelLocked = false;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;

    // =========================================================
    // Переключение табов
    // =========================================================

    const getActiveIndex = () => menuItems.findIndex((item) => item.classList.contains("tabs-images-extended__menu-item_active"));

    const activateTab = (index, scrollMenu = true) => {
        if (index < 0 || index >= menuItems.length) return;

        menuItems.forEach((item, itemIndex) => {
            item.classList.toggle("tabs-images-extended__menu-item_active", itemIndex === index);
        });

        images.forEach((image, imageIndex) => {
            image.classList.toggle("tabs-images-extended__image_active", imageIndex === index);
        });

        descriptionItems.forEach((item, itemIndex) => {
            item.classList.toggle("tabs-images-extended__description-item_active", itemIndex === index);
        });

        if (scrollMenu) {
            menu.scrollTo({
                left: menuItems[index].offsetLeft,
                behavior: "smooth",
            });
        }
    };

    // =========================================================
    // Автоматическое переключение
    // =========================================================

    const startAutoSwitch = () => {
        clearInterval(autoSwitchTimer);

        autoSwitchTimer = setInterval(() => {
            const currentIndex = getActiveIndex();

            if (currentIndex === -1) return;

            const nextIndex = (currentIndex + 1) % menuItems.length;

            activateTab(nextIndex);
        }, AUTO_SWITCH_DELAY);
    };

    const resetAutoSwitch = () => {
        startAutoSwitch();
    };

    // =========================================================
    // Клик по табу
    // =========================================================

    menu.addEventListener("click", (e) => {
        const item = e.target.closest(".tabs-images-extended__menu-item");

        if (!item || isDragging) return;

        const index = menuItems.indexOf(item);

        if (index === -1) return;

        activateTab(index);
        resetAutoSwitch();
    });

    // =========================================================
    // Переключение колесом мыши
    // =========================================================

    content.addEventListener(
        "wheel",
        (e) => {
            const currentIndex = getActiveIndex();

            if (currentIndex === -1) return;

            const direction = e.deltaY > 0 ? 1 : -1;

            const isFirst = currentIndex === 0;
            const isLast = currentIndex === menuItems.length - 1;

            // На первом табе крутим вверх —
            // отдаём управление странице
            if (isFirst && direction < 0) {
                return;
            }

            // На последнем табе крутим вниз —
            // отдаём управление странице
            if (isLast && direction > 0) {
                return;
            }

            // Во всех остальных случаях колесо принадлежит блоку.
            // ВАЖНО: preventDefault должен выполняться даже при wheelLocked.
            e.preventDefault();

            // Игнорируем слишком слабое движение колеса
            if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

            // Не переключаем несколько табов от одного движения колеса
            if (wheelLocked) return;

            const nextIndex = currentIndex + direction;

            activateTab(nextIndex);
            resetAutoSwitch();

            wheelLocked = true;

            setTimeout(() => {
                wheelLocked = false;
            }, WHEEL_LOCK_DELAY);
        },
        { passive: false },
    );

    // =========================================================
    // Перетаскивание меню мышью
    // =========================================================

    menu.addEventListener("mousedown", (e) => {
        isDragging = false;
        dragStartX = e.pageX;
        dragStartScrollLeft = menu.scrollLeft;

        const handleMouseMove = (e) => {
            const distance = e.pageX - dragStartX;

            if (Math.abs(distance) > 3) {
                isDragging = true;
            }

            if (!isDragging) return;

            e.preventDefault();

            menu.scrollLeft = dragStartScrollLeft - distance;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            // Даём click сработать раньше сброса флага
            requestAnimationFrame(() => {
                isDragging = false;
            });
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // =========================================================
    // Запуск
    // =========================================================

    startAutoSwitch();
});
