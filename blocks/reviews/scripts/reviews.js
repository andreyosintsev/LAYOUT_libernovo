$(".reviews__cards").owlCarousel({
    items: 3,
    margin: 0,
    loop: true,
    nav: false,
    dots: true,
    pullDrag: true,
    autoWidth: false,
    autoHeight: false,
    center: true,
    autoplay: true,
    autoplayTimeout: 10000,
    responsive: {
        0:  {
                items: 1,
                margin: 0,
                stagePadding: 0,
                autoWidth: false,
                autoHeight: true,
            },
        576:  {
                items: 2,
                margin: 0,
                stagePadding: 0,
                autoWidth: false,
                autoHeight: true,
            },
        972:
            {
                items: 3,
                stagePadding: 80,
                autoWidth: false,
                autoHeight: true,
            }
    },
});
