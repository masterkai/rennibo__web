GetBindPromotion = function () {
    $("#ddl_pg_promotion").empty();
    $("#ddl_manual_promotion").empty();
    $("#ddl_mart_promotion").empty();
    $.ajax(
    {
        url: "/handlers/BindPromotion_dropdown.ashx",
        type: 'POST',
        cache: false,
        async: true,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (result) {
            var o = result;
            var code = o.code;
            switch (code) {
                case 0:
                    if (o.data) {
                        var json = JSON.parse(o.data);
                        $("#ddl_pg_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        $("#ddl_manual_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        $("#ddl_mart_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        //console.log("promotion" + json);
                        $.each(json, function (key, item) {
                            $("#ddl_pg_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                            $("#ddl_manual_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                            $("#ddl_mart_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                        });
                    }
                    break;
                case 592:
                    location.href = '/';
                    break;
            }
        },
        error: function (e) {
        }
    });
}