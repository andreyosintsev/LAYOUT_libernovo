document.addEventListener('DOMContentLoaded', function() {
    console.log('tabs-dynamic js loaded!');


    const TIMER_MAX_INTERVAL = 25;

    let timerId = null;
    let currentTab = 0;

    const menuTabsDynamic = document.querySelector('.tabs-dynamic__menu');

    if(!menuTabsDynamic) return console.log('tabs-dynamic: no menu found');

    const items = [...menuTabsDynamic.querySelectorAll('.tabs-dynamic__menu-item')];
    const tabsTabsDynamic = [...document.querySelectorAll('.tabs-dynamic__tab')];

    if (!tabsTabsDynamic.length) return console.log('tabs-dynamic: no tabs found');

    menuTabsDynamic.addEventListener('click', menuClickHandler);

    function menuClickHandler(e) {
        const item = e.target.closest('.tabs-dynamic__menu-item');

        if (!item) return;

        const index = items.indexOf(item);

        if (index == -1) return;

        activateTab(index);
    }

    function activateTab(index) {

        if (index >= items.length) index = 0;

        currentTab = index;

        tabsTabsDynamic.forEach(tab => tab.style.display = 'none');
        tabsTabsDynamic[currentTab].style.display = 'block';

        items.forEach(item => {
            item.classList.remove('tabs-dynamic__menu-item_active');
            item.style.setProperty('--tab-progress', "0");
        });

        items[currentTab].classList.add('tabs-dynamic__menu-item_active');

        menuTabsDynamic.scrollTo({
            left: items[currentTab].offsetLeft - 24,
            behavior: 'smooth'
        });

        startTimer();
    }

    function startTimer() {

        clearInterval(timerId);

        let seconds = 0;

        timerId = setInterval(() => {
            seconds += 0.1;

            items[currentTab].style.setProperty(
                '--tab-progress',
                `${seconds / TIMER_MAX_INTERVAL * 100}%`
            );

            if (seconds >= TIMER_MAX_INTERVAL) {
                clearInterval(timerId);
                timerId = null;

                activateTab(currentTab + 1);
            }
        }, 100);
    }

    activateTab(0);
});
