//parallax

(function($) {

    $.fn.parallax = function(options) {

        let el = this;

        let parallax = {};

        let defaults = {
            ratioX: 0.1,
            ratioY: 0.1,
            xScroll: true,
            yScroll: true,
            xInvert: false,
            yInvert: false,
            responsive: true
        }

        let settings = $.extend({}, defaults, options);

        let methods = {
            init: function() {
                parallax.obj = el;

                $(this).each(function() {

                    //preset parametrs

                    settings.x0 = parseInt(parallax.obj.css('left'));
                    settings.y0 = parseInt(parallax.obj.css('top'));

                    settings.windowY = $(window).height() / 2;
                    settings.windowX = $(window).width() / 2;

                    //responsive
                    if (settings.responsive == true) {
                        methods.responsive();
                    }

                    //scroll watching
                    if (settings.xScroll == true) {
                        $(window).mousemove(methods.xScroll);
                    } else if (settings.yScroll == true) {
                        $(window).mousemove(methods.yScroll);
                    }
                });

            },
            xScroll: function(e) {

                if (settings.xInvert == true) {
                    settings.x = settings.x0 - (e.screenX - settings.windowX) * settings.ratioX;

                    parallax.obj.css({
                        left: settings.x
                    });
                } else {
                    settings.x = settings.x0 + (e.screenX - settings.windowX) * settings.ratioX;

                    parallax.obj.css({
                        left: settings.x
                    });
                }

                if (settings.yScroll == true) {
                    methods.yScroll(e)
                }
            },
            yScroll: function(e) {
                settings.y = settings.y0 + (e.screenY - settings.windowY) * settings.ratioY;

                parallax.obj.css({
                    top: settings.y
                });
            },
            responsive: function() {
                $(window).resize(function() {
                    settings.windowY = $(window).height() / 2;
                    settings.windowX = $(window).width() / 2;

                    parallax.obj.css('left', settings.x0);
                    parallax.obj.css('top', settings.y0);
                });
            }
        };

        methods.init();

    };

})(jQuery);