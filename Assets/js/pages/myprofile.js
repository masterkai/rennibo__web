
var wallet_list = [1, 10, 12, 21, 24, 25, 32, 44, 46, 51, 53, 55, 58, 59, 62, 65];
//var wallet_list = [1, 6];
var timeout = 20; //max wallet get balance seconds

var selected_wallet;
var PLAYER_WITHDRAW_BANK_LIST;

$(function () {

    GetPlayerBankInfo();

    $('.container_withdraw #ddl_w_bank').change(function() {
        BindWithdrawBankInfo();
    });

    $('.btnWithdraw').click(function () {

        if (!$('.container_withdraw #ddl_w_bank').val() || parseFloat($('.container_withdraw #ddl_w_bank').val()) <= 0) {
            alertMSG('請選擇銀行!');
            return false;
        }
        if (!$('.container_withdraw .w_amt').val() || parseFloat($('.container_withdraw .w_amt').val()) <= 0) {
            alertMSG('請輸入金額!');
            return false;
        }
        if (!$('.container_withdraw .w_password').val()) {
            alertMSG('請輸入密碼!');
            return false;
        }

        /* COOKIES */
        var withdrawNotice_doNotDisplayAgain = $.cookie("withdrawNotice_doNotDisplayAgain");

        if (withdrawNotice_doNotDisplayAgain) {
            SubmitWithdrawForm();
        } else {
            alertMSGWithdraw(SubmitWithdrawForm);
        }
    });

    $('.profileTabs a').click(function() {
        var id = $(this).prop('id');
        if (id == "tab_transfer") {
            bind_transferFrom();
        }
        else if (id == "tab_deposit") {
            GetBindPromotion();
        }
    });

    $('.btnChangePassword').click(function () {
        SubmitChangePasswordForm();
    });

});


RefreshWallet = function (sender) {
    try {
        var siteId = $(sender).data('val');
        if (siteId > 0) {

            var param = {
                siteId: siteId,
            }

            $.ajax({
                url: "/handlers/CheckWalletBalance.ashx",
                type: 'POST',
                data: JSON.stringify(param),
                async: true,
                timeout: 1000 * timeout,
                beforeSend: function() {
                    setTimeout(function() {
                        $(sender).attr("src", "assets/img/loading.gif");
                        $(sender).parent().parent().find('p:first').html("-");
                    }, 200);
                },
                success: function (data) {
                    setTimeout(function () {
                        try {
                            if (!isNaN(parseFloat(data))) {
                                var amt = numberWithCommas(parseFloat(data).toFixed(2));
                                $(sender).parent().parent().find('p:first').html(amt);
                            }
                            else
                                $(sender).parent().parent().find('p:first').html(data);
                        } catch (err) {
                            $(sender).parent().parent().find('p:first').html(data);
                        }
                    }, 200);
                    
                },
                complete: function (data) {
                    setTimeout(function () {
                        $(sender).attr("src", "assets/img/icon_refresh.png");
                    }, 200);
                },
                error: function() {
                    $(sender).parent().parent().find('p:first').html("0.00");
                }
            });
        }
    } catch (err) {
    }

    return false;
}



transferOutAll = function () {

    //showLoading();
    //var param = {}
    ////alert(param);
    //$.ajax({
    //    url: "mProfile.aspx/TransferOut",
    //    type: 'POST',
    //    //async: false,
    //    data: JSON.stringify(param),
    //    //data: param,
    //    contentType: "application/json",
    //    dataType: 'JSON',

    //    success: function (result) {
    //        //alert(result.d);
    //        if (result.d) {
    //            var o = JSON.parse(result.d);
    //            var msg = o.msg;
    //            closeLoading();
    //            alertMSG(msg);
    //            $('.walletIcon[data-val=0]').click();
    //        }
    //    },
    //    error: function (xhr) {
    //        //alert(xhr);
    //        closeLoading();
    //        alertMSG('轉賬失敗!');
    //    }
    //});


    showLoading();
    $.ajax(
    {
        url: "/handlers/TransferOutAll.ashx",
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            //closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    alertMSGCallback(o.msg, function () {
                        $('.walletIcon[data-val=0]').trigger('click');
                    });
                    //location.reload(true);
                    //setTimeout(function() {
                    //    jQuery.each(wallet_list, function(idx, val) {
                    //        var sender = $('.walletIcon[data-val=' + val + ']');
                    //        RefreshWallet(sender);
                    //    });
                    //}, 500);
                } else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (xhr, textStatus, error) {
            alertMSG('轉賬失敗!');
        },
        complete: function () {
            closeLoading();
        }
    });
}

ShowBindBankForm = function() {
    showLoading();
    GetBindBankList();

    $('.container_withdraw').hide();
    $('.container_bindbank').show();
}

ShowWithdrawForm = function () {

    GetPlayerBankInfo();

    $('.container_withdraw').show();
    $('.container_bindbank').hide();
}


GetPlayerBankInfo = function () {
    showLoading();
    $.ajax(
    {
        url: "/handlers/GetPlayerBankInfo.ashx",
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (result) {
            if (result) {
                var o = result;
                var code = o.code;
                switch (code) {
                    case 0:
                        if (o.data) {
                            var data = JSON.parse(o.data);

                            //assign for global use
                            PLAYER_WITHDRAW_BANK_LIST = data;

                            //clear dropdown
                            $(".container_withdraw #ddl_w_bank").find('option').not(':first').remove();

                            $.each(data, function (i, d) {
                                var id = d.ID;
                                var bankId = d.BankID;
                                var bankName = d.BankName;
                                var accountName = d.AccountName;
                                var accountNumber = d.AccountNumber;

                                if (bankId > 0) {
                                    $(".container_withdraw #ddl_w_bank").append($("<option></option>").val(id).html(bankName));
                                    //$(".container_withdraw #ddl_w_bank").val(bankId).trigger('change');
                                }
                            });

                            BindWithdrawBankInfo();
                        } 
                        break;
                    case 592:
                        location.href = '/';
                        break;
                    default:
                        //alertMSG(o.msg);
                        break;
                }
            }
        },
        error: function (xhr, textStatus, error) {
        },
        complete: function() {
            closeLoading();
        }
    });

}

BindWithdrawBankInfo = function() {
    var data = PLAYER_WITHDRAW_BANK_LIST;

    var bankNo = $('.container_withdraw #ddl_w_bank').val();
    
    if (bankNo > 0) {
        var bankObj = data.filter(
            function (data) { return data.ID == bankNo }
        );
        if (bankObj) {
            var accountName = bankObj[0].AccountName;
            var accountNumber = bankObj[0].AccountNumber;
            $('.container_withdraw #w_ply_bankname').val(accountName);
            $('.container_withdraw #w_ply_bankacc').val(accountNumber);
        }
    } else {
        $('.container_withdraw #w_ply_bankname').val(null);
        $('.container_withdraw #w_ply_bankacc').val(null);
    }
}


SubmitWithdrawForm = function () {
    var param = {
        bankNo: $('.container_withdraw #ddl_w_bank').val(),
        accountName: $('.container_withdraw #w_ply_bankname').val(),
        accountNumber: $('.container_withdraw #w_ply_bankacc').val(),
        w_amt: $('.container_withdraw .w_amt').val(),
        w_password: $('.container_withdraw .w_password').val(),
    };
    showLoading();
    $.ajax(
    {
        url: "/handlers/Withdraw.ashx",
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
                    //location.reload(true);
                    alertMSGRes(o.msg);
                } else {

                    alertMSG(o.msg);
                }
            }
        },
        error: function (e) {
        }
    });
};



RefreshWalletTransfer = function (fromSiteId, toSiteId) {
    var refresh_list = [fromSiteId, toSiteId];
    setTimeout(function () {
        jQuery.each(refresh_list, function (idx, val) {
            var sender = $('.walletIcon[data-val=' + val + ']');
            if (val == 1) {
                GetMainBalance();
                RefreshWallet(sender);
            }
            else
                RefreshWallet(sender);
        });
    }, 500);
}

SubmitChangePasswordForm = function () {

    var param = {
        old_password: $('.container_cp .old_password').val(),
        new_password: $('.container_cp .new_password').val(),
        confirm_password: $('.container_cp .confirm_password').val()
    };

    showLoading();
    $.ajax(
    {
        url: "/handlers/ChangePassword.ashx",
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