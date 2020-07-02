﻿
var PLAYER_DEPOSIT_BANK_LIST;
var selected_channel_type_mart = 6;        //mart

$(function () {
    $('.depoTabs a').click(function () {
        $('.tab-content #home-61, .tab-content #profile-61, .tab-content #supermarket-61').hide();
        var tabId = $(this).data('depo-tab-id');
        switch (tabId) {
            case 0:
                $('.tab-content #home-61').show();
                break;
            case 1:
                $('.tab-content #profile-61').show();
                break;
            case 2:
                $('.tab-content #supermarket-61').show();
                break;
        }
    });

    $(':radio[name=ChannelType]').change(function () {
        var type = $(this).val();

        $('#div_limit, #div_fee').hide();
        BindPG(type, $('#ddl_pgate_pg'));
    });

    $('#home-61 #ddl_pgate_pg').change(function (e) {
        var x = $(this);
        var selected_pgid = $(x).val();
        var selected_channel_type = $(':radio[name=ChannelType][checked=checked]:first').val();


        var ddl_pbank = $('#home-61 #ddl_pbank');
        BindPGBank(selected_pgid, selected_channel_type, ddl_pbank);

        if (selected_channel_type == 5) { //virtual bank
            //console.log('go GetPGDepoAmtSetting');
            GetPGDepoAmtSetting(selected_pgid, selected_channel_type, false);
        } else {
            $('#div_fee').show();
        }
    });

    BindDepositBank();
    GetDepoWithSetting();

    $('#profile-61 #depo_manual_bank').change(function () {
        BindDepositBankInfo();
    });

    var ddl_pgate_mart = $('#supermarket-61 #ddl_pgate_mart');
    BindMart(selected_channel_type_mart, ddl_pgate_mart); //mart

    $('#supermarket-61 .ddl_pgate_mart').change(function (e) {
        var x = $(this);
        var selected_pgid = $(x).val();
        var ddl_pbank = $('#supermarket-61 .ddl_pbank_mart');
        BindPGBank_mart(selected_pgid, selected_channel_type_mart, ddl_pbank);
        GetPGDepoAmtSetting(selected_pgid, selected_channel_type_mart, true);
    });


    $('.btnDepo_pg').click(function () {
        SubmitDepositPGForm();
    });

    $('.btnDepo_manual').click(function () {
        SubmitDepositCashForm();
    });

    $('.btnDepo_mart').click(function () {
        SubmitDepositMartForm();
    });


});

CheckPlayerAllowPG = function () {
    $.ajax({
        url: "/handlers/CheckPlayerAllowPG.ashx",
        type: 'POST',
        async: true,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {

                    var cc_allow = o.data[0].allow;
                    var atm_allow = o.data[1].allow;

                    //web
                    if (!cc_allow && !atm_allow) {
                        //$('.depoTabs .depo_pg').hide();
                        $(".depoTabs a[data-depo-tab-id=1]")[0].click();
                        $('.depoTabs .depo_pg a').attr('href', 'javascript:void(0);');
                        $('.depoTabs .depo_pg a').removeAttr('data-toggle');
                        $('.depoTabs .depo_pg a').removeAttr('aria-expanded');
                        $('.depoTabs .depo_pg').bind('click', function () {
                            alertMSGCallback("請洽客服開通", function () {
                                $(".depoTabs .active a").click();
                            });
                        });
                    }
                    else if (cc_allow && atm_allow) {
                        $(".depoTabs a[data-depo-tab-id=0]")[0].click();
                        $(':radio[name=ChannelType]:first')
                            .attr('checked', true)
                            .trigger('change');
                    }
                    else {
                        //$('.depoTabs .depo_pg').show();
                        $(".depoTabs a[data-depo-tab-id=0]")[0].click();

                        if (!cc_allow) {
                            //$('.channelTypeCC').hide();
                            //$(':radio.channelTypeCC').attr('disabled', true);
                            $(':radio.channelTypeATM').attr('checked', true).trigger('change');
                            $(':radio.channelTypeCC').bind('click', function () {
                                alertMSGCallback("請洽客服開通", function () {
                                    $(':radio.channelTypeATM').attr('checked', true).trigger('change');
                                });
                            });
                        } else if (!atm_allow) {
                            //$('.channelTypeATM').hide();
                            //$(':radio.channelTypeATM').attr('disabled', true);
                            $(':radio.channelTypeCC').attr('checked', true).trigger('change');
                            $(':radio.channelTypeATM').bind('click', function () {
                                alertMSGCallback("請洽客服開通", function () {
                                    $(':radio.channelTypeCC').attr('checked', true).trigger('change');
                                });
                            });
                        }
                    }
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};


CheckPlayerAllowMart = function () {
    $.ajax({
        url: "/handlers/CheckPlayerAllowMart.ashx",
        type: 'POST',
        async: true,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;
                if (code == 0) {
                    var allow = o.data;

                    var isMobileView = $('#isMobileView').val();
                    var pathname = window.location.pathname.toLowerCase();
                    if (isMobileView == 'true') {
                        //if (pathname == '/deposit') {
                        //    if (allow == true) {
                        //        $('#deposit_channel_mart').val("1");
                        //        $('.deposit_landing .btn_depo_mart').css('display', 'flex');
                        //    } else
                        //        $('.deposit_landing .btn_depo_mart').css('display', 'none');
                        //} else {
                        //    if (allow != true) {
                        //        alertMSGCallback('沒有權限<br/>請洽客服', function () {
                        //            location.href = '/deposit';
                        //        });
                        //    }
                        //}
                    } else {
                        if (!allow) {
                            $('.depoTabs .depo_mart a').attr('href', 'javascript:void(0);');
                            $('.depoTabs .depo_mart a').removeAttr('data-toggle');
                            $('.depoTabs .depo_mart a').removeAttr('aria-expanded');
                            //$('.depoTabs .depo_mart a').removeAttr('data-depo-tab-id');
                            $('.depoTabs .depo_mart').unbind('click').bind('click', function () {
                                alertMSGCallback("請洽客服開通", function () {
                                    $(".depoTabs .active a").click();
                                });
                            });
                        }
                    }
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

BindPG = function (channelType, ddl) {

    var param = {
        channelType: channelType
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPG.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        //$(ddl).empty();
                        $(ddl).find('option[value!="0"]').remove();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.PGID).html(i.BankName + ' (' + i.PGName_Custom1 + ')'));
                        });
                        var ddl_pbank = $('.tab-content #home-61 #ddl_pbank');
                        if (ddl_pbank)
                            $(ddl_pbank).empty();

                        var cnt = data.length;
                        if (cnt <= 1) {
                            $(ddl).val($(ddl).find("option:eq(1)").val()).trigger('change');
                            $(ddl).addClass('readonly').css("pointer-events", "none");
                        } else {
                            $(ddl).removeClass('readonly').css("pointer-events", "");
                        }
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};


BindPGBank = function (pgId, channelType, ddl) {

    if (pgId <= 0)
        return false;


    var param = {
        pgId: pgId,
        channelType: channelType
    }

    //showLoading();
    $.ajax({
        url: "/handlers/GetPGBank.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            //closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        $(ddl).empty();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.ID).html(i.BankName));
                        });
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};




GetPGDepoAmtSetting = function (pgId, channelType, isMart) {

    var param = {
        pgId: pgId,
        channelType: channelType,
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPGDepoAmtSetting.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        var r = JSON.parse(o.data)[0];
                        var minAmt = r.Deposit_Min;
                        var maxAmt = r.Deposit_Max;
                        if (!isMart) {
                            try {
                                if (minAmt)
                                    $('#home-61 span[class=minamt]').text(numberWithCommas(parseFloat(minAmt).toFixed(0)));
                                if (maxAmt)
                                    $('#home-61 span[class=maxamt]').text(numberWithCommas(parseFloat(maxAmt).toFixed(0)));
                            } catch (err) {
                            }
                        } else {
                            try {
                                if (minAmt)
                                    $('#supermarket-61 span[class=minamt]').text(numberWithCommas(parseFloat(minAmt).toFixed(0)));
                                if (maxAmt)
                                    $('#supermarket-61 span[class=maxamt]').text(numberWithCommas(parseFloat(maxAmt).toFixed(0)));
                                $('#div_limit_mart').show();
                            } catch (err) {
                            }
                        }

                        if (parseInt(pgId) > 0) {
                            if (parseInt(channelType) == 3) {
                                $('#div_fee').show();
                                $('#div_limit').hide();
                            } else if (parseInt(channelType) == 5) {
                                $('#div_limit').show();
                                $('#div_fee').hide();
                            }
                        } else {
                            //$('#div_fee').hide();
                            $('#div_limit').hide();
                            $('#div_limit_mart').hide();
                        }
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};


SubmitDepositPGForm = function () {

    var param = {
        pgate: $('#home-61 #ddl_pgate_pg option:selected').val(),
        pbank: $('#home-61 #ddl_pbank option:selected').val(),
        txtPGDepoAmt: $('#home-61 .txtPGDepoAmt').val(),
        pg_promotion: $('#home-61 #ddl_pg_promotion option:selected').val(),
        hid_gateType: $(':radio[name=ChannelType][checked=checked]').val(),
    };

    var launch = false;

    showLoading();
    $.ajax(
    {
        url: "/handlers/DepositPG.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    var url = '/web' + o.msg;
                    if (url) {
                        SetPopupOpenerClickEvent(url);
                        launch = true;
                    }
                } else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (xhr) {
            var msg = eval("(" + xhr.responseText + ")");
            alertMSG(msg);
            return false;
        }
    });

    if (launch == true)
        $('#btnPopupOpener').trigger('click');

    return false;
};



//Deposit ViP

BindDepositBank = function () {
    $.ajax(
    {
        url: "/handlers/BindDepositBank.ashx",
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

                        PLAYER_DEPOSIT_BANK_LIST = json;

                        var ddl = $("#depo_manual_bank");

                        $(ddl).find('option[value!="0"]').remove();

                        $.each(json, function (key, item) {
                            var bankaccount = item.BankName;
                            //alert(bankaccount);
                            $("#depo_manual_bank").append($("<option></option>").val(item.ID).html(bankaccount));
                        });

                        var cnt = json.length;
                        if (cnt <= 1) {
                            $(ddl).val($(ddl).find("option:eq(1)").val()).trigger('change');
                            $(ddl).addClass('readonly').css("pointer-events", "none");
                        } else {
                            $(ddl).removeClass('readonly').css("pointer-events", "");
                        }
                    }
                    break;
            }
        },
        error: function (e) {
        }
    });
}


BindDepositBankInfo = function () {
    var data = PLAYER_DEPOSIT_BANK_LIST;

    var bankNo = $('#profile-61 #depo_manual_bank').val();
    //console.log('123');

    if (bankNo > 0) {
        var bankObj = data.filter(
            function (data) { return data.ID == bankNo }
        );
        if (bankObj) {
            var accountName = bankObj[0].AccountName;
            var accountNumber = bankObj[0].AccountNumber;
            $('#profile-61 .depo_manual_bankaccname').val(accountName);
            $('#profile-61 .depo_manual_bankaccnum').val(accountNumber);

            $('.div_depo_manual_bankaccname').show();
            $('.div_depo_manual_bankaccnum').show();
            //console.log('123show');
        }
    } else {
        //console.log('123close');
        $('#profile-61 .depo_manual_bankaccname').val(null);
        $('#profile-61 .depo_manual_bankaccnum').val(null);
        $('.div_depo_manual_bankaccname').hide();
        $('.div_depo_manual_bankaccnum').hide();

    }
}

SubmitDepositCashForm = function () {

    var param = {
        depo_manual_bank: $('#profile-61 .depo_manual_bank option:selected').val(),
        depo_manual_amt: $('#profile-61 .depo_manual_amt').val(),
        depo_manual_remark: $('#profile-61 .depo_manual_remark').val(),
        depo_manual_promotion: $('#profile-61 .ddl_manual_promotion option:selected').val(),
        min_depo_amt: $('#hid_min_deposit').val(),
    };

    showLoading();
    $.ajax(
    {
        url: "/handlers/DepositManual.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    alertMSG(o.msg);
                }
                else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (e) {
        }
    });
};

GetDepoWithSetting = function () {
    $.ajax(
    {
        url: "/handlers/GetDepoWithSetting.ashx",
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
                        //alert(json.Withdraw);
                        //$("#min_withdraw").html(json.Withdraw);
                        $.each(json, function (key, item) {
                            $("#min_deposit").html(item.Deposit);
                            $("#hid_min_deposit").val(item.Deposit);

                            $("#min_withdraw").html(item.Withdraw);
                            $("#hid_min_withdraw").val(item.Withdraw);
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

//Deposit Mart

BindMart = function (channelType, ddl) {

    var param = {
        channelType: channelType,
        includeInactive: false,
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPG.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        //$(ddl).empty();
                        $(ddl).find('option[value!="0"]').remove();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.PGID).html(i.BankName + ' (' + i.PGName_Custom1 + ')'));
                        });
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

BindPGBank_mart = function (pgId, channelType, ddl) {

    if (pgId <= 0)
        return false;


    var param = {
        pgId: pgId,
        channelType: channelType
    }

    //showLoading();
    $.ajax({
        url: "/handlers/GetPGBank.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            //closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        $(ddl).empty();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.ID).html(i.BankName));
                        });
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

SubmitDepositMartForm = function () {


    var param = {
        pgate: $('#supermarket-61 .ddl_pgate_mart option:selected').val(),
        pbank: $('#supermarket-61 .ddl_pbank_mart option:selected').val(),
        txtPGDepoAmt: $('#supermarket-61 .depo_mart_amt').val(),
        pg_promotion: $('#supermarket-61 .ddl_mart_promotion option:selected').val(),
        hid_gateType: $('#hid_gateType').val(),
    };
    var launch = false;
    showLoading();
    $.ajax(
    {
        url: "/handlers/DepositMart.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    var url = '/web' + o.msg;
                    if (url) {
                        SetPopupOpenerClickEvent(url);
                        launch = true;
                    }
                } else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (e) {
        }
    });
    if (launch == true)
        $('#btnPopupOpener').trigger('click');

    return false;
};

