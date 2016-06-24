///// <reference path="jquery-1.11.1.min.js" />
//function customCheckbox(checkboxName) {
//    var checkBox = $('input[name="' + checkboxName + '"]');
//    $(checkBox).each(function () {
//        $(this).wrap("<span class='custom-checkbox'></span>");
//        if ($(this).is(':checked')) {
//            $(this).parent().addClass("selected");
//        }
//    });

//    $(checkBox).click(function () {
//        $(this).parent().toggleClass("selected");
//        $(this).parent().parent().toggleClass("labelselectedcheckbox");
//    });

//    $("#checkAll").change(function () {
//        var checkBox = $('input[name="Accountname"]');
//        $(checkBox).each(function () {
//            if ($("#checkAll").is(':checked')) {
//                $(this).parent().removeClass("selected");
//                $(this).parent().addClass("selected");
//                $(this).parent().parent().removeClass("labelselectedcheckbox");
//                $(this).parent().parent().addClass("labelselectedcheckbox");              
//            }
//            else {
//                $(this).parent().removeClass("selected");
//                $(this).parent().parent().removeClass("labelselectedcheckbox");
//            }
//        });
//    });

//    $("#checkAll").click(function () {
//        $(this).parent().toggleClass("selected");
//        $(this).parent().parent().toggleClass("labelselectedcheckbox");
//    });
//}

//$(document).ready(function () {
//    customCheckbox("Accountname");
//});

//function clearcheckboxes() {
//    var checkBox = $('input[name="Accountname"]');
//    $(checkBox).each(function () {
//        $(this).parent().removeClass("selected");
//        $(this).parent().parent().removeClass("labelselectedcheckbox");
//    });
//}

//function Checkboxstatechange(checkbox) {
//    $(checkbox).parent().toggleClass("selected");
//    if ($(checkbox).is(':checked')) {
//        $(checkbox).parent().addClass("selected");
//        $(checkbox).parent().parent().addClass("labelselectedcheckbox");
//    }
//    else {
//        if ($("#checkAll").is(':checked')) {
//            $("#checkAll").prop('checked', false);
//            $("#checkAll").parent().removeClass("selected");
//            $("#checkAll").parent().parent().removeClass("labelselectedcheckbox");
//        }

//        $(checkbox).parent().removeClass("selected");
//        $(checkbox).parent().parent().removeClass("labelselectedcheckbox");
//    }
//}

//function singleselectionchange(checkbox1) {
//    var checkBox = $('input[name="Accountname"]');
//    $(checkBox).each(function () {
//        if (!$(this).is(checkbox1)) {
//            $(this).parent().removeClass("selected");
//            $(this).parent().parent().removeClass("labelselectedcheckbox");
//        }
//        else {
//            $(checkbox1).addClass("selected");
//            $(checkbox1).parent().addClass("labelselectedcheckbox");
//        }
//    });
//}

/// <reference path="jquery-1.11.1.min.js" />
$(document).ready(function () {

});

function customCheckbox(checkboxName) {
    var checkBox = $('input[name="' + checkboxName + '"]');
    $(checkBox).each(function () {
        $(this).wrap("<span class='custom-checkbox'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });

    $(checkBox).click(function () {
        $(this).parent().toggleClass("selected");
        $(this).parent().parent().toggleClass("labelselectedcheckbox");
    });

    $("#checkAll").change(function () {
        var checkBox = $('input[name="Accountname"]');
        $(checkBox).each(function () {
            if ($("#checkAll").is(':checked')) {
                $(this).prop('checked', true);
                $(this).parent().removeClass("selected");
                $(this).parent().addClass("selected");
                $(this).parent().parent().removeClass("labelselectedcheckbox");
                $(this).parent().parent().addClass("labelselectedcheckbox");
            }
            else {
                $(this).prop('checked', false);
                $(this).parent().removeClass("selected");
                $(this).parent().parent().removeClass("labelselectedcheckbox");
            }
        });
        forwardbutton();
    });

    $("#checkAll").click(function () {
        $(this).parent().toggleClass("selected");
        $(this).parent().parent().toggleClass("labelselectedcheckbox");
    });
}

$(document).ready(function () {
    customCheckbox("Accountname");
});

function clearcheckboxes() {
    var checkBox = $('input[name="Accountname"]');
    $(checkBox).each(function () {
        $(this).prop('checked', false);
        $(this).parent().removeClass("selected");
        $(this).parent().parent().removeClass("labelselectedcheckbox");
    });
}

function forwardbutton() {
    var checkBox = $('input[name="Accountname"]');
    var i = 0;
    $(checkBox).each(function () {
        if ($(this).is(':checked')) {
            i = i + 1;
        }
    });
    if (i == 0) {
        $("#check11").css({ 'background-color': '#dddddd' });
        $(".btn").css({ 'background-color': '#dddddd' });
        $("#check11").prop("disabled", true);
        $(".btn").prop("disabled", true);
    }
    else {
        $("#check11").css({ 'background-color': '#424242' });
        $(".btn").css({ 'background-color': '#424242' });
        $("#check11").prop("disabled", false);
        $(".btn").prop("disabled", false);
    }
}

function Checkboxstatechange(checkbox) {
    $(checkbox).parent().toggleClass("selected");
    if ($(checkbox).is(':checked')) {
        $(checkbox).prop('checked', true);
        $(checkbox).parent().addClass("selected");
        $(checkbox).parent().parent().addClass("labelselectedcheckbox");
    }
    else {
        if ($("#checkAll").is(':checked')) {
            $("#checkAll").prop('checked', false);
            $("#checkAll").parent().removeClass("selected");
            $("#checkAll").parent().parent().removeClass("labelselectedcheckbox");
        }
        $(checkbox).prop('checked', false);
        $(checkbox).parent().removeClass("selected");
        $(checkbox).parent().parent().removeClass("labelselectedcheckbox");
    }
}

function checkboxcheck(check) {
    var checkBox = $('input[name="Accountname"]');
    var i = 0;
    $(checkBox).each(function () {
        if ($(this).is(':checked')) {
            i = i + 1;
        }
    });

    if (i > 4) {
        $(check).prop('checked', false);
        $(check).parent().removeClass("selected");
        $(check).parent().parent().removeClass("labelselectedcheckbox");
    }
}

function singleselectionchange(checkbox1) {
    var checkBox = $('input[name="Accountname"]');
    $(checkBox).each(function () {
        if (!$(this).is(checkbox1)) {
            $(this).parent().removeClass("selected");
            $(this).parent().parent().removeClass("labelselectedcheckbox");
        }
        else {
            $(checkbox1).addClass("selected");
            $(checkbox1).parent().addClass("labelselectedcheckbox");
        }
    });
}

