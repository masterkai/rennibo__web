
ApplyEvent520 = function(promoId) {

    var param = {
        PromoId: promoId,
    }

    $.ajax({
        url: "/handlers/ApplyEvent520.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        async: true,
        beforeSend: function () {
            showLoading();
        },
        contentType: "application/json",
        dataType: 'JSON',
        success: function (data) {
            var o = data;
            var code = o.code;
            var msg = o.msg;
            alertMSG(msg);
        },
        error: function (xhr) {
            var msg = eval("(" + xhr.responseText + ")");
            alertMSG(msg);
            return false;
        },
        complete: function () {
            closeLoading();
        }
    });
}



OpenMiniGame = function (eId) {
    var w = window.open();
    w.location = "/event/game.aspx?eid=" + eId;

}