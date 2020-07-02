
var loading_layer;

$(function() {
    //$('.mainNav .tab_deposit').click(function() {
    //    CheckPlayerAllowPG();
    //    CheckPlayerAllowMart();
    //});
    var hostname = window.location.hostname;
    if (is_accessBlog == "1" && (hostname.indexOf('999xc.net') > -1 || location.hostname === "localhost")) {
        $(".blogitem").show();
    }

});

showLoading = function () {
    loading_layer = layer.load(0, { time: 10 * 5000, shade: [0.5, '#f5f5f5'] }); //0代表加载的风格，支持0-2
}

closeLoading = function () {
    layer.close(loading_layer);
}

alertMSG = function(msg) {
    var index = layer.alert(msg, {
        skin: 'layer-ext-moon',
        title: '信息',
        btn: 'OK',
        closeBtn: 0,
        success: function() {
            $(document).on('keydown', function() {
                if (event.keyCode == 13) {
                    layer.close(index);
                }
            });
        }
    });
};



alertMSGRes = function (msg, redirect) {
    var index = layer.alert(msg, {
        skin: 'layer-ext-moon',
        title: '信息',
        btn: 'OK',
        closeBtn: 0,
        yes: function() {
            layer.close(index);
            if (redirect) {
                window.location = redirect;
            } else {
                if (window.location.pathname.toLowerCase() == '/register')
                    window.location = '/';
                else
                    window.location.reload(true);
            }
        }
    });
}


alertMSGLogin = function (msg, referrer) {
    alertMSG(msg);
}


alertMSGCallback = function (msg, callback) {
    var index = layer.alert(msg, {
        skin: 'layer-ext-moon',
        title: '信息',
        btn: 'OK',
        closeBtn: 0,
        yes: function () {
            layer.close(index);
            if (callback)
                callback();
        }
    });
}

alertMSGWithdraw = function(callback) {

    var content = "<div style='padding:1em;overflow-wrap: break-word;'>";
    content += "<p><strong>如當日出款次數超過3次，會收取出款手續費用，如同意的話系統會自動批准該筆取款</strong><p>";
    content += "<p style='margin-top: 2em;'><label for='withdrawNotice_doNotDisplayAgain'><input type='checkbox' id='withdrawNotice_doNotDisplayAgain' class='withdrawNotice_doNotDisplayAgain'>不再顯示</label></input></p>";
    content += "</div>";

    var index = layer.open({
        type: 1,
        skin: 'layer-ext-moon',
        closeBtn: 1,
        title: '提款提示',
        anim: 2,
        area: ['360px', '210px'],
        shadeClose: false,
        content: content,
        btn: ['同意', '取消'],
        yes: function() {

            /* COOKIES */
            var doNotDisplayAgain = $('.withdrawNotice_doNotDisplayAgain').is(":checked");
            if (doNotDisplayAgain) {
                var currentDate = new Date();
                var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
                $.cookie("withdrawNotice_doNotDisplayAgain", currentDate, { expires: expirationDate, path: "/" });
            }

            layer.close(index);

            callback();
        },
        no: function() {
            layer.close(index);
        }
    });
};


getRouteUrlParameter = function (sParam) {
    var value = window.location.pathname;

    var sub = value.split('/');
    if (sub.indexOf(sParam) > -1) {
        return sub[sub.indexOf(sParam) + 1];
    } else {
        return null;
    }
};


SetPopupOpenerClickEvent = function (url) {
    var event = "window.open('" + url + "', '_blank')";
    $('#btnPopupOpener')
        .attr('onclick', event);
}