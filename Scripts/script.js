document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

(function () {
  var $$ = function (selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements);
  };

  function _fncSliderInit($slider, options) {
    var prefix = ".fnc-";

    var $slider = $slider;
    var $slidesCont = $slider.querySelector(prefix + "slider__slides");
    var $slides = $$(prefix + "slide", $slider);
    var $controls = $$(prefix + "nav__control", $slider);
    var $controlsBgs = $$(prefix + "nav__bg", $slider);
    var $progressAS = $$(prefix + "nav__control-progress", $slider);

    var numOfSlides = $slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT =
      +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
    var slidingDelay =
      +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000; // default autosliding delay value
    var autoSlidingBlocked = false;

    var $activeSlide;
    var $activeControlsBg;
    var $prevControl;

    function setIDs() {
      $slides.forEach(function ($slide, index) {
        $slide.classList.add("fnc-slide-" + (index + 1));
      });

      $controls.forEach(function ($control, index) {
        $control.setAttribute("data-slide", index + 1);
        $control.classList.add("fnc-nav__control-" + (index + 1));
      });

      $controlsBgs.forEach(function ($bg, index) {
        $bg.classList.add("fnc-nav__bg-" + (index + 1));
      });
    }

    setIDs();

    function afterSlidingHandler() {
      $slider
        .querySelector(".m--previous-slide")
        .classList.remove("m--active-slide", "m--previous-slide");
      $slider
        .querySelector(".m--previous-nav-bg")
        .classList.remove("m--active-nav-bg", "m--previous-nav-bg");

      $activeSlide.classList.remove("m--before-sliding");
      $activeControlsBg.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      var triggerLayout = $prevControl.offsetTop;
      $prevControl.classList.remove("m--reset-progress");

      sliding = false;
      var layoutTrigger = $slider.offsetTop;

      if (autoSlidingActive && !autoSlidingBlocked) {
        setAutoslidingTO();
      }
    }

    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;

      $prevControl = $slider.querySelector(".m--active-control");
      $prevControl.classList.remove("m--active-control");
      $prevControl.classList.add("m--prev-control");
      $slider
        .querySelector(prefix + "nav__control-" + slideID)
        .classList.add("m--active-control");

      $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
      $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

      $slider
        .querySelector(".m--active-slide")
        .classList.add("m--previous-slide");
      $slider
        .querySelector(".m--active-nav-bg")
        .classList.add("m--previous-nav-bg");

      $activeSlide.classList.add("m--before-sliding");
      $activeControlsBg.classList.add("m--nav-bg-before");

      var layoutTrigger = $activeSlide.offsetTop;

      $activeSlide.classList.add("m--active-slide");
      $activeControlsBg.classList.add("m--active-nav-bg");

      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
    }

    function controlClickHandler() {
      if (sliding) return;
      if (this.classList.contains("m--active-control")) return;
      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }

      var slideID = +this.getAttribute("data-slide");

      performSliding(slideID);
    }

    $controls.forEach(function ($control) {
      $control.addEventListener("click", controlClickHandler);
    });

    function setAutoslidingTO() {
      window.clearTimeout(autoSlidingTO);
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 1;

      autoSlidingTO = setTimeout(function () {
        performSliding(curSlide);
      }, delay);
    }

    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;

      autoSlidingActive = true;
      setAutoslidingTO();

      $slider.classList.add("m--with-autosliding");
      var triggerLayout = $slider.offsetTop;

      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;

      $progressAS.forEach(function ($progress) {
        $progress.style.transition = "transform " + delay / 1000 + "s";
      });
    }

    $slider
      .querySelector(".fnc-nav__control:first-child")
      .classList.add("m--active-control");
  }

  var fncSlider = function (sliderSelector, options) {
    var $sliders = $$(sliderSelector);

    $sliders.forEach(function ($slider) {
      _fncSliderInit($slider, options);
    });
  };

  window.fncSlider = fncSlider;
})();

/* not part of the slider scripts */

/* Slider initialization
  options:
  autoSliding - boolean
  autoSlidingDelay - delay in ms. If audoSliding is on and no value provided, default value is 5000
  blockASafterClick - boolean. If user clicked any sliding control, autosliding won't start again
  */
fncSlider(".example-slider", { autoSlidingDelay: 4000 });

transform_slider(
  document.querySelector(".sliders_block > ul"),
  document.querySelector("#left"),
  document.querySelector("#right")
);

function transform_slider(block, left_button, right_button) {
  const widht_li = block.querySelector("li").getBoundingClientRect().width;
  let blockleft = 0;
  let transform;

  right_button.onclick = function () {
    left_button.classList.add("active");
    left_button.classList.remove("no-active");
    if (block.style.transform) {
      blockleft = block.style.transform.match("\\d+")[0];
    }

    if (blockleft < block_widht()) {
      block.style.transform = `translate(-${Number(blockleft) + widht_li}px)`;
    }

    updater();
  };

  left_button.onclick = function () {
    right_button.classList.add("active");
    right_button.classList.remove("no-active");
    if (block.style.transform) {
      blockleft = block.style.transform.match("\\d+")[0];
    }

    block.style.transform = `translate(-${Number(blockleft) - widht_li}px)`;

    updater();
  };

  block.ontouchstart = function () {
    if (block.style.transform) {
      blockleft = block.style.transform.match("\\d+")[0];
    }
    let startX = Number(blockleft) + event.changedTouches[0].pageX;
    block.style.transform = `translate(-${
      startX - event.changedTouches[0].pageX
    }px)`;

    document.ontouchmove = function (event) {
      block.classList.add("no-transistion");
      blockleft = block.style.transform.match("\\d+")[0];

      if (blockleft <= block_widht()) {
        block.style.transform = `translate(-${
          startX - event.changedTouches[0].pageX
        }px)`;
      }
      updater();
      return false;
    };

    document.ontouchend = function () {
      block.classList.remove("no-transistion");
      let stop_li = Math.round(
        Number(block.style.transform.match("\\d+")[0]) /
          block.querySelector("li").getBoundingClientRect().width
      );
      block.style.transform = `translate(-${
        block.querySelector("li").getBoundingClientRect().width * stop_li
      }px)`;
      block.classList.remove("no-transistion");
      document.ontouchmove = false;
      updater();
    };
  };

  block.onmousedown = function (event) {
    if (block.style.transform) {
      blockleft = block.style.transform.match("\\d+")[0];
    }

    let startX = Number(blockleft) + event.pageX;
    block.style.transform = `translate(-${startX - event.pageX}px)`;

    document.onmousemove = function (event) {
      block.classList.add("no-transistion");
      blockleft = block.style.transform.match("\\d+")[0];
      if (blockleft <= block_widht()) {
        block.style.transform = `translate(-${startX - event.pageX}px)`;
      }
      updater();
      return false;
    };

    document.onmouseup = function () {
      block.classList.remove("no-transistion");
      let stop_li = Math.round(
        Number(block.style.transform.match("\\d+")[0]) /
          block.querySelector("li").getBoundingClientRect().width
      );
      block.style.transform = `translate(-${
        block.querySelector("li").getBoundingClientRect().width * stop_li
      }px)`;
      block.classList.remove("no-transistion");
      document.onmousemove = false;
      updater();
    };
  };

  function updater() {
    transform = Number(block.style.transform.match("\\d+")[0]);
    if (transform > block_widht()) {
      block.style.transform = `translate(-${block_widht()}px)`;
    }
    if (transform <= 3) {
      left_button.classList.add("no-active");
    } else {
      left_button.classList.remove("no-active");
    }
    if (transform >= block_widht()) {
      right_button.classList.add("no-active");
    } else {
      right_button.classList.remove("no-active");
    }
  }

  function block_widht() {
    return (
      block.querySelector("li").getBoundingClientRect().width *
        block.querySelectorAll("li").length -
      block.getBoundingClientRect().width
    );
  }
}




//testimonial slider
$('.testimonials').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 300,
  dots:true,
  centerMode: true,
  centerPadding: '0px',
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows:false
      }
    }
    
  ]
});


// Params
var sliderSelector = '.swiper-container',
    options = {
      init: false,
      loop: true,
      speed:800,
      slidesPerView: 2, // or 'auto'
      // spaceBetween: 10,
      centeredSlides : true,
      effect: 'coverflow', // 'cube', 'fade', 'coverflow',
      coverflowEffect: {
        rotate: 50, // Slide rotate in degrees
        stretch: 0, // Stretch space between slides (in px)
        depth: 100, // Depth offset in px (slides translate in Z axis)
        modifier: 1, // Effect multipler
        slideShadows : true, // Enables slides shadows
      },
      grabCursor: true,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1023: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      // Events
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        }
      }
    };
var mySwiper = new Swiper(sliderSelector, options);

// Initialize slider
mySwiper.init();


jQuery(document).ready(function($) {
	$('.buy').on('click', function(e) {
		e.preventDefault();

		$('body').toggleClass('expanded');
	})
});