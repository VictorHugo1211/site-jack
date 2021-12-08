(function ($) {
    "use strict";

    // Preloader (if the #preloader div exists)
    $(window).on("load", function () {
        if ($("#preloader").length) {
            $("#preloader")
                .delay(100)
                .fadeOut("slow", function () {
                    $(this).remove();
                });
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            1500,
            "easeInOutExpo"
        );
        return false;
    });

    // Initiate the wowjs animation library
    new WOW().init();

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 279) {
            $("#header").addClass("header-scrolled");

            //$("#header").html('<img src="assets/img/jac/preto.png" alt="" class="img-fluid">');
        } else {
            $("#header").removeClass("header-scrolled");
        }
    });

    if ($(window).scrollTop() > 100) {
        $("#header").addClass("header-scrolled");
    }

    // Smooth scroll for the navigation and links with .scrollto classes
    $(".main-nav a, .mobile-nav a, .scrollto").on("click", function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($("#header").length) {
                    top_space = $("#header").outerHeight();

                    if (!$("#header").hasClass("header-scrolled")) {
                        top_space = top_space - 20;
                    }
                }

                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - top_space,
                    },
                    1500,
                    "easeInOutExpo"
                );

                if ($(this).parents(".main-nav, .mobile-nav").length) {
                    $(".main-nav .active, .mobile-nav .active").removeClass("active");
                    $(this).closest("li").addClass("active");
                }

                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
                    $(".mobile-nav-overly").fadeOut();
                }
                return false;
            }
        }
    });

    // Navigation active state on scroll
    var nav_sections = $("section");
    var main_nav = $(".main-nav, .mobile-nav");
    var main_nav_height = $("#header").outerHeight();

    $(window).on("scroll", function () {
        var cur_pos = $(this).scrollTop();

        nav_sections.each(function () {
            var top = $(this).offset().top - main_nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find("li").removeClass("active");
                main_nav
                    .find('a[href="#' + $(this).attr("id") + '"]')
                    .parent("li")
                    .addClass("active");
            }
        });
    });

    // jQuery counterUp (used in Whu Us section)
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000,
    });

    // Porfolio isotope and filter
    $(window).on("load", function () {
        var portfolioIsotope = $(".portfolio-container").isotope({
            itemSelector: ".portfolio-item",
        });
        $("#portfolio-flters li").on("click", function () {
            $("#portfolio-flters li").removeClass("filter-active");
            $(this).addClass("filter-active");

            portfolioIsotope.isotope({
                filter: $(this).data("filter"),
            });
        });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
        $(".venobox").venobox();
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1,
    });

    $(window).scroll(function (e) {
        const $el = $(".intro-img");
        const $image = $(".intro-img-img");
        const intro_container_offset = $("#intro > div").offset();
        const $header = $(".header-logo");
        const $intro_image_container = $(".intro-img-placeholder");

        const isPositionAbsolute = $el.css("position") == "absolute";

        if ($(this).scrollTop() > intro_container_offset.top + 80 && !isPositionAbsolute) {
            $header.append(
                $(".intro-img").css({
                    top: 0,
                    left: $image.offset().left,
                    height: $image.height(),
                    width: $image.width(),
                    position: "absolute",
                    opacity: 1,
                })
            );

            setTimeout(() => {
                $el.css({ height: 76, width: 150.25, left: 10 });
            }, 0);
        }

        if ($(this).scrollTop() < intro_container_offset.top + 80 && isPositionAbsolute) {
            $el.css({ opacity: 0 });

            setTimeout(() => {
                $intro_image_container.append($(".intro-img").removeAttr("style").css({ opacity: 0 }));
            }, 250);
            setTimeout(() => {
                $(".intro-img").removeAttr("style").css({ right: 0 });
            }, 500);
        }
    });
})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
    const dataText = ["Kubernetes", "Rancher", "CI/CD", "Cloud Native", "Observabilidade", "Containers"];
    const element = document.querySelector(`.intro-info > h2 > span:nth-child(2)`);
    const TIME_BETWEEN_ANIMATIONS = 1250;
    const TIME_AFTER_ANIMATIONS_END = 0;

    const type = (text, i, cb) => {
        if (i < text.length) {
            element.innerHTML = `${text.substring(0, i + 1)}`;
            setTimeout(() => {
                type(text, i + 1, cb);
            }, 100);
        } else if (typeof cb == "function") {
            setTimeout(cb, TIME_BETWEEN_ANIMATIONS);
        }
    };

    const startAnimation = (i) => {
        if (typeof dataText[i] == "undefined") {
            setTimeout(function () {
                startAnimation(0);
            }, TIME_AFTER_ANIMATIONS_END);
        } else if (i < dataText[i].length) {
            type(dataText[i], 0, () => {
                startAnimation(i + 1);
            });
        }
    };
    startAnimation(0);
});
