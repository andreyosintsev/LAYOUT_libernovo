document.addEventListener("DOMContentLoaded", () => {
    console.log("tabs-images loaded!");

    const tabsImages = document.querySelector(".tabs-images");

    if (!tabsImages) return console.error("tabs-images: no .tabs-images found");

    const menu = tabsImages.querySelector(".tabs-images__menu");
    const menuItems = [...tabsImages.querySelectorAll(".tabs-images__menu-item")];
    const images = [...tabsImages.querySelectorAll(".tabs-images__image")];

    if (!menu) return console.error("tabs-images: no .tabs-images__menu found");

    // Перетаскивание меню мышью
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    menu.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = menu.scrollLeft;
    });

    menu.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        e.preventDefault();

        const distance = e.pageX - startX;
        menu.scrollLeft = startScrollLeft - distance;
    });

    menu.addEventListener("mouseup", () => {
        isDragging = false;
    });

    menu.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // Переключение изображений
    menu.addEventListener("click", (e) => {
        const item = e.target.closest(".tabs-images__menu-item");

        if (!item) return;

        const index = menuItems.indexOf(item);

        if (index === -1) return;

        menuItems.forEach((menuItem) => {
            menuItem.classList.remove("tabs-images__menu-item_active");
        });

        images.forEach((image) => {
            image.classList.remove("tabs-images__image_active");
        });

        item.classList.add("tabs-images__menu-item_active");
        images[index]?.classList.add("tabs-images__image_active");

        menu.scrollTo({
            left: item.offsetLeft,
            behavior: "smooth",
        });
    });
});
