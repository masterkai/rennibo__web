(function($) {
    $.fn.countTo = function(options) {
        options = $.extend({}, $.fn.countTo.defaults, options || {});
        var loops = Math.ceil(options.speed / options.refresh_interval),
            increment = (options.to - options.from) / loops;
        return $(this).each(function() {
            var _this = this,
                loop_count = 0,
                value = options.from,
                interval = setInterval(update_timer, options.refresh_interval);
            function update_timer() {
                value += increment;
                loop_count++;
                if(options.format == 'money') {
                    $(_this).html(currencyLbl+' ' + number_with_commas(value.toFixed(options.decimals)));
                } else {
                    $(_this).html(value.toFixed(options.decimals));
                }
                if(typeof(options.on_update) == 'function') {
                    options.on_update.call(_this, value);
                }
                if(loop_count >= loops) {
                    clearInterval(interval);
                    value = options.to;
                    if(typeof(options.on_complete) == 'function') {
                        options.on_complete.call(_this, value);
                    }
                }
            }
			
        });
    };
    $.fn.countTo.defaults = {
        from: 0,
        to: 100,
        speed: 1000,
        refresh_interval: 100,
        decimals: 2,
        on_update: null,
        on_complete: null
    };
})(jQuery);

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getJackpotTotal(){
	var caystaljackpot =  $.parseNumber($('#caystaljackpot').html(), {format:"#,###.00", locale:"us"});
    $('#caystaljackpot').countTo({
		format: 'money',
		from: caystaljackpot,
		to: 999999999.99,
		speed: 100000000,
		refresh_interval: 0.0002,
		on_complete: function(value) {
			$(this).hide().fadeIn(1000);
		}
	});
}