$(document).ready(function() {
    /* Карусель с товарами и выбором карточки по клику на превью */

    if ($('.hero-single__carousel').length > 0) {
        const $carousel = $('.hero-single__carousel');

        $carousel.owlCarousel({
            loop: true,
            autoplay: false,
            nav: false,
            dots: false,
            center: true,
            touchDrag: true,
            pullDrag: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                971: {
                    items: 1,
                    margin: 0
                }
            }
        });

        $('.hero-single__gallery-image').on('click', function() {
            const index = $(this).data('index');
            $carousel.trigger('to.owl.carousel', [index, 300]);
        });

        $('.form__label').on('click', function() {
            const index = $(this).data('index');
            const model = $(this).data('model');
            const price = $(this).data('price');


            if (index !== undefined) $carousel.trigger('to.owl.carousel', [index, 300]);
            if (model !== undefined) $('.panel-single__subtitle').text('Модель: ' + model);
            if (price !== undefined) $('.panel-single__price').text(price);
        });
    }

    const $owl = $('.image-slider__cards').owlCarousel(
        {
            margin: 5,
            loop: true,
            nav: false,
            dots: false,
            pullDrag: true,
            autoWidth: true,
            autoHeight: false,
        });
        $(".image-slider__button_next").click(function() {
            $owl.trigger("next.owl.carousel");
        });

        $(".image-slider__button_prev").click(function() {
            $owl.trigger("prev.owl.carousel");
    });

    $('.video-slider__videos').owlCarousel(
        {
            items: 3,
            margin: 15,
            loop: false,
            nav: false,
            dots: false,
            pullDrag: true,
            autoWidth: false,
            autoHeight: false,
        }
    );
});
