$(document).ready(function () {
  const $carousel = $('#lzCarousel');
  const $items = $carousel.find('.lz-carousel-item');
  const $indicators = $carousel.find('.lz-carousel-indicators');
  let currentIndex = 0;
  let itemsPerView = window.innerWidth <= 640 ? 1 : 2;

  function updateCarousel() {
    $items.removeClass('active');
    for (let i = 0; i < itemsPerView; i++) {
      $items.eq((currentIndex + i) % $items.length).addClass('active');
    }
    $indicators.children().removeClass('active');
    $indicators.children().eq(currentIndex % $items.length).addClass('active');
  }

  function nextSlide() {
    currentIndex = (currentIndex + itemsPerView) % $items.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - itemsPerView + $items.length) % $items.length;
    updateCarousel();
  }

  // Create indicators dynamically
  $items.each(function (index) {
    $indicators.append('<div class="lz-carousel-indicator" data-index="' + index + '"></div>');
  });

  $carousel.find('.lz-carousel-next').click(nextSlide);
  $carousel.find('.lz-carousel-prev').click(prevSlide);

  $indicators.on('click', '.lz-carousel-indicator', function () {
    currentIndex = $(this).data('index');
    updateCarousel();
  });

  // Update itemsPerView on resize
  $(window).resize(function () {
    itemsPerView = window.innerWidth <= 640 ? 1 : 2;
    updateCarousel();
  });

  updateCarousel();
});